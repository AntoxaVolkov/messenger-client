<template>
  <div id="app">
    <top-line-control></top-line-control>
    <notification></notification>
    <div v-if="!$store.state.app.loading" class="container">
        <router-view></router-view>
    </div>
    <div v-if="$store.state.app.loading">
      <loading-page></loading-page>
    </div>
  </div>
</template>

<script>

import TopLineControl from './components/Control/TopLineControl/TopLineControl'
import Notification from './components/Shared/Notification'
import LoadingPage from './components/Shared/LoadingPage'

  export default {
    name: 'app',
    components:{ TopLineControl, Notification, LoadingPage },
    data(){
      return {
      }
    },
    created(){
      //console.log(this.$electron)
    },
    mounted(){

    }
    
  }
</script>

<style lang="scss">
  @import url('~@/assets/fonts/MaterialIcons/material-icons.css');
  @import url('~@/assets/fonts/SourceSansPro/stylesheet.css');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html { overflow:  hidden; }

  body { 
    font-family: 'Source Sans Pro', sans-serif;
  }
  
  #app{
    height: 100vh;
  }

  .container{
    padding-top: 30px;
    height: inherit;
  }

  .clearfix{
    clear: both;
  }
</style>
