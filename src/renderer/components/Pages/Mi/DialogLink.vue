<template>
  	
    <li class="dialog">
        <router-link :to="{path:'/'+type+'/'+ id}">
            <div class="dialog_photo">
                <img :src="photo">
            </div>
            <div class="dialog_info">
                <div class="name">
                    <span>{{name}}</span>
                </div>
                <div class="msg">
                    <span>{{text}}</span>
                </div>
            </div>
        </router-link>
        
    </li>
							
</template>

<script>
import Vue from 'vue'
import * as api from './../../../api';
import {mapActions} from 'vuex';

export default {
 	name: 'dialog-link',
    props:{
        type:{
            type: String,
            default: 'chat'
        },
        id:{
            type: [String, Number],
            required: true
        },
        data:{
            type: Object,
            required: true
        }
    },
	data(){
		return {
            topLineMenu: false,
            info: false
		}
	},
	methods:{
	},
	computed: {
        profile(){
           return this.$store.state.authUser
        },
		name(){
            return this.info.lastname ? this.info.name + ' ' + this.info.lastname : this.info.name;
        },
        photo(){
            if(this.info.photo.mini) return this.info.photo.mini
            else if(this.info.photo) return api.pathToPhotos.mini + '/' + this.info.photo
            else return '~@/assets/img/noavatar.png'
        },
        text(){
            if(this.type == 'chat') return this.$t('pages.mi.dialog.nomessages');
            return this.info.email;
        }
	},
	created(){
		if(this.type == 'chat' && this.data.type == 'private'){
                this.info = this.data.users.filter((row) => {
                    return row.user.id !== this.profile.id
                })[0].user
        }else if(this.type == 'chat' && this.data.type == 'public'){
            this.info = {
                name: this.data.title,
                photo: this.data.photo || '~@/assets/img/noavatar.png'
            }
        }else{
            this.info = this.data;
        }
	},
	mounted(){

	}
}
</script>

<style lang="scss">
    .dialog{
        box-sizing: content-box;
        position: relative;
        height: 70px;
        list-style: none;

        &:hover{
            background-color: #e9e9e9;
        }

        a{      
            display: block;
            padding: 10px;
            text-decoration: none;
            color: #333;
        }

        &_photo{
            position: absolute;
            overflow: hidden;
            border-radius: 25px;
            width: 50px;
            height: 50px;
            left: 10px;
            top: 10px;

            img{
                width: 100%;
            }
        }
        &_info{
            padding-left:60px;

            .name{
                font-weight: 600;
            }

            .msg{
                color: #999;
            }
        }


    }
</style>