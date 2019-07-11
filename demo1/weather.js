var wsWeather=(function(){
	const getWeather=function(dom){
		$.ajax({
			type:'get',
			url:"http://www.wanghonggui.com",
			dataType:"jsonp",   
			success(data){
				showWeather(dom,data);
			},
			error(err){
				console.log(err)
			}
		})
	};
	const showWeather=function(dom,data){
		let type=$(dom).attr("data-type");
		if(type==0){
			$(dom).html(`
				<div class="weather_title">
					<span class="city_name">${data.city}</span>	
					<em class="fl s">${data.data[0].tem1}/${data.data[0].tem2}</em>
				</div>
			`)
			.attr("title",data.data[0].wea);
		}else{
			let doms=`<div class="weather_day">
				<p>${data.data[0].day}</p>
				<p>${data.data[0].tem}<span style="font-size:14px;">(实时)</span></p>
				<p>${data.data[0].tem2}~${data.data[0].tem1}</p>
				<p>${data.data[0].wea}</p>
				<p><span style="">${data.data[0].air}${data.data[0].air_level}<span></p>
			</div>`;
			
			let html="<div class='weather_hours'>";
			data.data[0].hours.forEach(function(item,key){
				html+=`<div><span>${item.day.slice(-3)}</span>`;
				html+=`<span>${item.wea}</span>`;
				html+=`<span>${item.win}</span>`;
				html+=`<span>${item.win_speed}</span></div>`;
			});
			html+="</div>";
			$(dom).html(doms+html).attr("title","");
		}
	}
	return {
		getWeather
	}
})()
