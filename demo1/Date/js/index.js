const Dates=(function(){
	//格式化日期
	const isSameTime = function(a,b){
		if(typeof(a)=='undefined'){
			return false;
		}
		if(typeof(b)=='undefined'){
			b = new Date();
		}
		return a.getTime()===b.getTime();
		
	}
	
	return {
		isSameTime
	}
})();
