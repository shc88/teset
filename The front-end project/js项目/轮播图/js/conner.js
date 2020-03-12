function $(id){
	   return document.getElementById(id);
}

//动画 移动函数  element是对象 times是目标位置
function donghua(element,times){
			   clearInterval(element.time);
			   element.time=setInterval(function(){
				   var cut=element.offsetLeft;
			   				    leftp=9;
								   //times就是目标位置
								   //leftp就是移动的距离
								  leftp=cut<times?leftp:-leftp;
								  cut=cut+leftp;
			   				    
			   					if(Math.abs(times-cut)>Math.abs(leftp)){
									element.style.left=cut+"px";
			   						   
			   					}
								else{
									 
									 element.style.left=times+"px";
								}
			   					},10);
			     }