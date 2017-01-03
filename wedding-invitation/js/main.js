window.onload = function() {
    let pages = document.getElementById('pages'),
    	page1 = document.getElementById('page1'),
    	page2 = document.getElementById('page2'),
    	page3 = document.getElementById('page3'),
    	page4 = document.getElementById('page4'),
        page5 = document.getElementById('page5'),
    	music = document.getElementById('music'),
    	audio = document.getElementsByTagName('audio')[0];

    //audio

    // music
    music.addEventListener('touchstart', event => {
    	if(audio.paused) {
    		audio.play();
    		music.setAttribute('class', 'play');
    	} else {
    		audio.pause();
    		music.setAttribute('class', '');
    	}
    }, false);

    // slider(pages);

    $('#pages .page').swipeUp(function(event) {
      alert("upload");
    })
};

let slider = function (domNode) {
	//初始化
    function init() {
        var self = domNode;     //this指slider对象
        self.addEventListener('touchstart',events,false);    //addEventListener第二个参数可以传一个对象，会调用该对象的handleEvent属性
    }

    let events = {
        index: 0,     //显示元素的索引
    	slider: domNode,     //this为slider对象
    	handleEvent: function(event) {
            var self = this;     //this指events对象
            if(event.type == 'touchstart'){
                self.start(event);
            }else if(event.type == 'touchmove'){
                self.move(event);
            }else if(event.type == 'touchend'){
                self.end(event);
            }
        },
        //滑动开始
        start:function(event) {
            var touch = event.targetTouches[0];     //touches数组对象获得屏幕上所有的touch，取第一个touch
            startPos = {x:touch.pageX,y:touch.pageY,time:+new Date};    //取第一个touch的坐标值
            isScrolling = 0;   //这个参数判断是垂直滚动还是水平滚动
            this.slider.addEventListener('touchmove',this,false);
            this.slider.addEventListener('touchend',this,false);
        },
        //移动
        move:function(event) {
            //当屏幕有多个touch或者页面被缩放过，就不执行move操作
            if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
            var touch = event.targetTouches[0];
            endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
            isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
            if(isScrolling === 1){
                event.preventDefault();      //阻止触摸事件的默认行为，即阻止滚屏
                // alert('up!');
                this.slider.className = 'page';
                // this.slider.style.top = '-' + 100*this.index +'%';
            }
        },
        //滑动释放
        end:function(event) {
            var duration = +new Date - startPos.time;    //滑动的持续时间
            if(isScrolling === 1){    //当为垂直滑动时
                // this.icon[this.index].className = '';
                if(Number(duration) > 10){     
                    //判断是上移还是下移，当偏移量大于10时执行
                    if(endPos.y > 10){
                    	// alert('上移');
                        // this.slider.
                        if(this.index !== 0) this.index -= 1;
                    }else if(endPos.y < -10){
                    	// alert('下移');
                        if(this.index !== 4) this.index += 1;
                    }
                }
                // this.icon[this.index].className = 'curr';
                this.slider.className = 'page slide';
                this.slider.style.top = '-' + 100*this.index +'%';
                // this.slider.style.left = -this.index*600 + 'px';
            }
            //解绑事件
            this.slider.removeEventListener('touchmove',this,false);
            this.slider.removeEventListener('touchend',this,false);
        }
    };

    init();
};