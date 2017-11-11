<template>
  	<div class="profile">
		<div v-if="!profile">
			<loading-page></loading-page>
		</div>
		<template v-if="profile">
			<div class="header">
				<div class="profile-card">
					<div style="position:relative;width:100%;hight:100%;">
						<div class="photo"><img :src="photo" alt=""></div>
						<div class="info">
							<h1>{{ profile.name + ' ' + profile.lastname }}</h1>
							<div class="control">
								<i class="material-icons">person_add</i>
								<i class="material-icons">mail_outline</i>
							</div>
						</div>
					</div>
					
				</div>
			</div>
			<div class="control">
				<i v-if="!contact" @click="addContact" class="material-icons">person_add</i>
				<i v-if="contact" @click="removeContact" class="material-icons">delete</i>
				<i @click="mail" class="material-icons">mail_outline</i>
				<div style="clear:both;"></div>
			</div>
		</template>	
  	</div>
</template>

<script>
import Vue from 'vue'
import * as api from './../../../api';
import LoadingPage from './../../Shared/LoadingPage'
export default {
 	name: 'profile',
	components: {LoadingPage},
	data(){
		return {
			profile: null,
			contact: false
		}
	},
	computed: {
        photo(){
            if(this.profile.photo) return api.pathToPhotos.mini + '/' + this.profile.photo
            else return '~@/assets/img/noavatar.png'
        }
	},
	beforeRouteUpdate (to, from, next) {
		this.load(to.params.id);
		next();
    // обработка изменений параметров пути...
    // не забудьте вызывать next()
  	},
	methods:{
		addContact(){
			console.log(this.profile.id);
			this.$socket.emit('add_contact', this.profile.id, user => {
				this.$store.dispatch('addContact', user)
					.then(() => {
							this.contact = true;
							this.$store.dispatch('research');
						});
				
			});
		},
		removeContact(){
			this.$socket.emit('remove_contact', this.profile.id, uid => {
				this.$store.dispatch('removeContact', uid)
					.then(() => {
							this.contact = false;
							this.$store.dispatch('research')
						});
			});
		},
		mail(){
			this.$store.dispatch('searchDialogWithUser', this.profile.id)
				.then((did) => {
					if(did) this.$router.push({path:'/chat/'+did})
					else this.$socket.emit('new_dialog', this.profile.id, (did) => {
						this.$router.push({path:'/chat/'+did})
					});
				});
			
		},
		load(uid){
			this.$store.dispatch('isContact', uid)
			.then((res) => {
				console.log('res:' + res)
				this.contact = res;
			})
			this.$socket.emit('profile', uid, user => {
				this.profile = user;
			});
		}
	},
	created:function(){
		this.load(this.$route.params.id);
	}
}
</script>

<style lang="scss">
	.profile {
		height: 100%;

		.header{
			position: relative;
			background-color: #34aea3;
			border-bottom: 2px solid #EE7E66;
			height: 100px;

			.profile-card{
				position: absolute;
				bottom: -100px;
				left: 10px;
				height: 150px;

				.photo{
					position: absolute;
					top:0;
					left: 0;
					width: 150px;
					height: 150px;
					overflow: hidden;
					border-radius: 75px;
					border: 3px solid #EE7E66; 
				}

				.info{
					padding-left: 150px;

					h1{
						color: #fff;
					}
				}
			}
			
		}

		.control{
			position: fixed;
			bottom: 10px;
			right: 10px;
			text-align: center;

			i{
				display: block;
				width: 48px;
				height: 48px;
				line-height: 48px;
				float: left;
				background-color: #EE7E66;
				border-radius: 50%;
				color: #fff;
				margin: 5px;
				box-shadow: 3px 3px 3px rgba(0,0,0,0.1);
				cursor: pointer;

				&:hover{
					box-shadow: 5px 5px 5px rgba(0,0,0,0.1);
					width: 50px;
					height: 50px;
					line-height: 50px;
					margin: 4px;
					font-size: 25px;
				}
			}
		}
	}
</style>