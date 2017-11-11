<template>
  	<div class="setting">
		<div class="top-line">
			
		</div>
		<scroll-block>
			<div>
                Настройки
			</div>
		</scroll-block>
	</div>
</template>

<script>
import Vue from 'vue'
import ScrollBlock from './../Shared/ScrollBlock.vue'

export default {
 	name: 'setting',
	components: {ScrollBlock},
	beforeRouteUpdate (to, from, next) {
		console.log(to);
		next();
    // обработка изменений параметров пути...
    // не забудьте вызывать next()
  	},
	methods:{
	},
	created:function(){
		console.log('created');
	}
}
</script>

<style lang="scss">
	.setting {
		height: 400px;

		.top-line{
			display: fixed;
			background-color: #fff;
		}
	}
</style>