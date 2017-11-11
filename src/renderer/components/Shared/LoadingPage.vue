<template>
  	<div class="loading-page">
		<span><img src="~@/assets/img/spinner.svg" alt=""></span>
  	</div>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex';

export default {
 	name: 'loading-page',
	//components: {Chat},
	methods:{
	},
	created:function(){
		
	}
}
</script>

<style lang="scss">
	.loading-page {
		text-align: center;
		height: 100vh;
		
		span{
			line-height: 100vh;
		}
	}
</style>