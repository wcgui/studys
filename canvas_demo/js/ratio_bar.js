function Ratio_bar(target,option){
    let defaultVal={
        backgroundColor:'#02172C',//最大的背景色
        tooltip:{
            show:true,
            backgroundColor:'rgba(255,255,255,0.3',
            color:'#fff',
            fontSize:15,
        },
         //控制容器的大小
         grid:{
            top:'10%',
            left:'10%',
            right:'10%',
            bottom:'10%',
        },
        Color:['#2879DC'],
        series:{
            color:'#fff',//字体颜色
            fontSize:18,//字体大小
            data:[
                {
                    name:'价值',
                    value:4000, //当前值
                }
            ]
        },
        prevData:[
            {
                name:'单位',
                value:3000,
            }
        ],
        xAxis:{
            color:'#243447',
            lineWidth:1,
            data:['红红','小虎','小胡'],
            textStyle:{
                color:'#243447',
                fontSize:15,
                //距离刻度线得距离
                top:0,
                left:0,
            }
        }
    }
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
        let canvas = document.createElement("canvas");
        canvas.setAttribute("width",target.style.width);
        canvas.setAttribute("height",target.style.height);
        let ctx=canvas.getContext("2d");
        target.appendChild(canvas);
        this.canvas=canvas;
        this.ctx=ctx;
        this.width=canvas.width;
        this.height=canvas.height;
        //初始化grid的值
        let grids=["top","left","right","bottom"];
        for(let i=0,count=grids.length;i<count;i++){
            if(typeof(defaultVal.grid[grids[i]])==="string"){
                if(defaultVal.grid[grids[i]].match("%")){
                    defaultVal.grid[grids[i]]=parseInt(defaultVal.grid[grids[i]].slice(0,-1));
                    if(typeof(defaultVal.grid[grids[i]]==="number")){
                        defaultVal.grid[grids[i]]=this.width*defaultVal.grid[grids[i]]/100;
                    }else{
                        defaultVal.grid[grids[i]]=10;
                    }
                }else{
                    defaultVal.grid[grids[i]]=10;
                }
            }
        }
        // 初始化data的值
        if(defaultVal.series.data.length>5){
            defaultVal.series.data.length=5;
        }
        //选取两组值的最大值来等于规定容器的最高度
        var max1=defaultVal.series.data[0].value;
        var max2=defaultVal.prevData[0].value;
        this.prevData=new Array();//存放上阶段的值
        this.updown=new Array();
        this.updown1=new Array();//存放下降柱子的高度
        this.uptext=new Array();
        this.text=new Array();//存放字体坐标
        this.circle=new Array();//存放柱子的坐标
        this.prevData[0]=0,this.updown[0]=0,this.updown1[0]=0,this.uptext[0]=0,this.text[0]=0,this.circle[0]={};
        for(let i=1,count=defaultVal.series.data.length;i<count;i++){
            this.prevData.push(0);
            this.updown.push(0);
            this.updown1.push(0);
            this.uptext.push(0);
            this.text.push(0);
            this.circle.push({});
            if(max1<defaultVal.series.data[i].value){
                max1=defaultVal.series.data[i].value;
            }
            if(max2<defaultVal.prevData[i].value){
                max2=defaultVal.prevData[i].value;
            }
        }
        if(max1<max2){
            this.max=max2;
        }else{
            this.max=max1;
        }
        if(defaultVal.tooltip.show){
            this.canvas.onmousemove=function(e){
            var e = event || window.event;
            var  m_clientX = e.clientX-this.canvas.offsetLeft;
            var  m_clientY = e.clientY+document.body.scrollTop-this.canvas.parentNode.offsetTop;
            //    switch(true){
            //        case m_clientX>=this.circle[0].x1&&m_clientX<=this.circle[0].x2:
            //        case m_clientY>=this.circle[0].y1&&m_clientY<=this.circle[0].y2:
            //             this.canvas.style.cursor="pointer"; 
            //             if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
            //                 return;
            //             }else{
            //                 let div=document.createElement("div");
            //                 div.style.cssText="position:absolute;padding:10px;border-radius:5px;font-size:"+defaultVal.tooltip.fontSize+"px;color:"+defaultVal.tooltip.color+";top:"+m_clientY+";left:"+m_clientX+";background:"+defaultVal.tooltip.backgroundColor;
            //                 div.innerHTML=`${defaultVal.min.name}：${defaultVal.min.value}<br>当前值：${defaultVal.data.value}<br>${defaultVal.max.name}：${defaultVal.max.value}<br>所占比例：${Math.round(defaultVal.data.value/defaultVal.max.value*100)}%`;
            //                 this.canvas.parentNode.appendChild(div);
            //                 this.canvas.parentNode.style.position="relative";
            //             }
            //             break;
            //         default:
            //    }
            let xy=new Array();
            for(let i=0,count=defaultVal.series.data.length;i<count;i++){
                xy[i]=m_clientX>=this.circle[i].x1&&m_clientX<=this.circle[i].x2&&m_clientY>=this.circle[i].y1&&m_clientY<=this.circle[i].y2;
            }
            switch(defaultVal.series.data.length){
                case 1:
                    if(xy[0]){
                        let i=0;
                        this.append(this.canvas,defaultVal,i,m_clientX,m_clientY);
                    }else{
                        this.canvas.style.cursor="default";
                        if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                                this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                        }
                    }
                    break;
                case 2:
                    if(xy[0]||xy[1]){
                        let i=0;
                        if(xy[1]){
                            i=1;
                        }
                        this.append(this.canvas,defaultVal,i,m_clientX,m_clientY);
                    }else{
                        this.canvas.style.cursor="default";
                        if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                                this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                        }
                    }
                    break;
                case 3:
                    if(xy[0]||xy[1]||xy[2]){
                        let i=0;
                        if(xy[1]){
                            i=1;
                        }else if(xy[2]){
                            i=2;
                        }
                        this.append(this.canvas,defaultVal,i,m_clientX,m_clientY);
                    }else{
                        this.canvas.style.cursor="default";
                        if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                                this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                        }
                    }
                    break;
                case 4:
                    if(xy[0]||xy[1]||xy[2]||xy[3]){
                        let i=0;
                        if(xy[1]){
                            i=1;
                        }else if(xy[2]){
                            i=2;
                        }else if(xy[3]){
                            i=3;
                        }                    
                        this.append(this.canvas,defaultVal,i,m_clientX,m_clientY);
                    }else{
                        this.canvas.style.cursor="default";
                        if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                                this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                        }
                    }
                    break;
                case 5:
                    if(xy[0]||xy[1]||xy[2]||xy[3]||xy[4]){
                        let i=0;
                        if(xy[1]){
                            i=1;
                        }else if(xy[2]){
                            i=2;
                        }else if(xy[3]){
                            i=3;
                        }else if(xy[4]){
                            i=4;
                        }
                        this.append(this.canvas,defaultVal,i,m_clientX,m_clientY);
                    }else{
                        this.canvas.style.cursor="default";
                        if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                                this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                        }
                    }
                    break;
            }
            
            }.bind(this);
        }
    }
    this.init();
    this._drawBar=function(ctx,series,prevData,width,height,bar,xAxis,backgroundColor,Color){
        ctx.strokeStyle=xAxis.color;
        ctx.lineWidth=xAxis.lineWidth;
        ctx.moveTo(bar.x,height);
        ctx.lineTo(bar.x+width,height);
        ctx.stroke();
        ctx.font="16px sans-serif";
        let fontWidth=ctx.measureText("80%").width*2;
        let lwidth=width-fontWidth;
        let lheight=height-xAxis.lineWidth;
        let lineWidth=lwidth/(series.data.length+(series.data.length-1)*2);
        ctx.beginPath();
        ctx.fillStyle=xAxis.textStyle.color;
        ctx.font=xAxis.textStyle.fontSize+"px sans-serif";
        for(let i=0,count=series.data.length;i<count;i++){
            ctx.save();
            //绘制横坐标轴的数字
            ctx.fillText(xAxis.data[i],bar.x+fontWidth/2-ctx.measureText(xAxis.data[i]).width/2+xAxis.textStyle.left+lineWidth/2+i*3*lineWidth,height+xAxis.textStyle.fontSize+xAxis.textStyle.top);
            ctx.beginPath();
            ctx.setLineDash([4,1]);
            ctx.lineWidth=lineWidth;
            //给原有的柱子设置颜色
            let barColor= ctx.createLinearGradient(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,height,bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,lheight-lheight*(prevData[i].value/this.max)*0.8); //从上到下
            if(Color.length>3){
                Color.length=3;
            }
            if(Color.length==1){
                Color.push(Color[0].colorRgb(0.6));
                Color.push(Color[0].colorRgb(1));
                Color[0]=Color[0].colorRgb(0);
            }else if(Color.length==2){
                Color.push("#15C8D3")
            }
            barColor.addColorStop(0,Color[0]);
            barColor.addColorStop(0.5,Color[1]);
            barColor.addColorStop(1,Color[2]);   
            ctx.strokeStyle=barColor;//柱子的颜色
            ctx.moveTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,lheight);
            let textHeight=0;
            let text=null,upword=null,updownHeight=null,
            uptext=Math.abs((series.data[i].value-prevData[i].value))/prevData[i].value;
            uptext=Math.round(uptext*100)/100;//增长的比例或下降的比例
            //绘制原有值得柱子
            let barHeight=lheight-this.prevData[i];//原有的柱子高度
            //this.prevData[i];控制原有柱子的高度慢慢增加
            ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,barHeight);
            ctx.stroke();
            if(series.data[i].value>prevData[i].value){
                textHeight=lheight-lheight*(series.data[i].value/this.max)*0.8;//现有值得柱子的高度
                updownHeight=textHeight-barHeight;
                this.updown1[i]=updownHeight;
                text=series.data[i].value;
                upword="up";
            }else if(series.data[i].value<prevData[i].value){
                textHeight=lheight-lheight*(prevData[i].value/this.max)*0.8;
                barHeight=lheight-lheight*(series.data[i].value/this.max)*0.8;
                updownHeight=textHeight-barHeight;
                this.updown1[i]=updownHeight;
                text=prevData[i].value;
                upword="down";
            }else{
                textHeight=lheight-lheight*(prevData[i].value/this.max)*0.8;
                updownHeight=textHeight-barHeight;
                this.updown1[i]=updownHeight;
                text=prevData[i].value;//柱子上的值
            }
            //绘制柱子上的字体
            ctx.beginPath();
            ctx.font=series.fontSize+"px sans-serif";
            ctx.fillStyle=series.color;
            let progress=lheight-this.prevData[i];
            if(upword=="up"){
                progress=lheight-this.prevData[i]+this.updown[i];//控制刻度及单位的位置
            }
            this.circle[i].x1=bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth;
            this.circle[i].x2=bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth;
            this.circle[i].y1=progress;
            this.circle[i].y2=lheight;
            ctx.fillText(this.text[i],bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth-ctx.measureText(text).width/2-10,progress-5);
            ctx.font=series.fontSize*2/3+"px sans-serif";
            ctx.fillText(prevData[i].name,bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2,progress-5);
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.lineWidth=1;
            ctx.strokeStyle=series.color;
            ctx.moveTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2,progress);
            ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+30,progress);
            ctx.stroke();
            if(this.prevData[i]<lheight*(prevData[i].value/this.max)*0.8){
                this.prevData[i]+=lheight*(prevData[i].value/this.max)*8/1000;
            }else{
                ctx.beginPath();
                if(upword=="up"){
                    //绘制前面箭头的
                    ctx.moveTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15,textHeight+2+(lheight-barHeight)*(uptext-this.uptext[i]));
                    ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3),textHeight+2+15*Math.sin(Math.PI/3)+(lheight-barHeight)*(uptext-this.uptext[i]));
                    ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+15,textHeight+2+15*Math.sin(Math.PI/3)+(lheight-barHeight)*(uptext-this.uptext[i]));
                    //绘制后面的长方形的
                    ctx.rect(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+2,textHeight+2+15*Math.sin(Math.PI/3)+(lheight-barHeight)*(uptext-this.uptext[i]),11,(lheight-barHeight)*this.uptext[i]);
                    //添加渐变色的
                    let grd = ctx.createLinearGradient(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+2,textHeight+2+15*Math.sin(Math.PI/3)+(lheight-barHeight)*uptext,bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+2,textHeight+2+15*Math.sin(Math.PI/3)); //从上到下
                    grd.addColorStop(0,backgroundColor); //起始颜色
                    grd.addColorStop(0.05,' #18182A');
                    grd.addColorStop(0.1,'#231829');
                    grd.addColorStop(1,"red"); //终点颜色
                    ctx.fillStyle = grd;
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle="red";
                    ctx.font=series.fontSize+"px sans-serif";
                    ctx.fillText(Math.round(this.uptext[i]*100)+"%",bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+10-15*Math.cos(Math.PI/3)+2,textHeight+2+15*Math.sin(Math.PI/3)+(lheight-barHeight)*uptext+series.fontSize);
                    ctx.beginPath();
                    //上升的柱子渐变色
                    let grd1=ctx.createLinearGradient(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,barHeight,bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,textHeight);
                    grd1.addColorStop(0,Color[2]);
                    grd1.addColorStop(0.5,'#A7D274');
                    grd1.addColorStop(1,'#CAE365');
                    ctx.strokeStyle=grd1;
                    ctx.setLineDash([4,1]);
                    ctx.lineWidth=lineWidth;
                    ctx.moveTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,barHeight);
                    ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,barHeight+this.updown[i]);
                    ctx.stroke();
                }else if(upword=="down"){
                     //绘制前面箭头的
                     ctx.moveTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15,textHeight+2-this.updown[i]);
                     ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3),textHeight+2-15*Math.sin(Math.PI/3)-this.updown[i]);
                     ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+15,textHeight+2-15*Math.sin(Math.PI/3)-this.updown[i]);
                     //绘制后面的长方形的
                     ctx.rect(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+2,textHeight+2,11,2-this.updown[i]-15*Math.sin(Math.PI/3));
                     //添加渐变色的
                     let grd = ctx.createLinearGradient(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+2,textHeight+2,bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+15-15*Math.cos(Math.PI/3)+2,textHeight+2-this.updown[i]-15*Math.sin(Math.PI/3)); //从下到上
                     grd.addColorStop(0,backgroundColor); //起始颜色
                     grd.addColorStop(0.05,'#071D2D');
                     grd.addColorStop(0.1,'#07252D');
                     grd.addColorStop(1,"green"); //终点颜色
                     ctx.fillStyle = grd;
                     ctx.fill();
                     ctx.beginPath();
                     ctx.fillStyle="green";
                     ctx.font=series.fontSize+"px sans-serif";
                     ctx.fillText(Math.round(this.uptext[i]*100)+"%",bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth+lineWidth/2+10-15*Math.cos(Math.PI/3)+2,textHeight+4-this.updown[i]+series.fontSize);
                     ctx.beginPath();
                     //下降的柱子
                     ctx.strokeStyle='#122C4C';
                     ctx.setLineDash([4,1]);
                     ctx.lineWidth=lineWidth;
                     ctx.moveTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,textHeight);
                     ctx.lineTo(bar.x+fontWidth/2+lineWidth/2+i*3*lineWidth,textHeight-this.updown[i]);
                     ctx.stroke();
                }
                if(this.updown[i]> this.updown1[i]){
                    this.updown[i]+=this.updown1[i]/1000;
                }
                if(this.uptext[i]<uptext){
                    this.uptext[i]+=uptext/1000;
                }
            }
            if(this.text[i]<text){
                this.text[i]+=text/100;
            }
            ctx.restore();
        }
        this.drawController = window.requestAnimationFrame(this.draw.bind(this));
        if(this.updown[0]<= this.updown1[0]){
          //window.cancelAnimationFrame(this.drawController);
        }
    }
    this.draw=function(){
        this.ctx.clearRect(0,0,this.width,this.height);//清空画布
        this.ctx.fillStyle=defaultVal.backgroundColor;
        this.ctx.fillRect(0,0,this.width,this.height);
        this.ctx.fill();
        let width=this.width-defaultVal.grid.left-defaultVal.grid.right;
        let height=this.height-defaultVal.grid.top-defaultVal.grid.bottom;
        let x=(this.width-width)/2;
        let y=(this.height-height)/2;
        let bar={x,y};
        this._drawBar(this.ctx,defaultVal.series,defaultVal.prevData,width,height,bar,defaultVal.xAxis,defaultVal.backgroundColor,defaultVal.Color);
    }
    this.draw();
    this.append=function(canvas,defaultVal,i,m_clientX,m_clientY){
        if(defaultVal.tooltip.show){
            canvas.style.cursor="pointer"; 
            if(canvas.parentNode.lastChild.nodeName=="DIV"){
                return;
            }else{
                let div=document.createElement("div");
                div.style.cssText="position:absolute;padding:10px;border-radius:5px;font-size:"+defaultVal.tooltip.fontSize+"px;color:"+defaultVal.tooltip.color+";top:"+m_clientY+";left:"+m_clientX+";background:"+defaultVal.tooltip.backgroundColor;
                div.innerHTML=`当前${defaultVal.series.data[i].name}：${defaultVal.series.data[i].value}<br>上阶段${defaultVal.series.data[i].name}：${defaultVal.prevData[i].value}<br>${defaultVal.prevData[i].value<defaultVal.series.data[i].value?"上升:"+Math.round((defaultVal.series.data[i].value-defaultVal.prevData[i].value)/defaultVal.prevData[i].value*100)+"%":defaultVal.prevData[i].value>defaultVal.series.data[i].value?"下降:"+Math.round((defaultVal.prevData[i].value-defaultVal.series.data[i].value)/defaultVal.prevData[i].value*100)+"%":""}`;
                canvas.parentNode.appendChild(div);
                canvas.parentNode.style.position="relative";
            }
        }
    }
}