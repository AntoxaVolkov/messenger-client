<template>
    <div class="chat__bottom-line">
        <div class="field-for-message__control">
            <span @click="send" class="field-for-message__control__send"><i class="material-icons">send</i></span>
            <span class="field-for-message__control__attach"><i class="material-icons">attach_file</i></span>
            <span class="field-for-message__control__emoticon"><i class="material-icons">insert_emoticon</i></span>
        </div>
        <div class="field-for-message__container">
            <textarea v-model="message.text" @keydown.enter="enterPrevent" @keyup.enter="send" @input="textareaResize" rows="1" class="field-for-message" :placeholder="$t('pages.chat.message') + '...' "></textarea>
        </div>
            
    </div>
</template>

<script>
   import Vue from 'vue'
   export default {
        name: 'bottom-line',
        data(){
            return {
                message: {
                    text: null,
                },
                topLineMenu: false
            }
        },
        activated(){
            this.$emit('chengeHeight', this.getHeight());
        },
        methods:{
            textareaResize(e){
                let oldRows = e.target.rows;
                e.target.rows = 1;
                let rows = (e.target.scrollHeight - 10)/18;
                if(rows < 8 && rows != oldRows){
                    e.target.rows =  rows;
                    this.$emit('chengeHeight', e.path[2].offsetHeight)
                }else{
                    e.target.rows =  oldRows;
                }
                
            },
            getHeight(){
                let line = document.querySelector('.chat__bottom-line');
                return line.offsetHeight;
            },
            enterPrevent(e){
                if(!e.shiftKey){
                    e.preventDefault();
                }
            },
            send(e){
                if(!e.shiftKey){
                    this.$emit('submit', this.message);
                } 		
            }
        }
    } 
</script>

<style lang="scss">
    .chat__bottom-line{
		border-top: 1px solid #aaa;
        position:fixed;
        bottom: 0;
        left:380px;
        right:0;
        background-color: #fff;

        .field-for-message{
            border: none;
            outline: none;
            width: 100%;
            resize: none;
            padding:5px 50px 5px 5px;
            color: #333;
            font-size: 16px;

            &__container{
                padding: 10px 40px;
                width: 100%;
            }

            &__control{

                &__send{
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    padding: 5px;
                    color: #999;
                    cursor:pointer;

                    &:hover{
                        color:#666;
                    }
                }

                &__attach{
                    position: absolute;
                    bottom: 5px;
                    left: 5px;
                    padding: 5px;
                    color: #999;
                    cursor:pointer;

                    &:hover{
                        color:#666;
                    }
                }

                &__emoticon{
                    position: absolute;
                    bottom: 5px;
                    right: 50px;
                    padding: 5px;
                    color: #999;
                    cursor:pointer;

                    &:hover{
                        color:#666;
                    }
                }
            }
            
        }
    }
</style>