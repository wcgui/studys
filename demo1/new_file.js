var tradeCountry = (function () {

    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';

    var color = ['#a6c84c', '#ffa022', '#46bee9'];

    var coords = [{
            name: "武汉",
            coords: [114.323084, 30.597223]
        },
        {
            name: "美国",
            coords: [-101.448798,43.859701]
        },
        {
            name: "日本",
            coords: [139.710816,37.212906]
        },
        {
            name: "韩国",
            coords: [127.981214,36.525531]
        },
        {
            name: "法国",
            coords: [2.267101,47.490183]
        },
        {
            name: "新加坡",
            coords: [103.826492, 1.307072]
        }, 
        {
            name: "印度",
            coords: [77.13, 28.37]
        },
        {
            name: "印度尼西亚",
            coords: [120.231981, 1.976098]
        },
        {
            name: "泰国",
            coords: [102.290119, 15.470709]
        },
        {
            name: "越南",
            coords: [104.337567,21.859394]
        },
        {
            name:"巴西",
            coords:[-56.221581,-8.152319]
        },
        {
            name:"俄罗斯",
            coords:[63.197147,61.630104]
        },
        {
            name:"澳大利亚",
            coords:[136.315480,-22.602333]
        }
    ];

    function getLinesData(coords) {
        var res = [];

        var wuhan = coords[0];
        for (var i = 0; i < coords.length; i++) {
            if (i !== 0) {
                res.push({
                    from: wuhan.name,
                    to: coords[i].name,
                    coords: [
                        wuhan.coords,
                        coords[i].coords
                    ]
                });
            }
        }
        return res;
    }

    var linesData = getLinesData(coords);

    /**
     * 地图配置
     */
    var geo = {
        roam: false,
        map: 'world',
        zoom: 1,
        scaleLimit: {
            max: 4
        },
        zLevel: 1,
        layoutCenter: ['30%', '55%'],
        // center:[114.323084,30.597223],
        layoutSize: 1700,
        label: {
            show: false,
            color: "#fff",
            fontSize: 8
        },
        itemStyle: {
            areaColor: 'transparent',
            borderColor: '#54BBBC',
            borderWidth: 1,
            shadowColor: 'rgba(63, 218, 255, 0.5)',
            shadowBlur: 30,
            shadowOffsetX: 5
        },
        emphasis: {
            label: {
                color: "#F4E925"
            },
            itemStyle: {
                areaColor: '#2B91B7',
            }
        }
    }

    var worldMap = echarts.init(document.getElementById("worldMap"));

    var worldOption = {
        geo: geo,
        series: [{
                name: 'Top10',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                symbolSize: function (val) {
                    return val[2] / 4;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                },
                itemStyle: {
                    color: color[0]
                },
                data: coords.map(function (item) {
                    if (item.name === '武汉') {
                        return {
                            name: item.name,
                            value: item.coords.concat([100])
                        }
                    } else {
                        return {
                            name: item.name,
                            value: item.coords.concat([50])
                        }
                    }
                })
            },
            {
                name: "33",
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 3,
                lineStyle: {
                    color: color[0],
                    width: 1,
                    opacity: 0.1,
                    curveness: 0.1
                },
                effect: {
                    show: true,
                    period: 4,
                    trailLength: 0.5,
                    // color: '#fff',
                    symbol: planePath,
                    symbolSize: 6
                },
               
                data: linesData
            }
        ]
    }

    var updateOption = function () {
        console.log("333");

        worldMap.setOption(worldOption);
    }
    /***********************End gis****************************************/

    /********************Begin Bar***************************/
    var myEcharts = echarts.init(document.getElementById("echartsBox"));

    var echartsOption = {
        color: '#66FFFF',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: 40
        },
        calculable: true,
        xAxis: {
            type: 'category',
            // position:"top",
            inverse:true,
            axisLine: {
                lineStyle: {
                    color: '#FFF'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                color: '#fff',
                rotate: -30,
                fontSize: 12
            },
            data: ['美国','日本','韩国','德国','法国',
            '新加坡','印度','印尼','泰国','越南']
        },
        yAxis: [{
            type: 'value',
            // inverse:true,
            position:'right',
            axisLine: {
                lineStyle: {
                    color: '#FFF'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                color: '#fff',
                fontSize: 12,
            },
            splitLine: {
                show: false
            },
        }],
        series: [{
            name: '货运量',
            type: 'bar',
            data: [1000,900,800,780,760,
            500,400,300,200,200],
            barWidth: '30%',
            itemStyle: {
                barBorderRadius: 5, //柱状角成椭圆形
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {

                    var colorList = [
                        ['#39E7FB', '#fff'],
                        ['#FAC901', '#fff'],
                        ['#70AD47', '#fff'],
                        ['#4472C4', '#fff'],
                        ['#562712', '#fff'],
                        ['#EC7C30', '#fff'],
                        ['#4371C3', '#fff'],
                        ['#6FAC46', '#fff'],
                        ['#39E7FB', '#fff'],
                        ['#4472C4', '#fff']
                    ];
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [　　　　　　　　　　　　　　{
                        offset: 0,
                        color: colorList[params.dataIndex][0]
                    }, {
                        offset: 1,
                        color: colorList[params.dataIndex][1]
                    }　　　　　　　　　　　　　]);
                }
            }
        }]
    }

    myEcharts.setOption(echartsOption);
    /********************End Bar***************************/


    return {
        updateOption: updateOption
    }

})();



$.getJSON("/static/world.json", function (geoJson) {
    console.log("2222");
    echarts.registerMap('world', geoJson);
    tradeCountry.updateOption();
});