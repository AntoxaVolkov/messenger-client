<template>
  <div class="top-line-control_container">
    <div class="top-line-control">
        <span class="top-line-control_title">AVMessenger</span>
    </div>
    <div class="top-line-control_right">
      <a class="top-line-control_btn" href="#" @click.prevent="minimize"><i class="material-icons">remove</i></a>
      <a v-if="isMaximize" class="top-line-control_btn" href="#" @click.prevent="unmaximize"><i class="material-icons">filter_none</i></a>
      <a v-if="!isMaximize" class="top-line-control_btn" href="#" @click.prevent="maximize"><i class="material-icons">crop_din</i></a>
      <a class="top-line-control_btn--close" href="#" @click.prevent="close"><i class="material-icons">close</i></a>
      <div class="clearfix"></div>
    </div>
  </div>
  
</template>

<script>

  export default {
    name: 'top-line',
    data(){
      return {
        win: this.$electron.remote.getCurrentWindow(),
        isMaximize: this.$electron.remote.getCurrentWindow().isMaximized()
      }
    },
    methods: {
      close(){
        this.win.close();
      },
      minimize(){
        this.win.minimize();
      },
      unmaximize(){
        this.win.unmaximize();
        this.isMaximize = false;
      },
      maximize(){
        this.win.maximize();
        this.isMaximize = true;
      }
    }
  }
</script>

<style lang="scss">
    .top-line-control{
        background-color: #2DA4E1;
        height: 30px;
        -webkit-app-region: drag;
        margin-right: 180px;

        &_container{
          position: fixed;
          width: 100%;
          z-index: 999;
        }

        .top-line-control_title{
          color:white;
          padding-left: 15px;
          line-height: 30px;
        }

        &_right{
          background-color: #2DA4E1;
          text-align: right;
          //padding: 1px 3px;
          z-index: 10;
          position: absolute;
          top:0;
          right: 0;
          width: auto;

          a{
            display: block;
            width: 60px;
            height: 30px;
            float: left;
            text-align: center;
            &:hover{
              background-color: #0c82c0;
            }
            &.top-line-control_btn--close:hover{
              background-color: #FF5555;
            }
          }

          i{
            color:#fff;
            line-height: 30px;
          }


        }
    }
</style>