<template>
  	<div class="reset">
        <div class="reset_title">
            <h1>{{ $t("global.title") }}</h1>
            <h2>{{ $t("global.description") }}</h2>
        </div>
		<form class="reset_form">
            <div class="login_field reset_field--header">
                <p>{{ $t("pages.reset.reseting") }}</p>
            </div>
            
            <div v-if="!loading" class="reset_field reset_field--text">
                <p>Вам на почту отправленно письмо со ссылкой для сброса пароля.</p>
                <p>После сброса войдите используя новый пароль.</p>
            </div>
            <div v-if="loading" class="reset_field reset_field--loading">
                <img src="~@/assets/img/spinner.svg" alt="">
            </div>
            <div class="reset_field reset_field--link">
                <a href=""  @click.prevent="send">{{ $t("pages.registration.nocode") }}</a>
                <router-link :to="'login'">{{ $t("pages.login.signin") }}</router-link>
            </div>
        </form>
  	</div>
</template>

<script>
import Vue from 'vue'
//import Chat from './components/chat/Chat.vue'

export default {
 	name: 'verify-code',
    //components: {Chat},
    data(){
        return {
            loading: false,
            formData:{
                email: this.$store.state.reset.email
            }
        }
    },
	methods:{
        send(){
            this.loading = true
            setTimeout(() => {
                this.$store.dispatch('resetRequest', this.formData)
                    .then(()=> {
                        this.loading = false;
                        this.$router.push('verifycode');
                    })
                    .catch(()=>{
                        this.loading = false;
                    });
            }, 1000);
        }
	},
	created:function(){
		
	}
}
</script>

<style lang="scss">
    .reset{
        padding: 15px 0;
    }

	.reset_form {
		width: 300px;
        margin: 0 auto;
    }
    .reset_title{
        h1{
            text-align: center;
            color: $test-color;
        }
        h2{
            text-align: center;
        }
    }
    .reset_field{
        padding: 10px 0;
        color:#999;
        input{
            border: 1px solid #999;
            padding: 10px 5px;
            width: 100%;
        }

        &--header{
            
            p{
                text-align: center;
            }
        }
    }
</style>