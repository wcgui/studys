
var wsScroll=(function(){
	for(let i=0;i<$(".wlh-tabulate").length;i++){
		let $parent=$($(".wlh-tabulate")[i]);
		$parent.children(".wlh-tabulate-header").on("click","span",function(){
			let className=$(this).attr("class");
			className=className.split(" ")[0];
			let index=$(this).attr("data-index");
			$(this).addClass(className+"-on")
				.siblings()
				.removeClass(className+"-on");
			$parent.children(".wlh-tabulate-content")
				.children("div")
				.eq(index)
				.fadeIn()
				.siblings()
				.hide();
		})
	}
})();