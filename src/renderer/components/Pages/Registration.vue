<template>
  	<div class="login">
        <div class="login_title">
            <h1>{{ $t("global.title") }}</h1>
            <h2>{{ $t("global.description") }}</h2>
            <p>
                <button @click="$i18n.locale = 'ru'">RU</button> <button @click="$i18n.locale = 'en'">EN</button>
            </p>
        </div>
        <div v-show="loading">
            <p>Отправка...</p>
        </div>
		<form v-show="!loading" class="login_form">
            <div class="login_field login_field--header">
                <p>{{ $t("pages.login.signup") }}</p>
            </div>
            <div v-show="step == 1">
                <div class="login_field login_field--name">
                    <label for="inputName">{{ $t("pages.registration.name") }}</label><br>
                    <input :class="{error:errors.fields['name']}" v-model="form.name" type="text" id="inputName" name="name">
                </div>
                <div class="login_field login_field--last-name">
                    <label for="inputLastName">{{ $t("pages.registration.lastname") }}</label><br>
                    <input :class="{error:errors.fields['lastname']}" v-model="form.lastname" type="text" id="inputLastName" name="lastname">
                </div>
            </div>
            <div v-show="step == 2">
                <div class="login_field login_field--email">
                    <label for="inputEmail">{{ $t("pages.login.email") }}</label><br>
                    <input :class="{error:errors.fields['email']}" v-model="form.email" type="email" id="inputEmail" name="email">
                </div>
                <div class="login_field login_field--pass">
                    <label for="inputPass">{{ $t("pages.login.pass") }}</label><br>
                    <input :class="{error:errors.fields['password']}" v-model="form.password" type="password" id="inputPass" name="password">
                </div>
            </div>
            <div v-show="step == 3">
                <div class="login_field login_field--photo">
                    <img id="uploadedPhoto" src="~@/assets/img/noavatar.png" alt="">
                </div>
                <div class="login_field login_field--file">
                    <label for="inputFile">{{ $t("pages.registration.loadphoto") }}</label><br>
                    <input :class="{error:errors.fields['picture']}" @change="uploadPicture" type="file" id="inputFile" name="file">
                </div>
            </div>
            <div class="login_field login_field--submit">
                <input @click.prevent="next" type="submit" id="inputSubmit" name="submit" :value="$t('pages.registration.next')">
            </div>
            <div v-show="step == 1" class="login_field login_field--link">
                <router-link :to="'reset'">{{ $t("pages.login.reset") }}</router-link>
                <router-link :to="'login'">{{ $t("pages.login.signin") }}</router-link>
            </div>
            <div v-show="step != 1" class="login_field login_field--link">
                <a href="" @click.prevent="back">{{ $t("pages.registration.back") }}</a>
            </div>
           
        </form>
  	</div>
</template>

<script>
import Vue from 'vue'
//import Chat from './components/chat/Chat.vue'

export default {
 	name: 'registration',
    //components: {Chat},
    data(){
        return {
            loading: false,
            step: 1,
            form:{
                name: '',
                lastname: '',
                email: '',
                password: '',
                photo: ''
            }
        }
    },
    computed: {
        errors(){
            return this.$store.state.registration.error;
        }
    },
	methods:{
        back(){
            if(this.step < 2){
                return
            }
            this.step--;
        },
        next(){
            if(this.step == 1){
                this.step++;
            }else if(this.step == 2){
                // Сначало сделать проверку почты и пароля
                this.step++;
            }else if(this.step == 3){
                // отправляем форму
                this.loading = true;
                this.$store.dispatch('registration', this.form)
                    .then(()=>{
                        this.loading = false;
                        this.$router.push({path:'verify'});
                    })
                    .catch(() => {
                        this.loading = false;
                        if(this.errors.fields['name'] || this.errors.fields['lastname']) this.step = 1;
                        else if(this.errors.fields['email'] || this.errors.fields['password']) this.step = 2;
                    });
            }
            
        },
        uploadPicture(){
            let formData = new FormData();
            let file = document.getElementById('inputFile').files[0];
            formData.append('photo',file);

            this.$store.dispatch('uploadPicture', formData)
                .then(({url, fileName}) => {
                    document.getElementById('uploadedPhoto').attributes.src.value = url;
                    this.form.photo = fileName;
                })
                .catch((err) => {
                    //console.error(err);
                });

        },
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
            color: $test-color;
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

            &.error{
                border-color: #ff4444;
            }
        }

        &--header{
            
            p{
                text-align: center;
            }
        }

        &--photo{
            width: 150px;
            height: 150px;
            padding: 0;
            border-radius: 50% 50%;
            overflow: hidden;
            border: 2px solid #ccc;
            margin: auto;

            img{
                width: 150px;
            }
        }
    }
</style>