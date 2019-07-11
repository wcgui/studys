function Progress_air(target,option){
    let defaultVal={
        backgroundColor:'#070826',
        title:{
            show:true,
            text:'王常规',
            top:'10%',
            left:20,
            textStyle:{
                color:'#fff',
                fontWeight:'bold',
                fontSize:24,
                fontFamily:'sans-serif'
            },
        },
        legend:{
            show:true,
            left:'',
            top:'',
            data:['王','长'],
            type:'circle',
            orient:'horizontal',//水平
            color:'#14AFF6',
            textStyle:{
                color:'blue',
                fontWeight:'bold',
                fontSize:24,
                fontFamily:'sans-serif'
            },
        },
        bottomBar:{
            color:'#42BAFE',
            lineWidth:3,
        },
        radiusBar:{
            color:['#3AD5AF','#6FD8F7',],
            lineWidth:3,
        },
        grid:{
            left:'10%',
            top:60,
            right:'10%',
            bottom:10,
        },
        dataVal:[
            {name:'王',value:900,},
            {name:'红',value:543},
            {name:'王',value:800,},
            {name:'红',value:543},
            {name:'D',value:700,},
            {name:'D',value:643},
            {name:'D',value:400,},
            {name:'F',value:343},
        ],
        dataCountVal:[1000,1000,1000,1000,1000,1000,1000,1000]
    }
    // defaultVal=Object.assign(defaultVal, option);
    for(var i in option){
        var news=option[i];
        var defaults=defaultVal[i];
        if(!Array.isArray(defaultVal[i])){
            if(typeof(news)==="object"){
                for(let op in news){
                    if(!Array.isArray(news[op])){
                        if(typeof(news[op])==="object"){
                            defaultVal[i][op]=Object.assign(defaults[op], news[op]);
                        }else{
                            defaultVal[i][op]=news[op];
                        }
                    }else{
                        defaultVal[i][op]=news[op];
                    }
                }
               
            }else{
                defaultVal[i]=news;
            }
        }else{
            defaultVal[i]=news;
        }
    }
    this.init=function(){
        let canvas=document.createElement("canvas");
        canvas.setAttribute("width",target.style.width);
        canvas.setAttribute("height",target.style.height);
        let ctx=canvas.getContext("2d");
        ctx.fillStyle=defaultVal.backgroundColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        target.appendChild(canvas);
        this.canvas=canvas;
        this.ctx=ctx;
        this.width=canvas.width;
        this.height=canvas.height;
        this.count=0;
        this.array=new Array();
        this.arrayCircle=new Array();
        this.arrayText=new Array();
        this.arrayCircle1=new Array();
        this.arrayText1=new Array();
        this.n=0;
        for(let i=0,count=defaultVal.dataVal.length;i<count;i++){
            this.arrayCircle.push(0);
            this.arrayCircle1.push(0);
            this.arrayText1.push(0);
            this.arrayText.push(0);
        }
        this.canvas.onmousemove=function(e){
            var e = event || window.event;
        }.bind(this);
    }
    this.init();
    this._drawTitle=function(ctx,title,width,height){
       if(!title.show){
           return;
       }else{
           if(!title.text){
               return;
            }else{
                ctx.beginPath();
                ctx.save();
                ctx.fillStyle=title.textStyle.color;
                ctx.font=title.textStyle.fontWeight+" "+title.textStyle.fontSize+"px "+title.textStyle.fontFamily;
                if(typeof(title.top)==="string"){
                    if(title.top.match("%")){
                        title.top=parseInt(title.top.slice(0,-1));
                        if(typeof(title.top)==="number"){
                            title.top=width*title.top/100;
                        }else{
                            title.top=10;
                        }
                    }else{
                        title.top=10;
                    }
                }
                if(typeof(title.left)==="string"){
                    if(title.left.match("%")){
                        title.left=parseInt(title.left.slice(0,-1));
                        if(typeof(title.left)==="number"){
                            title.left=width*title.left/100;
                        }else{
                            title.left=10;
                        }
                    }else{
                        title.left=10;
                    }
                }
                ctx.fillText(title.text,title.left,title.top);
            }
       }
    }
    this._drawLegend=function(ctx,legend,width,height){
        if(!legend.show||!legend.data){
            return;
        }else{
            ctx.beginPath();
            ctx.restore();
            if(typeof(legend.data)==='string'){
                let array=new Array(legend.data);
                legend.data=array;
            } 
            if(typeof(legend.color)==='string'){
                let array=new Array(legend.color);
                legend.color=array;
            } 
            if(legend.orient==="horizontal"){
                if(legend.type=='circle'){
                    if(typeof(legend.top)==="string"){
                        if(legend.top.match("%")){
                            legend.top=parseInt(legend.top.slice(0,-1));
                            if(typeof(legend.top)==="number"){
                                legend.top=width*legend.top/100;
                            }else{
                                legend.top=10;
                            }
                        }else{
                            legend.top=10;
                        }
                    }
                    if(typeof(legend.left)==="string"){
                        if(legend.left.match("%")){
                            legend.left=legend.left.slice(0,-1);
                            if(typeof(legend.left)==="number"){
                                legend.left=width*legend.left/100;
                            }else{
                                legend.left=width*30/100;
                            }
                        }else{
                            legend.left=width*30/100;
                        }
                    }
                    for(let i=0,count=legend.data.length;i<count;i++){
                        ctx.save();
                        ctx.translate(legend.left,legend.top);
                        if(i>legend.color.length){
                            var index=i-legend
                        }
                        ctx.arc(0,10,width*1/100,0,Math.PI*2,false);
                        ctx.fill();
                        ctx.fillStyle=legend.textStyle.color;
                        ctx.font=legend.textStyle.fontWeight+" "+legend.textStyle.fontSize+"px "+legend.textStyle.fontFamily;
                        ctx.fillText(legend.data[i],0,10);
                        ctx.fill();
                        ctx.restore();
                    }
                }else{

                }
            }
        }
    }
    this._drawBottomBar=function(ctx,grid,bottomBar,radiusBar,dataVal,dataCountVal,width,height){
        //初始化线宽
        if(bottomBar.lineWidth>10){
            bottomBar.lineWidth=10;
        }else if(bottomBar.lineWidth<1){
            bottomBar.lineWidth=1;
        }
        if(radiusBar.lineWidth>10){
            radiusBar.lineWidth=10;
        }else if(radiusBar.lineWidth<1){
            radiusBar.lineWidth=1;
        }
        ctx.save();
        ctx.beginPath();
        var grids=["top",'left','right','bottom'];
        for(let i=0,count=grids.length;i<count;i++){
            grids[i]=grids[i].replace('"');
            if(typeof(grid[grids[i]])==="string"){
                if(grid[grids[i]].match("%")){
                    grid[grids[i]]=parseInt(grid[grids[i]].slice(0,-1));
                    if(typeof(grid[grids[i]])==="number"){
                        grid[grids[i]]=width*grid[grids[i]]/100;
                    }else{
                        grid[grids[i]]=10;
                    }
                }else{
                    grid[grids[i]]=10;
                }
            }
        }
        //绘制柱子
        ctx.rect(grid.left-15,(height-grid.top-grid.bottom)/2,width-grid.left-grid.right+30,bottomBar.lineWidth);
        ctx.fillStyle=bottomBar.color;
        ctx.fill();
        //绘制下面的圈圈
        var radiusCenter=(width-grid.left-grid.right)/2;
        var count=dataVal.length;
        if(dataVal.length>=7){
            count=6;
        }
        var lineGap=(radiusCenter-count*radiusBar.lineWidth)/count;
        // if(lineGap<20){
        //     var fontSize=12;
        // }else if(lineGap>70){
        //     var fontSize=24;
        // }else if(lineGap>=20){
        //     var fontSize=12;
        // }
        switch(count){
            case 1:
                lineGap=lineGap*0.4;
                break;
            case 2:
                lineGap=lineGap*0.8;
                break;
            case 3:
                lineGap=lineGap*0.8;
                break;
            // case 4:
            // case 5:
            // case 6:
        }
        var radiusCenterPie=lineGap/2;
        fontSize=radiusCenterPie*0.7;
        dataVal=sort(dataVal,dataCountVal);
        //计算第一个弧度的最终点，最后一个圆的起点
        var oneLeft=radiusCenter+grid.left + radiusCenter * Math.cos((180-Math.round(parseFloat(dataVal[0].value/dataCountVal[0])*100)*1.8) * Math.PI /180);
        var LastLeft=width/2-(radiusCenter-(count-1)*(lineGap+radiusBar.lineWidth));
        var LeftNum=parseInt(oneLeft-LastLeft);
        var index=0;
        this.count=count;
        for(let i=0;i<count;i++){
            let radius=parseFloat(dataVal[i].value/dataCountVal[i]);
            radius=Math.round(radius*100);
            ctx.save();
            ctx.beginPath();
            // this.n=Math.PI*(1-radius/100)+Math.PI*(1-radius/100)/10;
            // if(this.n>Math.PI){
            //     this.n-=Math.PI;
            // }
            this.arrayCircle[i]=Math.PI*(1-radius/100);
            ctx.arc(radiusCenter+grid.left,(height-grid.top-grid.bottom)/2+bottomBar.lineWidth,radiusCenter-i*(lineGap+radiusBar.lineWidth),this.arrayCircle1[i],-Math.PI,false);//Math.PI*(1-radius/100)
            if(index>=radiusBar.color.length){
                index=0;
            }
            ctx.strokeStyle=radiusBar.color[index];
            ctx.lineCap='round';
            ctx.lineWidth=radiusBar.lineWidth;
            ctx.stroke();
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle="rgba(255,255,255,.3)"
            ctx.arc(radiusCenter+grid.left,(height-grid.top-grid.bottom)/2+bottomBar.lineWidth,radiusCenter-i*(lineGap+radiusBar.lineWidth),0,Math.PI,false);//Math.PI*(1-radius/100)绘制整个半圆
            ctx.stroke();
            ctx.beginPath();
            ctx.restore();
            //var x1 = radiusCenter+grid.left + (radiusCenter-i*(lineGap+radiusBar.lineWidth)) * Math.cos((180-radius*1.8) * Math.PI / 180);
            //var y1 = (height-grid.top-grid.bottom)/2+bottomBar.lineWidth + (radiusCenter-i*(lineGap+radiusBar.lineWidth)) * Math.sin((180-radius*1.8) * Math.PI /180);
            //圆圈结束点坐标
            var x1 = width-(width-oneLeft)-lineGap*i*1.5;
            var y1=(height-grid.top-grid.bottom)/2+bottomBar.lineWidth+Math.sqrt(Math.pow((radiusCenter-i*(lineGap+radiusBar.lineWidth)),2)-Math.pow(Math.abs(((width-grid.left-grid.right)/2+grid.left-x1)),2));
            ctx.fillStyle=radiusBar.color[index];
            ctx.arc(x1,40+i*radiusCenterPie,radiusCenterPie,0,Math.PI*2);
            let arr={left:x1,top:40+i*radiusCenterPie,radius:radiusCenterPie}
            this.array[0]=arr;
            ctx.fill();
            ctx.fillStyle="#fff";
            ctx.font=fontSize+"px sans-serif";
            this.arrayText[i]=radius;
            ctx.fillText(this.arrayText1[i]+"%",x1-(ctx.measureText(this.arrayText1[i]+"%").width/2),46+i*radiusCenterPie);//获取字体宽度ctx.measureText(radius+"%")
            ctx.beginPath();
            ctx.moveTo(x1,40+radiusCenterPie+i*radiusCenterPie);
            ctx.lineTo(x1,y1);
            ctx.lineWidth=bottomBar.lineWidth/3;
            ctx.strokeStyle=bottomBar.color;
            ctx.stroke();
            ctx.restore();
            index++;
        }
        var drawController = window.requestAnimationFrame(this._draw.bind(this));
        for(let i=0,count=this.count;i<count;i++){
            if(this.arrayText1[i] <this.arrayText[i]) {
                this.arrayText1[i] += 1;
            //  console.log(this.n);
            }
            if(this.arrayCircle1[i] <this.arrayCircle[i]) {
                this.arrayCircle1[i] += this.arrayCircle[i]*0.01;
            //  console.log(this.n);
            }
            if(this.n==this.count){
                window.cancelAnimationFrame(drawController);
            }
        }
    }
    this._draw=function(){
        this.ctx.clearRect(0,0,this.width,this.height);
        this._drawTitle(this.ctx,defaultVal.title,this.width,this.height);
        this._drawLegend(this.ctx,defaultVal.legend,this.width,this.height);
        this._drawBottomBar(this.ctx,defaultVal.grid,defaultVal.bottomBar,defaultVal.radiusBar,defaultVal.dataVal,defaultVal.dataCountVal,this.width,this.height);
    }
    this._draw();
    function sort(arr,arr1){
        for(var j=0;j<arr.length-1;j++){
        //两两比较，如果前一个比后一个大，则交换位置。
            for(var i=0;i<arr.length-1-j;i++){
                    if(arr[i].value/arr1[i]<arr[i+1].value/arr1[i+1]){
                        var temp = arr[i];
                        arr[i] = arr[i+1];
                        arr[i+1] = temp;
                        var temp1 = arr1[i];
                        arr1[i] = arr1[i+1];
                        arr1[i+1] = temp1;
                    }
            } 
        }
        return arr;
    }
}