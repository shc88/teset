(function(window){
    function Progress($progressBar,$progressLine,$progressDot){
        return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }
    Progress.prototype= {
        constructor: Progress,
        musicList: [],
        init: function ($progressBar,$progressLine,$progressDot) {
    this.$progressBar=$progressBar;
    this.$progressLine=$progressLine;
    this.$progressDot=$progressDot;
        },
        isMove:false,
        progressClick:function(classBack){
            var $this=this;  //此时此刻的this就是progress
           this.$progressBar.click(function(event){

           //获取背景距离窗口默认的距离
               var normalLeft=$(this).offset().left;
           //获取点击的位置距离窗口的默认位置
                var eventLeft=event.pageX;
                $this.$progressLine.css("width",eventLeft-normalLeft);
               $this.$progressDot.css("left",eventLeft-normalLeft);
               //计算进度条的比例
             var value= (eventLeft-normalLeft)  / $(this).width();
       classBack(value);
           });
        },
        progressMove:function(classBack){
            var $this=this;
                 //1监听鼠标按下事件
            this.$progressBar.mousedown(function(){
                $(this).isMove=true;
                var normalLeft=$(this).offset().left;
                //2监听鼠标移动事件
                $(document).mousemove(function(event){
//获取背景距离窗口默认的距离

                    //获取点击的位置距离窗口的默认位置
                    var eventLeft=event.pageX;
                    $this.$progressLine.css("width",eventLeft-normalLeft);
                    $this.$progressDot.css("left",eventLeft-normalLeft);
                    var value= (eventLeft-normalLeft)  / $(this).width();
                    classBack(value);
                });
            });

                 //3监听鼠标抬起事件
            $(document).mouseup(function(){
                 //off移除事件
                  $(document).off("mousemove");
                  $this.isMove=false;
            });
        },
        setProgress:function(value){
            if(this.isMove)return ;
                if(value<0 || value>100) return;
                this.$progressLine.css({
                  width:value+"%",
                });
               this.$progressDot.css({
                left:value+"%",
               });
        }
    };
    Progress.prototype.init.prototype=Progress.prototype;
    window.Progress=Progress;
})(window);