<template>
  	<div class="login">
        <div class="login_title">
            <h1>AVMessenger</h1>
            <h2>Мессенджер от AV</h2>
        </div>
		<form class="login_form">
            <div class="login_field login_field--header">
                <p>Вход</p>
            </div>
            <div class="login_field login_field--email">
                <label for="inputEmail">Email</label><br>
                <input type="email" id="inputEmail" name="email">
            </div>
            <div class="login_field login_field--pass">
                <label for="inputPass">Пароль</label><br>
                <input type="password" id="inputPass" name="pass">
            </div>
            <div class="login_field login_field--submit">
                <input type="submit" id="inputSubmit" name="submit" value="Войти">
            </div>
        </form>
  	</div>
</template>

<script>
import Vue from 'vue'
//import Chat from './components/chat/Chat.vue'

export default {
 	name: 'login',
	//components: {Chat},
	methods:{
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