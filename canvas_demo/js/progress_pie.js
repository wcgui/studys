function Progress_pie(target,option){
    let defaultVal={
        backgroundColor:'#000',
        dataVal:{
            show:true,//控制进度的那个白虚线加载
            name:'王长贵',
            value:10000,
            color:'#fff',
            fontSize:18,
        },
        dataCountVal:10000,
        progressWidth:10,//最小为1，最大为10
        runShow:{
            lineWidth:2,//最小为3，最大为10,
            color:'#023C7A',
            radius:70,//外圈圆半径
            rangeWidth:10,
            isShow:true,
            showTop:{
                color:'#0DCEDE',
            }
        },
        //控制圆心的位置
        grid:{
            top:100,
            left:'50%',
            right:10,
            bottom:10,
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
        let canvas=document.createElement("canvas");
        canvas.setAttribute("width",target.style.width);
        canvas.setAttribute("height",target.style.height);
        let ctx=canvas.getContext("2d");
        target.appendChild(canvas);
        this.canvas=canvas;
        this.ctx=ctx;
        this.width=canvas.width;
        this.height=canvas.height;
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
    }
    this._draw=function(){
        var x=(this.width-defaultVal.grid.left-defaultVal.grid.right)/2,y=(this.width-defaultVal.grid.top)/2;
        var circleCenter={x,y};
        this._drawOutCircle(this.ctx,defaultVal.runShow.radius,circleCenter,defaultVal.runShow,defaultVal.backgroundColor);
        this._drawProgress(this.ctx,defaultVal.runShow.radius-defaultVal.runShow.rangeWidth,circleCenter,defaultVal.runShow,defaultVal.backgroundColor,defaultVal.progressWidth,defaultVal.dataVal,defaultVal.dataCountVal);
    }
    this.n=0,this.progress=0,this.timer=0,this.progressNum=0;
    this._drawOutCircle=function(ctx,radius,circle,runShow,backgroundColor){
       // ctx.clearRect(0,0,this.width,this.height);//清空画布
       if(runShow.lineWidth<1){
           runShow.lineWidth=3;
       }else if(runShow.lineWidth>10){
           runShow.lineWidth=10;
       }
        ctx.beginPath();
        ctx.lineWidth=runShow.lineWidth;
        ctx.fillStyle=defaultVal.backgroundColor;
        ctx.fillRect(0,0,this.width,this.height)
        ctx.strokeStyle=runShow.color;
        ctx.arc(circle.x,circle.y,radius,0,Math.PI*2)
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle=runShow.showTop.color;
        ctx.arc(circle.x,circle.y,radius,this.n-Math.PI/6,-Math.PI/15+this.n);
        ctx.save();
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth=runShow.lineWidth+1;
        ctx.strokeStyle=backgroundColor;
        ctx.arc(circle.x,circle.y,radius,this.n-Math.PI/15,Math.PI/15+this.n);
        ctx.stroke();
        ctx.beginPath();
        ctx.restore();
        ctx.arc(circle.x,circle.y,radius,this.n+Math.PI/15,Math.PI/6+this.n);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(circle.x,circle.y,radius,this.n+Math.PI*5/6,Math.PI*56/60+this.n);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth=runShow.lineWidth+1;
        ctx.strokeStyle=backgroundColor;
        ctx.arc(circle.x,circle.y,radius,this.n+Math.PI*56/60,Math.PI*31/30+this.n);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth=runShow.lineWidth;
        ctx.strokeStyle=runShow.showTop.color
        ctx.arc(circle.x,circle.y,radius,this.n+Math.PI*31/30,Math.PI*34/30+this.n);
        ctx.stroke();
        ctx.save();
        var drawController = window.requestAnimationFrame(this._draw.bind(this));
        if(runShow.isShow){
            if(this.n <=Math.PI*2) {
                this.n = this.n + Math.PI/100;//100外圈圆转的速度
            //  console.log(this.n);
            }else {
                this.n=0;
            }
        }
    }
    this._drawProgress=function(ctx,radius,circle,runShow,backgroundColor,progressWidth,dataVal,dataCountVal){
        ctx.beginPath();
        ctx.lineWidth=progressWidth;
        ctx.strokeStyle=runShow.color;
        ctx.arc(circle.x,circle.y,radius,0,Math.PI*2);
        ctx.stroke();
        ctx.fillStyle=dataVal.color;
        var prog=dataVal.value/dataCountVal;
        ctx.font=dataVal.fontSize+"px sans-serif";
        ctx.fillText(parseInt(this.progressNum*100)+"%",circle.x-ctx.measureText(parseInt(this.progressNum*100)+"%").width/2,circle.y+dataVal.fontSize/2);
        ctx.beginPath();
        ctx.lineWidth=progressWidth;
        ctx.strokeStyle=runShow.showTop.color;
        ctx.arc(circle.x,circle.y,radius,-Math.PI/2,this.progress-Math.PI/2,false);
        ctx.stroke();
    //     var linearGrad=ctx.createLinearGradient(0,0,this.width,0);
    //     linearGrad.addColorStop(0.0,backgroundColor);
    //     linearGrad.addColorStop(0.0,runShow.color);
    //     linearGrad.addColorStop(1.0,runShow.showTop.color);
    //     ctx.strokeStyle=linearGrad;
    //     ctx.arc(circle.x,circle.y,radius,0,Math.PI*2);
       //ctx.strokeRect(0,0,this.width,this.height);
        if(this.progress <=dataVal.value/dataCountVal*Math.PI*2) {
            this.progress  += dataVal.value/dataCountVal*Math.PI*2/100;
        }
        //是否加载进度条的循环效果
        if(dataVal.show){
            if(dataVal.value/dataCountVal>0.1){
                if(this.progress>=dataVal.value/dataCountVal*Math.PI*2){
                    ctx.beginPath();
                    ctx.strokeStyle='rgba(255,255,255,.4)';
                    ctx.arc(circle.x,circle.y,radius,-Math.PI/2,this.timer-Math.PI/2,false);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.strokeStyle="#fff";
                    ctx.arc(circle.x,circle.y,radius,this.timer-Math.PI/2,this.timer-Math.PI/2+Math.PI/100,false);
                    ctx.stroke();
                }
            }
        }
        if(this.timer<=dataVal.value/dataCountVal*Math.PI*2){
            this.timer  += dataVal.value/dataCountVal*Math.PI*2/100;
            if(this.timer>dataVal.value/dataCountVal*Math.PI*2){
                this.timer=0;
            }
        }
        if(this.progressNum<Math.round(prog*100)/100){
            this.progressNum+=Math.round(prog*100)/100*0.01;
        }
        
    }
    this.init();
    this._draw();
}