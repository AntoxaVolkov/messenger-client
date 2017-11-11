<template>
  	<div class="mi">
		<div v-if="!profile.authenticated">
			<loading-page></loading-page>
		</div>
		<template v-if="profile.authenticated">
			<div class="sidebar">
				<div class="top-line">
					<div class="top-line__search">
						<label for="top-line__search_input"><i class="material-icons">search</i></label>
						<input id="top-line__search_input" :input="search.query" @input="seek" type="text" :placeholder="$t('pages.mi.search')">
					</div>
					<div class="top-line__controll">
						<router-link :to="{path:'/chat/0'}"><i class="material-icons">add</i></router-link>
						<a href="" @blur="menutoogle(this, 'off')" @click.prevent="menutoogle"><i class="material-icons">more_horiz</i></a>
					</div>
					<div v-show="topLineMenu" class="top-line__dropdown-menu">
						<ul>
							<li class="top-line__dropdown-menu__profile-card">
								<img :src="profile.photo.mini" alt="">
								<span>{{profile.name + ' ' + profile.lastname}}</span>
							</li>
							<li>
								<router-link :to="'/profile'">{{ $t('pages.profile.namelink') }}</router-link>							
							</li>
							</li>
							<li>
								<router-link :to="{path:'/setting'}">{{ $t('pages.setting.namelink') }}</router-link>							
							</li>
							<li>
								<a href="" @click.prevent="logout">{{ $t('pages.login.signout') }}</a>							
							</li>
						</ul>
					</div>
				</div>
				<div class="dialogs">
					<div class="dialogs_container">
						<scroll-block>
							<ul class="dialogs_list">
								<li v-if="!search.state" is="dialog-link" v-for="dialog in dialogs.list" :data="dialog" :key="dialog.id" :id="dialog.id"></li>
								<li v-if="search.state" is="dialog-link" v-for="dialog in search.dialogs" :data="dialog" :key="dialog.id" :id="dialog.id"></li>
								<li v-if="search.state && search.contacts.length > 0" class="name-list">{{ $t('pages.mi.contacts') }}</li>
								<li v-if="search.state && search.contacts.length > 0" is="dialog-link" v-for="user in search.contacts" :key="user.id" :data="user" type="profile" :id="user.id"></li>
								<li v-if="search.state && search.global.length > 0" class="name-list">{{ $t('pages.mi.global_search') }}</li>
								<li v-if="search.state && search.global.length > 0" is="dialog-link" v-for="user in search.global" :key="user.id" :data="user" type="profile" :id="user.id"></li>
							</ul>
						</scroll-block>
					</div>
				</div>
			</div>
			<div class="content">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</template>	
	</div>
</template>

<script>
import Vue from 'vue'
import {mapActions, mapState} from 'vuex';
import jwtToken from './../../helpers/jwt-token';
//import SimpleBar from 'simplebar'
//import 'simplebar/dist/simplebar.css'
import ScrollBlock from './../Shared/ScrollBlock.vue'
import DialogLink from './Mi/DialogLink.vue'
import LoadingPage from './../Shared/LoadingPage'

export default {
 	name: 'mi',
	components: {ScrollBlock, DialogLink, LoadingPage},
	data(){
		return {
			topLineMenu: false,
			loading: false
		}
	},
	computed: {
		...mapState({
			profile: state => state.authUser,
			dialogs: state => state.dialogs,
			search: state => state.search
		})
	},
	methods:{
		...mapActions([
            'showSuccessNotification',
            'showErrorNotification',
            'showInfoNotification',
            'showWarningNotification',
            'logoutRequest'
		]),
		logout(){
			console.log('logout');
			this.logoutRequest();
		},
		menutoogle(e, off){
			if(off){
				setTimeout(()=> this.topLineMenu = false,220)
			}else{
				this.topLineMenu = true;
			}
			
		},
		seek(e){
			this.$store.dispatch('search',{
				query: e.target.value,
				contacts: this.profile.contacts,
				dialogs: this.dialogs.list
			});
		}
	},
	socket:{
		me(user){
			true.loading = true;
		}
	}
}
</script>

<style lang="scss">
	.mi {
	position: relative;
		.sidebar{
			background-color: #fff;
			position: absolute;
			width: 380px;
			/*display: grid;
			grid-template-columns: 100%;
			grid-template-rows: 50px 1fr;
			grid-auto-flow: column;
			justify-items: stretch;
			align-items: stretch;*/
			top:0;
			left:0;
			bottom:0;
			border-right: 1px solid #aaa;

			.top-line{
				width: 380px;
				position: fixed;
				z-index: 20;
				&__search{
					position: relative;
					padding-right: 100px;
					padding: 10px 80px 10px 10px;
					label{
						position: absolute;
						left:11px;
						top: 13px;
						color: #666;
					}
					input{
						width: 100%;
						padding: 5px 5px 5px 30px;
						border:none;
						font-size: 16px;
						background-color: #f6f6fa;
					}
				}

				&__controll{
					position: absolute;
					width: 80px;
					height: inherit;
					padding: 0 10px;
					top: 9px;
					right: 0;
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
					top:5px;
					right: 10px;
					width:250px;
					background-color: #fff;
					box-shadow: 3px 3px 7px rgba(0,0,0,0.5);
					z-index: 1000;
					
					&__profile-card{
						color: #666;
						padding: 10px;
						background-color: #f3f3f3;
						img{
							width: 20px;
							border-radius: 10px;
							vertical-align: text-bottom;
						}

					}

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

			.dialogs{
				/*overflow: hidden;
				padding-top: 50px;*/
				//height: 100%;
				padding-top: 50px;
				height: calc(100vh - 81px);

				&_container{
					height: inherit;
				}

				.dialogs_list{
					list-style: none;

					.name-list{
						padding: 5px;
						text-align: center;
						background-color: #eee;
						color: #666;
					}
				}
				

			}

		}

		.content{
			padding-left: 380px;
			height: calc(100vh - 30px);
			background-image: url("~@/assets/img/bg.png");
		}
	}
</style>