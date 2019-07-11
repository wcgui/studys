var wsScroll=(function(){
	for(let i=0;i<$(".wlh-scroll").length;i++){
		let $tar=$($(".wlh-scroll")[i]);
		clearInterval($tar.attr("data-interval"));
		$tar.attr("data-interval",null);
		let obj={},tops=$tar.children().first().children().first().height();
		obj.speed=!parseInt($tar.attr("data-speed"))?700:parseInt($tar.attr("data-speed"));
		obj.pause=!parseInt($tar.attr("data-pause"))?3000:parseInt($tar.attr("data-pause"));
		obj.showItems=!parseInt($tar.attr("data-showItems"))?5:parseInt($tar.attr("data-showItems"));
		obj.mousePause=$tar.attr("data-mousePause")=="false"?false:true;
		obj.isPaused=$tar.attr("data-isPaused")=="false"?false:true;
		obj.direction=$tar.attr("data-direction")=="down"?"down":"up";
		let startInterval=function($tar,obj){
			$tar.attr("data-interval",setInterval(function(){
				let $parent=$tar.children().first();
				if(obj.direction=="up"){
					$parent
						.stop()
						.animate({ top: "-" + tops + "px" },obj.speed, 
							function() {
							  $parent
								.append(
									$parent
									  .children()
									  .first()
								  );
							  $parent.css({ top: 0 });
							}
						);
			}else if(obj.direction=="down"){
					$parent.css({top:"-" + tops + "px"}).prepend($parent.children().last());
					$parent
						.stop()
						.animate({ top: 0 },obj.speed);
				}
			},obj.pause));
		}
		$tar.css({
			position:"absolute",
			overflow:"hidden",
			height:tops*obj.showItems+"px"
		}).children().first().css({
			position:"absolute",
			margin:"0px"
		})
		if(obj.isPaused){
			startInterval($tar,obj)
		}
		if(obj.mousePause){
			$tar.hover(function(){
				clearInterval($tar.attr("data-interval"));
				$tar.attr("data-interval",null);
			},function(){
				startInterval($tar,obj);
			});
		}
	}
})();