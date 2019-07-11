(function(){
	let width=window.screen.width,
		height=window.screen.height,
		workWidth=$(".workspace").width();
		workHeight=$(".workspace").height();
		console.log(width)
		let scaleWidth=width/workWidth,
		scaleHeight=height/workHeight;
		let scales=scaleHeight>scaleWidth?scaleHeight:scaleWidth;
		$(".workspace").css({
			"transform":"scale("+scales+")",
			"transformOrigin":"left top",
			"backgroundSize":"100% 100%"
		});
})()
