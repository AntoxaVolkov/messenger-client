<template>
  	<div class="login">
        <div class="login_title">
            <h1>{{ $t("global.title") }}</h1>
            <h2>{{ $t("global.description") }}</h2>
            <p>
                <button @click="$changeLang('ru')">RU</button> <button @click="$changeLang('en')">EN</button>
            </p>
            <p>
                <button @click="showSuccessNotification('Успех')">Успех</button>
                <button @click="showErrorNotification('Ошибка')">Ошибка</button>
                <button @click="showWarningNotification('Внимание')">Внимание</button>
                <button @click="showInfoNotification('Информвция')">Информация</button>
            </p>
        </div>
		<form class="login_form">
            <div class="login_field login_field--header">
                <p>{{ $t("pages.login.signin") }}</p>
            </div>
            <div class="login_field login_field--email">
                <label for="inputEmail">{{ $t("pages.login.email") }}</label><br>
                <input v-model="form.email" type="email" id="inputEmail" name="email">
            </div>
            <div class="login_field login_field--pass">
                <label for="inputPass">{{ $t("pages.login.pass") }}</label><br>
                <input v-model="form.password" type="password" id="inputPass" name="pass">
            </div>
            <div class="login_field login_field--submit">
                <input @click.prevent="login" type="submit" id="inputSubmit" name="submit" :value="$t('pages.login.signin')">
            </div>
            <div class="login_field login_field--link">
                <router-link :to="'reset'">{{ $t("pages.login.reset") }}</router-link>
                <router-link :to="'registration'">{{ $t("pages.login.signup") }}</router-link>
            </div>
        </form>
  	</div>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex';

export default {
 	name: 'login',
	//components: {Chat},
    data(){
        return {
            form:{
                email: null,
                password: null
            }
        }
    },
	methods:{
        ...mapActions([
            'showSuccessNotification',
            'showErrorNotification',
            'showInfoNotification',
            'showWarningNotification',
            'loginRequest'
        ]),
        login(){
            this.loginRequest(this.form)
                .then((data) => {
                    if(data.verified){
                        this.$router.push({path:'mi'})
                    }else{
                        this.$router.push({path:'verify'})
                    }
                    
                });
        }

	},
	created:function(){
		
	}
}
</script>

<style lang="scss">
    .login{
        padding: 15px 0;
    }

	.login_form {
		width: 300px;
        margin: 0 auto;
    }
    .login_title{
        h1{
            text-align: center;
            color: red;
        }
        h2{
            text-align: center;
        }
    }
    .login_field{
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