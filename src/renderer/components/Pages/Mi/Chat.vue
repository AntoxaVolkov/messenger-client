<template>
  	<div class="chat">
		<div v-if="!dialog">
			<loading-page></loading-page>
		</div>
		<template v-if="dialog">
		<div class="top-line">
			<div v-if="newChat" class="top-line__add-dialog">
				<div class="top-line__add-dialog__users">
					<div class="users__input-label">
						<label for="">{{ $t('pages.chat.who') }}</label>
					</div>
					<div class="users__input">
						<div class="chip">fghfgh</div>	
						<div class="chip">fghfgh</div>	
						<div class="chip">fghfgh</div>	
						<input type="text" id="inputUsers" :placeholder="$t('pages.chat.add-users')">
					</div>
					<div class="users__btn-add">
						<a href="" ><i class="material-icons">add</i></a>
					</div>
				</div>
				<div class="top-line__add-dialog__title">
				</div>
			</div>
			<div v-if="!newChat" class="top-line__dialog-info">
					<div v-if="user" class="top-line__dialog-info__title">
						<router-link :to="{path:'/profile/'+ user.id}">
							<img :src="photo" alt="">
							<span>{{ title }}</span>
						</router-link>
						<template v-if="!user">
							<img :src="photo" alt="">
							<span>{{ title }}</span>
						</template>
					</div>
					<div class="top-line__dialog-info__control">
						<a href="" @blur="menutoogle(this, 'off')" @click.prevent="menutoogle"><i class="material-icons">more_horiz</i></a>
					</div>
					<div v-show="topLineMenu" class="top-line__dialog-info__dropdown-menu">
						<ul>
							<li>
								<a>{{ $t('pages.profile.namelink') }}</a>							
							</li>
							</li>
							<li>
								<a>{{ $t('pages.profile.namelink') }}</a>								
							</li>
							<li>
								<a>{{ $t('pages.profile.namelink') }}</a>								
							</li>
						</ul>
					</div>
			</div>
		</div>
		<div class="chat__content">
				<scroll-block :key="dialog.id">
				<div>
					<ul class="messages">
						<li v-if="!msg_loading" 
							is="message" 
							v-for="m in messages" 
							:from="m.from" 
							:text="m.text"
							:ready="m.ready"
							:attachment="m.attachment"
							:ts="m.ts"
							:key="m.id" 
							:id="m.id"
							:did="dialog.id"
						></li>
					</ul>
				</div>
			</scroll-block>
		</div>
		
		<keep-alive>
			<bottom-line @chengeHeight="resizeScroll" @submit="send" :key="dialog.id"></bottom-line>
		</keep-alive>
		

		</template>
  	</div>
</template>

<script>
import Vue from 'vue'
import * as api from './../../../api';
import ScrollBlock from './../../Shared/ScrollBlock.vue'
import LoadingPage from './../../Shared/LoadingPage'
import BottomLine from './Chat/BottomLine'
import Message from './Chat/Message'

export default {
 	name: 'chat',
	components: {ScrollBlock, LoadingPage, BottomLine, Message},
	beforeRouteUpdate (to, from, next) {
		this.$store.dispatch('getDialogById',to.params.id)
			.then((dialog) => {
				this.dialog = dialog;
			})
		this.getMessages(to.params.id);
		next();
	},
	data(){
		return {
			dialog: null,
			startHeight:0,
			topLineMenu: false,
			msg_loading: true
		}
	},
	computed: {
		newChat(){
			return this.$route.params.id ? false : true;
		},
		profile(){
			return this.$store.state.authUser;
		},
		messages(){
			
            console.log(this.$store)
			return this.$store.getters.getMessages;
		},
		user(){
			if(this.dialog.type === 'private'){
				return this.dialog.users.filter((row) => {
					return row.userId !== this.profile.id;
				})[0].user;
			}else{
				return null;
			}
		},
        title(){
            if(this.dialog.type === 'private'){
				return this.user.name + ' ' +this.user.lastname
			}else{
				return this.dialog.title;
			}
        },
        photo(){
            if(this.dialog.type === 'private'){
				if(this.user.photo){
					return api.pathToPhotos.mini + '/' + this.user.photo
				}else{
					return '~@/assets/img/noavatar.png'
				}
				
			}else{
				return this.dialog.photo;
			}
        }
	}, 
	methods:{
		menutoogle(e, off){
			if(off){
				setTimeout(()=> this.topLineMenu = false,220)
			}else{
				this.topLineMenu = true;
			}
			
		},
		resizeScroll(height){
			let chat = document.querySelector('.chat__content');
			let event = new Event("resize");
			chat.style.height = 'calc(100vh - 75px - ' + height + 'px)';
			window.dispatchEvent(event);
		},
		send(message){
			Object.assign(message, {dialog_id: this.dialog.id})
			console.log(message);
			this.$socket.emit('new_message', message);		
		},
		getMessages(did){
			this.$store.dispatch('getMessages',did)
				.then(() => {
					this.msg_loading = false;
				})
		}

	},
	created(){
		this.$store.dispatch('getDialogById',this.$route.params.id)
			.then((dialog) => {
				this.dialog = dialog;
			})
		this.getMessages(this.$route.params.id);
	}
}
</script>

<style lang="scss">
	.chat {
		position: relative;
		height: 100%;

		.top-line{
			display: fixed;
			background-color: #fff;

			&__add-dialog{

				&__users{
					display: grid;
					grid-template-columns: 60px 1fr 30px;
					grid-auto-flow: row;
					padding: 10px;

					.users__input-label{
						

					}
					.users__input{
						display: flex;
						flex-wrap: wrap;

						.chip{
							flex-basis: content;
						}
						input{
							flex-grow: 1;
						}
					}
				}

			}

			&__dialog-info{
				position:relative;
				&__title{
					padding: 5px 10px;
					border-bottom: 1px solid #aaa;

					a{	
						text-decoration: none;
					}

					img{
						border-radius: 50%;
						width: 32px;
						height: 32px;
						vertical-align: middle;
						margin-right: 5px;
					}
					span{
						line-height: 32px;
						font-size: 18px;
						text-decoration: none;
						color: #666;
					}
				}

				&__control{
					position: absolute;
					width: 30px;
					height: inherit;
					padding: 0 10px;
					top: 9px;
					right: 15px;
					text-align: right;
					
					a{	
						
						color: #999;

						i{
							font-size: 28px;
						}

						&:hover{
							color: #666;
						}
					}

				}

				&__dropdown-menu{
					position: absolute;
					top:0;
					right: 15px;
					background-color: #fff;
					box-shadow: 3px 3px 7px rgba(0,0,0,0.5);
					z-index: 1000;
					width: 250px;

					ul{
						list-style: none;

						li{
							border-bottom: 1px solid #eee;
							font-size: 16px;

							a{
								display: block;
								padding: 10px;
								color: #999;
								text-decoration: none;

								&:hover{
									background-color: #eee;
								}
							}
						}
					}
				}
			}
		}

		&__content{
			height: calc(100vh - 75px);
		}

		.messages{
			list-style: none;
		}
	}
</style>