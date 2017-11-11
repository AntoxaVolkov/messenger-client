<template>
  	<div class="reset">
        <div class="reset_title">
            <h1>{{ $t("global.title") }}</h1>
            <h2>{{ $t("global.description") }}</h2>
        </div>
		<form class="reset_form">
            <div class="login_field reset_field--header">
                <p>{{ $t("pages.registration.verifyemail") }}</p>
            </div>
            <div v-if="!loading" class="reset_field reset_field--text">
                <p>Вам на почту отправленно письмо со ссылкой для подтверждения регистраци.</p>
                <p>После подтверждения нажмите кнопку обновить.</p>
            </div>
            <div v-if="loading" class="reset_field reset_field--loading">
                <img src="~@/assets/img/spinner.svg" alt="">
            </div>
            <div class="reset_field reset_field--submit">
                <input @click.prevent="update" type="submit" id="inputSubmit" name="submit" :value="$t('pages.registration.update')">
            </div>
            <div class="reset_field reset_field--link">
                <a href=""  @click.prevent="nocode">{{ $t("pages.registration.nocode") }}</a>
                <a href=""  @click.prevent="logout">{{ $t("pages.login.signout") }}</a>
            </div>
        </form>
  	</div>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex';

export default {
 	name: 'verify-email',
    data(){
        return {
            loading: false
        }
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
			this.logoutRequest();
		},
        update(){
            this.loading = true;
            setTimeout(() => {
                this.$store.dispatch('setAuthUser')
                .then( ()=> {
                    this.$router.push({'path':'mi'})
                    this.loading = false
                })
                .catch(()=>this.loading = false);
            },1000)

        },
        nocode(){
            this.loading = true;
            setTimeout(() => {
                this.$store.dispatch('ereset')
                .then(()=> this.loading = false)
                .catch(()=>this.loading = false);
            },1000)
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
        &--text{
            height: 224px;
        }
        &--loading{
            text-align: center;
            height: 224px
            img{
                width: 100px;
            }
        }
    }
</style>