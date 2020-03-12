
function $(id){
	   return document.getElementById(id);
}

			function getStyle(element,attr){
				 if(window.getComputedStyle){
					 return window.getComputedStyle(element,null)[attr];
				 } 
				else{
					  return element.currentStyle[attr];
				}
				}
				//attr 属性名字
				//element 元素名称
				//times 目标位置
function   donghua(element,json,fn){
				clearInterval(element.time);
				  element.time=setInterval(function(){
					  for(var  attr in json){
						    var  cut= parseInt(getStyle(element,attr)); //cut就是元素移动了多少
						    	//attr 就是样式
						    	 //times就是目标位置
								 var  times=json[attr];
						    	var leftp=(times-cut)/10;
						    	 leftp=leftp>0?Math.ceil(leftp):Math.floor(leftp);
						    	 cut+=leftp;
						    	 if(Math.abs(times-cut)>Math.abs(leftp)){
						    		  element.style[attr]=cut+"px";
						    	 }else{
						    		   element.style[attr]=times+"px";
						    	 }
						    	
						    	 
						    	
					  }
					     if(cut==times){
					     	clearInterval(element.time);
					     }
						 console.log("目标位置："+times+",当前位置："+cut+"每次移动步数:"+leftp);
						 if(fn){
							  fn();
						 }
				  },20);
			}
			
		 // 获取任意一个元素的任意一个样式的属性的值兼容代码
		 