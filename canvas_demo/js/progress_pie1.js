function Progress_pie1(target,option){
    let defaultVal={
        backgroundColor:'#070826',
        tootip:{
            backgroundColor:'rgba(255,255,255,0.3)',
            color:'#fff',
            fontSize:14,
        },
        firstCircle:{
            color:'#6E7ED3',
            rangeWidth:5,
            isRotation:true,//最外层的圆是否转动效果
            lineWidth:1,//最大为10，最小为1
        },
        secondCircle:{
            color:'#1A1F47',
            lineWidth:10,
            rangeWidth:10,
            isShow:true,//小圆球是否闪动
            isRotation:true,//第二层圈的里层圈是否滚动
            insideStyle:{
                color:'#6E80D3',
                show:true,//加载进度是否出现循环加载效果
            }
        },
        thirdCircle:{
            radius:50,//最内层圆的半径
            lineWidth:3,
        },
        //控制圆心的位置
        grid:{
            top:100,
            left:'50%',
            right:10,
            bottom:10,
        },
        data:{
            itemStyle:{
                color:'#fff',
                fontSize:18,
            },
            value:7439,
        },
        dataCountVal:7400,
    }
    // for(var i in option){
    //     var news=option[i];
    //     var defaults=defaultVal[i];
    //     if(!Array.isArray(defaultVal[i])){
    //         if(typeof(news)==="object"){
    //             console.log(news);
    //             defaultVal[i]=Object.assign(defaults, news);
    //         }else{
    //             defaultVal[i]=news;
    //         }
    //     }else{
    //         defaultVal[i]=news;
    //     }
    // }
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
        target.appendChild(canvas);
        this.canvas=canvas;
        this.ctx=ctx;
        this.width=canvas.width;
        this.height=canvas.height;
        this.dataValue=0;
        this.progress=0,this.progress1=0,this.rotation=Math.PI/4;this.rotation1=Math.PI*2/5,this.show=false;
        var grids=["top",'left','right','bottom'];
        for(let i=0,count=grids.length;i<count;i++){
            if(typeof(defaultVal.grid[grids[i]])==="string"){
                if(defaultVal.grid[grids[i]].match("%")){
                    defaultVal.grid[grids[i]]=parseInt(defaultVal.grid[grids[i]].slice(0,-1));
                    if(typeof(defaultVal.grid[grids[i]])==="number"){
                        defaultVal.grid[grids[i]]=this.width*defaultVal.grid[grids[i]]/100;
                    }else{
                        defaultVal.grid[grids[i]]=10;
                    }
                }else{
                    defaultVal.grid[grids[i]]=10;
                }
            }
        }
        this.canvas.onmousemove=function(e){
           var e = event || window.event;
           var  m_clientX = e.clientX-this.canvas.offsetLeft;
           var  m_clientY = e.clientY+document.body.scrollTop-this.canvas.parentNode.offsetTop;
           if(m_clientX<=(this.width-defaultVal.grid.left-defaultVal.grid.right)/2+defaultVal.thirdCircle.radius&&m_clientX>=(this.width-defaultVal.grid.left-defaultVal.grid.right)/2-defaultVal.thirdCircle.radius){
                if(m_clientY<=(this.width-defaultVal.grid.top)/2+defaultVal.thirdCircle.radius&&m_clientY>=(this.width-defaultVal.grid.top)/2-defaultVal.thirdCircle.radius){
                    this.canvas.style.cursor="pointer"; 
                    if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                        return;
                    }else{
                        let div=document.createElement("div");
                        div.style.cssText="position:absolute;padding:10px;border-radius:5px;font-size:"+defaultVal.tootip.fontSize+"px;background:"+defaultVal.tootip.backgroundColor+";color:"+defaultVal.tootip.color+";top:"+m_clientY+";left:"+m_clientX;
                        div.innerHTML=`总值：${defaultVal.dataCountVal}<br>当前值：${defaultVal.data.value}<br>所占比例：${Math.round(defaultVal.data.value/defaultVal.dataCountVal*100)}%`;
                        this.canvas.parentNode.appendChild(div);
                        this.canvas.parentNode.style.position="relative";
                    }
                }else{
                    this.canvas.style.cursor="default";
                    if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                        this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                    }
                    //this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                }
           }else{
               this.canvas.style.cursor="default";
               if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                    this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                }
            }
        }.bind(this);
    }
    this.init();
    this._drawThird=function(ctx,backgroundColor,circle,thirdCircle,secondCircle,firstCircle,data,dataCountVal,width,height){
        if(thirdCircle.lineWidth<1){
            thirdCircle.lineWidth=1;
        }else if(thirdCircle.lineWidth>10){
            thirdCircle.lineWidth=10;
        }
        ctx.fillStyle=backgroundColor;
        ctx.fillRect(0,0,width,height);
        //绘制字体
        ctx.beginPath();
        ctx.fillStyle=data.itemStyle.color;
        ctx.font=data.itemStyle.fontSize+"px sans-serif";
        ctx.fillText(this.dataValue,circle.x-ctx.measureText(this.dataValue).width/2,circle.y+data.itemStyle.fontSize/2);
        //绘制内圈的底图
        ctx.beginPath();
        ctx.lineWidth=thirdCircle.lineWidth;
        ctx.strokeStyle=secondCircle.color;
        ctx.arc(circle.x,circle.y,thirdCircle.radius,0,Math.PI*2);
        ctx.stroke();
        //绘制进度
        ctx.beginPath();
        ctx.strokeStyle=secondCircle.insideStyle.color;
        let progressC=Math.round(data.value/dataCountVal*100)/100;
        ctx.arc(circle.x,circle.y,thirdCircle.radius,Math.PI/2,this.progress*Math.PI*2+Math.PI/2);
        ctx.stroke();
        //绘制第二层圈的有小圆的底图
        ctx.beginPath();
        ctx.strokeStyle=secondCircle.color;
        ctx.lineWidth=secondCircle.lineWidth;
        ctx.save();
        ctx.arc(circle.x,circle.y,thirdCircle.radius+thirdCircle.lineWidth+secondCircle.rangeWidth,-Math.PI/9,Math.PI*7/18);
        ctx.stroke();
        //绘制小球
        for(let i=0;i<4;i++){
            let x=(thirdCircle.radius+thirdCircle.lineWidth+secondCircle.rangeWidth)*Math.cos(55/3*i*Math.PI/180);
            let y=(thirdCircle.radius+thirdCircle.lineWidth+secondCircle.rangeWidth)*Math.sin(55/3*i*Math.PI/180);
            ctx.beginPath();
            if(secondCircle.isShow){
                ctx.fillStyle=`rgb(${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0})`;
            }else{
                ctx.fillStyle=secondCircle.insideStyle.color;
            }
            ctx.arc(circle.x+x,circle.y+y,secondCircle.lineWidth*9/20,0,Math.PI*2);
            ctx.fill();
        }
        ctx.beginPath();
        ctx.strokeStyle=backgroundColor;
        //ctx.arc(circle.x,circle.y,thirdCircle.radius+thirdCircle.lineWidth+secondCircle.rangeWidth,Math.PI*7/18,Math.PI*22/45);
        ctx.stroke();
        ctx.beginPath();
        //绘制闪动的圆圈的底图
        ctx.restore();
        ctx.arc(circle.x,circle.y,thirdCircle.radius+thirdCircle.lineWidth+secondCircle.rangeWidth,Math.PI*22/45,Math.PI*22/45+Math.PI*13/10);
        ctx.stroke();
        ctx.beginPath();
        //绘制闪动的圆圈
        ctx.strokeStyle=secondCircle.insideStyle.color;
        ctx.arc(circle.x,circle.y,thirdCircle.radius+thirdCircle.lineWidth+secondCircle.rangeWidth,this.rotation1+Math.PI*22/45,this.rotation1+Math.PI*22/45+Math.PI/2);
        ctx.stroke();
        ctx.beginPath();
        //绘制最外层的圆圈
        ctx.lineWidth=firstCircle.lineWidth;
        ctx.strokeStyle=firstCircle.color;
        ctx.arc(circle.x,circle.y,thirdCircle.radius+thirdCircle.lineWidth+secondCircle.rangeWidth+firstCircle.rangeWidth+secondCircle.lineWidth/2,Math.PI*22/45+Math.PI*13/10-Math.PI/2-this.rotation,Math.PI*22/45+Math.PI*13/10-this.rotation);
        ctx.stroke();
        var drawController = window.requestAnimationFrame(this._draw.bind(this));
        if(this.dataValue <data.value) {
            this.dataValue+=data.value/100;
            this.dataValue=Math.round(this.dataValue*100)/100;
        }else{
            this.dataValue=data.value;
        }
        if(this.progress<progressC){
            this.progress+=progressC/100;
        }else if(secondCircle.insideStyle.show){
            ctx.beginPath();
            ctx.lineWidth=secondCircle.lineWidth//thirdCircle.lineWidth;
            ctx.strokeStyle='rgba(255,255,255,.4)';
            ctx.arc(circle.x,circle.y,thirdCircle.radius,Math.PI/2,this.progress1*Math.PI*2+Math.PI/2);
            ctx.stroke();
            ctx.beginPath();
            ctx.strokeStyle="#fff";
            ctx.arc(circle.x,circle.y,thirdCircle.radius,this.progress1*Math.PI*2+Math.PI/2,this.progress1*Math.PI*2+Math.PI/2+Math.PI/100);
            ctx.stroke();
        }
        if(this.progress1<progressC){
            this.progress1+=progressC/100;
        }else if(this.progress1>=progressC){
            this.progress1=0;
        }
        if(firstCircle.isRotation){
            if(this.rotation<=Math.PI*2){
                this.rotation+=Math.PI/100;
            }else{
                this.rotation-Math.PI*2;
                this.rotation+=Math.PI/100;
            }
        }
        if(secondCircle.isRotation){
            if(this.show){
                this.rotation1-=Math.PI*4/5/100;
                if(this.rotation1<=0){
                    this.show=false;
                }
            }else{
                this.rotation1+=Math.PI*4/5/100;
                if(this.rotation1>=Math.PI*4/5){
                    this.show=true;
                } 
            }
        }
    }
    this._draw=function(){
        this.ctx.clearRect(0,0,this.width,this.height);
        var x=(this.width-defaultVal.grid.left-defaultVal.grid.right)/2,y=(this.width-defaultVal.grid.top)/2;
        let circle={x,y}
        this._drawThird(this.ctx,defaultVal.backgroundColor,circle,defaultVal.thirdCircle,defaultVal.secondCircle,defaultVal.firstCircle,defaultVal.data,defaultVal.dataCountVal,this.width,this.height);
    }
    this._draw();
}