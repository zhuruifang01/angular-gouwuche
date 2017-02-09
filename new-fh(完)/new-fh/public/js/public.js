function resize(originResize,type){
   			var type=type || "x";
   			if(type=="x"){
   				var widths=document.documentElement.clientWidth;
   				var scale=widths/originResize*100+"px";
   				
   				document.getElementsByTagName("html")[0].style.fontSize=scale;
   			}else if(type=="y"){
   				var heights=document.documentElement.clientHeight;
   				var scale=heights/originResize*100+"px";
   				document.getElementsByTagName("html")[0].style.fontSize=scale;

   			}
   		}