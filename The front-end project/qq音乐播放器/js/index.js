$(function(){

    var  $audio=$("audio");
    var  player=new Player($audio);
  var $progressBar=$(".music_progress_bar");
    var $progressLine=$(".music_progress_line");
    var $progressDot=$(".music_progress_dot");
    var progress=Progress($progressBar,$progressLine,$progressDot);
    progress.progressClick(function(value){
       player.musicSeekTo(value);
    });
    progress.progressMove(function(value){
        player.musicSeekTo(value);
    });
//ajax接受数据
    getPlayList();
    function getPlayList(){
        $.ajax({
            url:"./source/musiclist.json",
            dataType:"json",
            success:function(data){
                player.musicList=data;
                var $musicList=$(".content_list ul");
                $.each(data,function(index,ele){
                    //遍历获取到的数据，创建每一条音乐
                    var $item =crateMusicItem(index,ele);

                    $musicList.append($item);
                });
                initMusicInfo(data[0]);
            },
            error:function(e){
                console.log(e);
            }
        })
    }

    //初始化歌曲信息
function initMusicInfo(music){
        //获取对应的元素
    var  $musicImage=$(".song_info_pic img");
    var  $musicName=$(".song_info_name a");
    var  $musicSinger=$(".song_info_singer a");
    var  $musicAblum=$(".song_info_ablum a");
    var  $musicProgressName=$(".music_progress_name");
    var  $musicProgressTime=$(".music_progress_time");
    var  $musicBg=$(".mask_bg");
    //给获取到的元素赋值
      $musicImage.attr("src",music.cover);
      $musicName.text(music.name);
    $musicSinger.text(music.singer);
    $musicAblum.text(music.album);
    $musicProgressName.text(music.name+" / "+music.singer);
    $musicProgressTime.text("00:00"+" / "+music.time);
    $musicBg.css({
           background:"url('"+music.cover+"')"
    })
}
    //8.监听播放的进度
    player.MusicTimeUpdate(function(currentTime,duration,timeStr){

        //同步事件
          $(".music_progress_time").text(timeStr);
          //同步进度条
        //计算播放时长比例
        var value=currentTime /duration * 100;
        progress.setProgress(value);

    })
    //初始化事件监听
    initEvent();
    function initEvent(){
        //监听list_music中的按钮的移入和移出
        //因为是动态创建的列表 所以需要事件委托
        $(".content_list").delegate(".list_music","mouseenter",function(){
            $(this).find(".list_menu").stop().fadeIn(500);
            $(this).find(".list_time span").stop().fadeOut(500);
            $(this).find(".list_time a").stop().fadeIn(500);
        });
        $(".content_list").delegate(".list_music","mouseleave",function(){
            $(this).find(".list_menu").stop().fadeOut(500);
            $(this).find(".list_time span").stop().fadeIn(500);
            $(this).find(".list_time a").stop().fadeOut(500);
        });
        //监听复选框的点击事件
        $(".content_list").delegate(".list_check","click",function(){
            $(this).toggleClass("list_checked");
        })
//3.事件委托 写播放按钮
        var $musicPlay=$(".music_play");
        $(".content_list").delegate(".list_menu_play","click",function(){
            var $item= $(this).parents(".list_music");
            $(this).toggleClass("list_menu_play2");
            console.log($item.get(0).index);
            console.log($item.get(0).music);
            $item.siblings().find(".list_menu_play").removeClass("list_menu_play2");
            //同步底部的播放按钮
            if($(this).attr("class").indexOf("list_menu_play2")!=-1){
                $musicPlay.addClass("music_play2");
                $item.find("div").css({
                    color:"#fff",
                })
                $item.siblings().find("div").css({
                    color:"rgba(255,255,255,0.5)",
                })
            }else{
                $musicPlay.removeClass("music_play2");
                $item.find("div").css({
                    color:"rgba(255,255,255,0.5)",
                })
            }
            //切换序号的状态
            $(this).parents(".list_music").find(".list_number").toggleClass("list_number2");
            $(this).parents(".list_music").siblings().find(".list_number").removeClass("list_number2");
            //q3.5  播放音乐
       player.playMusic($item.get(0).index,$item.get(0).music);
        //3.6 切换歌曲信息
            initMusicInfo($item.get(0).music);

        });
        ///4.监听底部播放按钮的点击
        $musicPlay.click(function(){
          if(player.currentIndex==-1){
               //没有播放过音乐
              $(".list_music").eq(0).find(".list_menu_play").trigger("click");
          }else{
               //已经播放过音乐
              $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
          }
        })
        ///4.监听底部上一首按钮的点击
        $(".music_pre").click(function(){
            $(".list_music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
        })
        ///4.监听底部下一首按钮的点击
        $(".music_next").click(function(){
            $(".list_music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
        })
        //7.监听删除按钮的点击事件
        $(".content_list").delegate(".list_menu_del","click",function(){
              var  $item=$(this).parents(".list_music");
            if($item.get(0).index==player.currentIndex){
                $(".music_next").trigger("click");
            }
              $item.remove();
              player.changeMusic($item.get(0).index);


              //序号重新排序一下
               $(".list_music").each(function(index,ele){
                     ele.index=index;
                     $(ele).find(".list_number").text(index+1);
               })

        })
    }


    //创建一个方法定义音乐
    function crateMusicItem(index,music){
          var $item=$("" +
              "<li class=\"list_music\">\n" +
              "<div class=\"list_check\"><i></i></div>\n" +
              "<div class=\"list_number \">"+(index + 1)+"</div>\n" +
              "<div class=\"list_name\">"+music.name+"" +
              "     <div class=\"list_menu\">\n" +
              "          <a href=\"javascript:;\" title=\"播放\" class='list_menu_play'></a>\n" +
              "          <a href=\"javascript:;\" title=\"添加\"></a>\n" +
              "          <a href=\"javascript:;\" title=\"下载\"></a>\n" +
              "          <a href=\"javascript:;\" title=\"分享\"></a>\n" +
              "     </div>\n" +
              "</div>\n" +
              "<div class=\"list_singer\">"+music.singer+"</div>\n" +
              "<div class=\"list_time\">\n" +
              "     <span>"+music.time+"</span>\n" +
              "     <a href=\"javascript:;\" title=\"删除\" class='list_menu_del'></a>\n" +
              "</div>\n" +
              "</li>");
          $item.get(0).index=index;
        $item.get(0).music=music;
    return $item;
    }
});