
window.onload=function(){
var count=0;
setInterval(function(){
         count++;
         var header=document.getElementById("msakic");
         if(count>2){
              count=0;
         }
         header.style.background="url('img/bg-hero"+count+".jpg') no-repeat 0 0";
         header.style.transition="1s";

},2000);

     var welcome=document.getElementById("ulobj");
     var dv=document.getElementById("dv");

  var dvchild=welcome.children[0];
  console.log(dvchild);
     var names=['网站','张三','李四','赵武'];
   var ulobj=document.createElement("ul");
    dv.appendChild(ulobj);
     for(var i =0;i<names.length;i++){
        var lis=document.createElement("li");
        ulobj.appendChild(lis);
        lis.innerHTML=names[i];
    }
    dvchild.onmouseenter=function(){
        dv.style.display="block";
    }
    dvchild.onmouseleave=function(){
        dv.style.display="none";
    }
};


