var anCostEcharts = echarts.init(document.getElementById("e3"));
var option = {
    title: {
        text: '',
	},
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
    	top:'3%',
        left: '8%',
        right: '8%',
        bottom: '6%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        min:0,
        max:100000,
        splitNumber:5,
        axisLine:{
            lineStyle:{
                color:'white'
            }
        },
        splitLine: {
            show: false,
        },
        axisLabel:{
            //fontWeight:10,
            fontsize:2,
            align:'center',
            interval:0,
        },
        axisTick: {
	        show: false
	    },//隐藏刻度条
//	    name:'平方米',
//      nameLocation:'end',
//      nameTextStyle:{
//          color:"#8d8d8d", 
//          fontSize:16, 
//          padding:[30,0,0]
//      }
    },
    yAxis: {
        type: 'category',
        data: ['A-02','A-04','A-06','A-08','A-09'],
        axisLine:{
            lineStyle:{
                color:'#ffffff',
                width:'2',
            }
        },
        axisLabel:{
        	interval: 0,
        	margin:10
        },
        axisTick:{
        	show:false
        },
//      name:'地块名',
//      nameLocation:'end',
//      nameGap:-5,
//      nameTextStyle:{
//          color:"#8d8d8d", 
//          fontSize:16,  
//          padding:[0,55,0,0]
//      }
    },
    series: [
        {
            name: "辅助",
            type: "bar",
            stack: "总",
            barWidth: 20,
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [1500,1500, 1500, 1500,1500]
        },
        {
            name: '',
            type: 'bar',
            stack: "总",
            data: [ 95726.02, 54330.88, 36242.56, 35797.86, 24169.19],
            barWidth: '20',
            itemStyle:{
                normal:{
                	//设置渐变色及圆角
                	//barBorderRadius: 7,
                	color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            {offset: 0, color: '#00a9ec'},
                            {offset: 1, color: '#00acf0'}

                        ]
                    )
                }
            },
            //为柱状添加顶部显示
            label: {
                normal: {
                    show: true,
                    position: "insideRight",
                    padding:[0,10,0,0],
                    offset: [5, 0],
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
                    }
                }
            },
        },
    ],
};
anCostEcharts.setOption(option);
var option1 = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right: 60,
        top: 20,
        bottom: 20,
        itemGap:20,
        textStyle:{
            color:'white',
            padding:[-5,0,0,0]
        },
        data:[
        	{name:'20-30',icon:'circle'},
        	{name:'31-40',icon:'circle'},
        	{name:'41-50',icon:'circle'},
        	{name:'51-60',icon:'circle'}
        ]
    },
    color:['#0076c4','#5850bd','#ffad04','#17ba9b'],
    series: [ {
            name:'人口年龄',
            type:'pie',
//          radius: ['50%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                	position:'inner',
                    show: true,
                    formatter:'{d}%',
                    color:"#fff"
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:110, name:'20-30'},
                {value:650, name:'31-40'},
                {value:110, name:'41-50'},
                {value:130, name:'51-60'}
			    ]
		 }]
	};
var anCostEcharts1 = echarts.init(document.getElementById("e4"));
anCostEcharts1.setOption(option1);
var option2 = {
    grid:{
    	top:'3%',
        left: '5%',
        right: '8%',
        bottom: '6%',
        containLabel: true
    },
    yAxis: [{
        type: "category",
        data: ["试运行、移交", "施工阶段", "施工准备", "勘察设计"],
        axisTick:{
            show:false
        },
        axisLine:{
             lineStyle:{
             	color:'#225b9e',
             }
        },
        axisLabel:{
        	rotate:30,
        	color:'white',
        },
    }],
    //color:['#5951be','#06c097','#ffad01','#0280cd'],
    color:'#54fbc3',
    xAxis: [{
        type: 'value',
        axisTick:{
            show:false,
        },
         axisLine:{
             lineStyle:{
             	color:'#225b9e',
             }
          },
         splitLine:{
             show:false,
//           lineStyle:{
//               type:'dashed',
//               color: ['#aaa', '#ddd']
//           },
         },
         axisLabel: {
             show:true,
             color:'white',
         },
         max:1000
    }],
    series: [{ // For shadow
            type: 'bar',
            itemStyle: {
                normal: {color: 'rgba(255,255,255,0.1)'}
            },
            barGap:'-100%',
            //barCategoryGap:'40%',
            data: [1000,1000,1000,1000],
            barWidth:25,
            animation: false
        },
    	{
            name: "辅助",
            type: "bar",
            stack: "总",
            barWidth: 25,
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [945,75, 30, 0]
        },
        {
            name: "试运行,移交",
            type: "bar",
            barWidth: 20,
            stack: "总",
            data: [20, '', '', ''],
            label: {
                normal: {
                	formatter:'20天',
                    show: true,
                    position: "right",
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
                    }
                }
            },
        },
        {
            name: "施工阶段",
            type: "bar",
            barWidth: 20,
            stack: "总",
            data: ['', 870, '', ''],
            label: {
                normal: {
                	formatter:'935天',
                    show: true,
                    position: "right",
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
                    }
                }
            },
            
        },
        {
            name: "施工准备",
            type: "bar",
            barWidth: 20,
            stack: "总",
            data: ['', '', 45, ''],
            label: {
                normal: {
                	formatter:'45天',
                    show: true,
                    position: "right",
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
                    }
                }
            },
        },
        {
            name: "勘察设计",
            type: "bar",
            barWidth: 20,
            stack: "总",
            data: ['', '', '',30],
            label: {
                normal: {
                	formatter:'30天',
                    show: true,
                    position: "right",
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 12
                    }
                }
            },
        }
    ]
};
var optionEchart2=echarts.init(document.getElementById("e2"));
optionEchart2.setOption(option2);
var box=document.getElementById("content");
var boole=true;
var timer=setInterval(function(){
	var imgList=box.getElementsByTagName("img");
	if(boole){
		for(var i=0,count=imgList.length;i<count;i++){
			imgList[i].style.width="81px";
			imgList[i].style.height="92px";
		};
		boole=false;
	}else{
		for(var i=0,count=imgList.length;i<count;i++){
			imgList[i].style.width="71px";
			imgList[i].style.height="82px";
		};
		boole=true;
	}
},700);