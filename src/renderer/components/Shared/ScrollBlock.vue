<template>
  	<div :id="'sb-'+id" class="scroll-block">
          <div class="scroll-block_wrap">
            <div class="scroll-block_bar">
                <div @mousemove="box.s.style.opacity = '1'" @mouseout="box.s.style.opacity = '0'" class="scroll-block_bar_container">
                    <div @dragstart="ondragstartSlider" @mousedown="onmousedownSlider" class="scroll-block_bar_slider"></div>
                </div>
            </div>
        
            <div @scroll="scrollContainer" class="scroll-block_content-container">
                <div class="iframe-hack">
                    <iframe frameborder="0"></iframe>
                    <slot></slot>
                </div>
            </div>
            
        </div>
  	</div>
</template>

<script>
import Vue from 'vue'
var counter = -1;
export default {
 	name: 'scroll-block',
	//components: {Chat},
    data(){
        return {
            timeoutId: null,
            oldTid: null,
            slider:{
                top:0,
                height:40,
            },
            contentScrollTop: 0,
            thumbCoords: {top:0,left:0},
            sliderCoords: {top:0,left:0},
            shiftY: 0,
            box:{
                s:null,
                c:null
            },
            container: null,
            drop:false,
            id: ++counter,
            scrollHeight: 0
        }
    },
	methods:{
        scrollShow(){
            this.box.s.style.opacity = '1';
            if(!this.drop){
                this.timeoutId = setTimeout(() => {
                    this.box.s.style.opacity = '0';
                },1000);
            }
              
        },
        step(){
            if(this.box.s.clientHeight > 40) this.slider.top = this.container.scrollTop / (this.container.scrollHeight / this.container.offsetHeight);
            else this.slider.top = this.container.scrollTop / ((this.container.scrollHeight - this.box.c.clientHeight) / (this.box.c.clientHeight - 40));
            this.box.s.style.top = this.slider.top + 'px';
        },
        hscroll(){
            let dol = (this.container.scrollHeight / (this.container.offsetHeight));
            this.slider.height = this.container.offsetHeight / dol;
            if(this.slider.height < 40) this.slider.height = 40;
            if(dol <= 1) this.slider.height = 0;
            this.box.s.style.height = this.slider.height +'px';
            this.step();
        },
        scroll(){
            this.contentScrollTop = ((this.container.scrollHeight - this.box.c.clientHeight) / (this.box.c.clientHeight - this.box.s.clientHeight)) * this.slider.top;
            this.container.scrollTop = this.contentScrollTop;
        },
        getCoords(elem) {
            var box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        },
        scrollContainer(){
            this.oldTid = this.timeoutId
            if(this.oldTid){
                clearTimeout(this.oldTid)
            }
            this.scrollShow()
            this.step();
        },
        onmousedownSlider(e) {
            this.thumbCoords = this.getCoords(this.box.s);
            this.shiftY = e.pageY - this.thumbCoords.top;
            // shiftY здесь не нужен, слайдер двигается только по горизонтали

            this.sliderCoords = this.getCoords(this.box.c);

            document.addEventListener('mousemove', this.onmousemoveDocument);
            document.addEventListener('mouseup', this.onmouseupDocument);
            document.addEventListener('mouseup', this.onmouseupDocument);
            document.getElementsByTagName('body')[0].style.cursor = 'pointer';
            document.body.onselectstart = function() { return false }


            return false; // disable selection start (cursor change)
        },
        onmousemoveDocument(e) {
            //  вычесть координату родителя, т.к. position: relative
            let newTop = e.pageY - this.shiftY - this.sliderCoords.top;

            // курсор ушёл вне слайдера
            if (newTop < 0) {
                newTop = 0;
            }
            let bottomEdge = this.box.c.offsetHeight - this.box.s.offsetHeight;
            if (newTop > bottomEdge) {
                newTop = bottomEdge;
            }
            this.slider.top = newTop
            this.box.s.style.top = newTop + 'px';
            this.drop = true;
            
            this.scroll();
        },
        onmouseupDocument() {
            document.getElementsByTagName('body')[0].style.cursor = '';
            document.removeEventListener('mousemove', this.onmousemoveDocument)
            document.removeEventListener('mouseup', this.onmouseupDocument)
            document.body.onselectstart = null;
            this.drop = false;
            this.box.s.style.opacity = '0';
        },
        ondragstartSlider(){
            return false;
        }
	},
	created(){
		
	},
    mounted(){
        window.addEventListener('resize', this.hscroll)
        this.box.s = document.querySelector('#sb-'+this.id+' .scroll-block_bar_slider');
        this.box.c = document.querySelector('#sb-'+this.id+' .scroll-block_bar_container');
        this.container = document.querySelector('#sb-'+this.id+' .scroll-block_content-container');
        let f = document.querySelector('#sb-'+this.id+' .scroll-block_content-container iframe');
        f.contentWindow.addEventListener('resize', this.hscroll)
        //f.contentWindow.document.body.onresize = () =>  this.hscroll();
        this.hscroll();
    },
    destroyed(){

    }
}
</script>

<style lang="scss">
	.scroll-block {
        height: inherit;
        box-sizing: content-box;
		&_wrap{
            box-sizing: content-box;
            position: relative;
            overflow: hidden;
            height: inherit;
        }

        &_bar{
            box-sizing: content-box;
            position: absolute;
            top: 0;
            right: 0;
            width: 5px;
            height: inherit;
            padding: 0 2px;
            z-index: 19;

            &:hover{
                width: 8px;
            }

            &_container{
                box-sizing: content-box;
                position: relative;
                height: inherit;
            }

            &_slider{
                box-sizing: content-box;
                position: absolute;
                background: rgba(0,0,0,0.2);
                border-radius: 4px;
                width: 100%;
                top:0; 
                opacity: 0;
                transition-property: opacity;
                transition-duration: 1s;
                cursor: pointer;
            }
        }

        &_content-container{
            box-sizing: content-box;
            padding-right: 33px;
            margin-right: -50px;
            height: inherit;
            overflow-y: scroll;
            overflow-x: hidden;

            .iframe-hack{
                position: relative;
                width: 100%;

                iframe{
                    position: absolute;
                    z-index: -1;
                    width: 100%;
                    height: 100%;
                }
            }
        }        

	}
</style>