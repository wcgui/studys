var wsCarousel=(function(){
	//初始化轮播的界面
	const initInterface=function(obj){
		let tpl=`
		<div id="${obj.id}" class="wlh-carousel-box" data-value="0">
			<ul class="wlh-carousel wlh-clear ${obj.id}">`;
			for(let i=0;i<obj.imgPath.length;i++){
				tpl+=`
					<li>
						<img src="${obj.imgPath[i]}">
					</li>
				`;
			}
			tpl+=`<li>
						<img src="${obj.imgPath[0]}">
					</li>`;
			tpl+=`</ul>
			<div class="wlh-carousel-prev" id="${obj.id+'-prev'}"></div>
			<div class="wlh-carousel-next" id="${obj.id+'-next'}"></div>
		</div>`,
		style=`<link href="index.css" rel="stylesheet" type="text/css" id="sy-carousel-css">`;
		if(!$(".wlh-carousel").length){
			$("head").append(style);
		}
		$("body").append(tpl);
		setTimeout(function(){
			$("#"+obj.id+">ul.wlh-carousel").css({width:parseInt((obj.imgPath.length+1)*$($("."+obj.id+">li")[0]).width())+"px"});
		},obj.time)
		$("#"+obj.id).attr("data-time",setInterval(function(){
			let count=parseInt($("#"+obj.id).attr("data-value"));
			let width=$($("."+obj.id+">li")[0]).width();
			if(count>=$("."+obj.id+">li").length){
				count=1;
				$("."+obj.id).css({left:0});
			}
			$("."+obj.id).stop().animate({left:-width*count},function(){
				count++;
				$("#"+obj.id).attr("data-value",count);
			});
		},obj.time));
	}
	const mouseHover=function(obj){
		let id=obj.id,time=obj.time;
		$("#"+id).hover(function(){
			clearInterval($("#"+id).attr("data-time"));
			$("#"+id).attr("data-time",null);
		},function(){
			$("#"+id).attr("data-time",setInterval(function(){
				let count=parseInt($("#"+id).attr("data-value"));
				let width=$($("."+id+">li")[0]).width();
				console.log("wang",id)
				if(count>=$("."+id+">li").length){
					count=1;
					$("."+id).css({left:0});
				}
				$("."+id).stop().animate({left:-width*count},function(){
					count++;
					$("#"+id).attr("data-value",count);
				});
			},time));
		}).on("click","#"+id+"-prev,#"+id+"-next",function(e){
			let width=$($("."+id+">li")[0]).width();
			let count=parseInt($("#"+id).attr("data-value"));
			if($(e.target).attr("id")==id+"-prev"){
				count-=2;
				if(count<0){
					$("."+id).css({left:-($("."+id+">li").length-1)*width});
					count=$("."+id+">li").length-2;
					$("#"+id).attr("data-value",count);
				}
			}else if(($(e.target).attr("id")==id+"-next")){
				if(count>=$("."+id+">li").length){
					$("."+id).css({left:0});
					count=1;
					$("#"+id).attr("data-value",count);
				}
			}
			$("."+id).stop().animate({left:-width*count},function(){
				count++;
				$("#"+id).attr("data-value",count);
			});
		});
	}
	const show=function(obj){
		if(!parseInt(obj.time)){
			obj.time=3000;
		}else if(obj.time<1000){
			obj.time=3000;
		}
		initInterface(obj);
		mouseHover(obj);
	}
	return {
		show:show
	}
})();
