function $(id){
	   return document.getElementById(id);
}
 function donghua(element,times){
			   clearInterval(element.time);
			   element.time=setInterval(function(){
			   				    leftp=9;
								   //times就是目标位置
								   //leftp就是移动的距离
								  leftp=cut<times?leftp:-leftp;
								  cut=cut+leftp;
			   				    
			   					if(Math.abs(times-cut)>Math.abs(leftp)){
									element.style.left=cut+"px";
			   						   
			   					}
								else{
									 clearInterval(time);
									 element.style.left=times+"px";
								}
			   					},50);
			     }