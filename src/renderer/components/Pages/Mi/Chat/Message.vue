<template>
    <li class="messages__item">
        <section v-if="user" class="message" :class="{ 'message__mine': me }">
            <header  class="messege__header"><strong>{{ title }}</strong> <em>{{ date }}</em></header>
            <div class="messege__content">{{ text }}</div>
        </section>
    </li>
</template>

<script>
import Vue from 'vue'
import * as api from './../../../../api';
let i = 0;
export default {
    name: 'chat',
    props:{
        from:{
            type: [String, Number],
            required: true
        },
        id:{
            type: [String, Number],
            default: null
        },
        did:{
            type: [String, Number],
            required: true
        },
        text:{
            type: String,
            default: ''
        },
        ts:{
            type: Number,
            required: true
        },
        attachment:{
            type: Object,
            default: null
        },
        ready:{
            type: Boolean,
            default: true
        }
    },
	data(){
		return {
            user: null
		}
	},
    computed: {
        me(){
            return this.from == this.$store.getters.idCurrentUser;
        },
        date(){
            let d = new Date(this.ts);
            return d.getHours() + ':' + d.getMinutes();
        },
        title(){
            return this.user.name + ' ' + this.user.lastname;
        }
    },
    created(){
        console.log({i:++i, mid: this.id})
        this.$store.dispatch('getUserById',{ did: this.did, uid: this.from })
			.then((user) => {
				this.user = user;
			})
    }
}
</script>

<style lang="scss">
    .messages__item{
        padding: 10px;

        &:after{
            content:'';
            display: table;
            clear: both;
        }
    }

    .message{
        float: left;
        background-color: #fff;
        box-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        border-radius: 7px;
        padding: 10px;
        color:#333;

        &__mine{
            background-color: #d0fbd5;
            float: right;
        }
    }
</style>