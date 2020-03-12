function $(id){
	   return document.getElementById(id);
}

function   donghua(element,times){
				clearInterval(element.time);
				  element.time=setInterval(function(){
					    var  cut=element.offsetLeft; //cut就是元素移动了多少
						
						 //times就是目标位置
						var leftp=(times-cut)/10;
						 leftp=leftp>0?Math.ceil(leftp):Math.floor(leftp);
						 cut+=leftp;
						 if(Math.abs(times-cut)>Math.abs(leftp)){
							  element.style.left=cut+"px";
						 }else{
							   element.style.left=times+"px";
						 }
						 if(cut==times){
							   clearInterval(element.time);
						 }
						 
					console.log("目标位置："+times+",当前位置："+cut+"每次移动步数:"+leftp);	 
						 
				  },20);
			}
			
		 // 获取任意一个元素的任意一个样式的属性的值兼容代码
		 
			function getStyle(element,attr){
				 if(window.getComputedStyle){
					 return window.getComputedStyle(element,null)[attr];
				 } 
				else{
					  return element.currentStyle[attr];
				}
				};