function Progress_pieRatio(target,option){
    let defaultVal={
        backgroundColor:'#02172C',//最大整体的样式
        //鼠标放上去显示信息的样式
        tooltip:{
            backgroundColor:'rgba(255,255,255,0.3',
            color:'#fff',
            fontSize:15,
        },
        //控制圆心的位置
        grid:{
            top:'50%',
            left:'50%',
            right:'50%',
            bottom:'50%',
        },
        min:{
            name:'最小值',
            value:9000,//最小值
        },
        max:{
            name:'最大值',
            value:18000,//最大值
        },
        data:{
            name:'时间',
            value:4000, //当前值
            color:'#fff',//字体颜色
            fontSize:18,//字体大小
        },
        firstCircle:{
            radius:40,//半径大小
            borderColor:'#115AA7',
            lineWidth:4,
        },
        progressCircle:{
            color:'#0E3D75',
            lineWidth:4,
        },
        isLoopPlay:true,//是否循环播放跑马灯特效
        isLoopOpen:true,//最大的一个圆圈是否循环加载
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
        this.progress=0,this.progressStart=0,this.progressEnd=0,this.isOk=true,this.n=0;
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
        this.canvas.onmousemove=function(e){
            var e = event || window.event;
           var  m_clientX = e.clientX-this.canvas.offsetLeft;
           var  m_clientY = e.clientY+document.body.scrollTop-this.canvas.parentNode.offsetTop;
           if(m_clientX<=((this.width-defaultVal.grid.left-defaultVal.grid.right)/2)+defaultVal.grid.left+defaultVal.firstCircle.radius&&m_clientX>=((this.width-defaultVal.grid.left-defaultVal.grid.right)/2)+defaultVal.grid.left-defaultVal.firstCircle.radius){
                if(m_clientY<=(this.width-defaultVal.grid.top)/2+defaultVal.firstCircle.radius&&m_clientY>=(this.width-defaultVal.grid.top)/2-defaultVal.firstCircle.radius){
                    this.canvas.style.cursor="pointer"; 
                    if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                        return;
                    }else{
                        let div=document.createElement("div");
                        div.style.cssText="position:absolute;padding:10px;border-radius:5px;font-size:"+defaultVal.tooltip.fontSize+"px;color:"+defaultVal.tooltip.color+";top:"+m_clientY+";left:"+m_clientX+";background:"+defaultVal.tooltip.backgroundColor;
                        div.innerHTML=`${defaultVal.min.name}：${defaultVal.min.value}<br>当前值：${defaultVal.data.value}<br>${defaultVal.max.name}：${defaultVal.max.value}<br>所占比例：${Math.round(defaultVal.data.value/defaultVal.max.value*100)}%`;
                        this.canvas.parentNode.appendChild(div);
                        this.canvas.parentNode.style.position="relative";
                    }
                }else{
                    this.canvas.style.cursor="default";
                    if(this.canvas.parentNode.lastChild.nodeName=="DIV"){
                        this.canvas.parentNode.removeChild(this.canvas.parentNode.lastChild)
                    }
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
    this._drawCircle=function(ctx,backgroundColor,circle,min,max,data,firstCircle,progressCircle,isLoopPlay,isLoopOpen,width,height){
        //进度条的宽度
        if(progressCircle.lineWidth>10){
            progressCircle.lineWidth=10;
        }else if(progressCircle.lineWidth<0){
            progressCircle.lineWidth=3;
        }
        //第一根线条的宽度
        if(firstCircle.lineWidth>=15){
            firstCircle.lineWidth=15;
        }else if(firstCircle.lineWidth<4){
            firstCircle.lineWidth=3;
        }
        //绘制最大的背景色
        ctx.fillStyle=backgroundColor;
        ctx.fillRect(0,0,width,height);

        //绘制最里层的圆第一根线
        ctx.beginPath();
        ctx.lineWidth=firstCircle.lineWidth;
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.8);
        ctx.arc(circle.x,circle.y,firstCircle.radius,Math.PI*5/6,Math.PI*13/6);
        ctx.stroke();
        //绘制第二层细线
        ctx.beginPath();
        ctx.lineWidth=firstCircle.lineWidth/2;
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.4);
        ctx.save();
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*7/3,Math.PI*5/6,Math.PI*13/6);
        ctx.stroke();
        //绘制第三层比较粗的线
        ctx.beginPath();
        ctx.lineWidth=firstCircle.lineWidth*3;
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.6);
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*13/3,Math.PI*5/6,Math.PI*13/6);
        ctx.stroke();
        //绘制进度
        ctx.beginPath();
        ctx.lineWidth=firstCircle.lineWidth;
        ctx.strokeStyle=progressCircle.color.colorRgb(.3);
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*10/3,Math.PI*5/6,Math.PI*5/6+this.n);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineWidth=firstCircle.lineWidth*4;
        ctx.strokeStyle=progressCircle.color.colorRgb(.3);
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*10/3,Math.PI*5/6+this.n,Math.PI*5/6+this.n+Math.PI/100);
        ctx.stroke();
        //绘制第三层比较细的线
        ctx.beginPath();
        ctx.restore();
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*19/3,Math.PI*5/6,Math.PI*13/6);
        ctx.stroke();
        //绘制里层的小圆球
        for(let i=0;i<51;i++){
            ctx.beginPath();
            let x=(firstCircle.radius+firstCircle.lineWidth*24/3)*Math.cos((24/5)*i*Math.PI/180+Math.PI*5/6);
            let y=(firstCircle.radius+firstCircle.lineWidth*24/3)*Math.sin((24/5)*i*Math.PI/180+Math.PI*5/6);
            if(this.progress<Math.round(data.value/max.value*100)){
                ctx.fillStyle=`rgb(${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0})`;
            }else if(isLoopPlay){
                if(!this.isOk){
                    ctx.fillStyle=`rgb(${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0})`;
                }else{
                    ctx.fillStyle=firstCircle.borderColor.colorRgb(.6);
                }
            }else{
                ctx.fillStyle=firstCircle.borderColor.colorRgb(.6);
            }
            ctx.arc(circle.x+x,circle.y+y,firstCircle.lineWidth/3,0,Math.PI*2);
            ctx.fill();
        }
        //绘制两层圆球之间的粗线
        ctx.beginPath();
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.8);
        ctx.lineWidth=firstCircle.lineWidth*6;
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*38/3,Math.PI*5/6,Math.PI*13/6);
        ctx.stroke();
        //绘制外层小圆球
        for(let i=0;i<51;i++){
            ctx.beginPath();
            let x=(firstCircle.radius+firstCircle.lineWidth*49/3)*Math.cos((24/5)*i*Math.PI/180+Math.PI*5/6);
            let y=(firstCircle.radius+firstCircle.lineWidth*49/3)*Math.sin((24/5)*i*Math.PI/180+Math.PI*5/6);
            if(this.progress<Math.round(data.value/max.value*100)){
                ctx.fillStyle=`rgb(${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0})`;
            }else if(isLoopPlay){
                if(this.isOk){
                    ctx.fillStyle=`rgb(${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0},${Math.random()*(255-0+1)+0})`;
                }else{
                    ctx.fillStyle=firstCircle.borderColor.colorRgb(.8);
                }
            }else{
                ctx.fillStyle=firstCircle.borderColor.colorRgb(.8);
            }
            ctx.arc(circle.x+x,circle.y+y,firstCircle.lineWidth/3,0,Math.PI*2);
            ctx.fill();
        }
        //绘制最外面的圈的底线
        ctx.beginPath();
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.8);
        ctx.lineWidth=firstCircle.lineWidth;
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*54/3,Math.PI*5/6,Math.PI*13/6);
        ctx.stroke();
        //绘制在外面圈里的一根线
        ctx.beginPath();
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.3);
        ctx.lineWidth=firstCircle.lineWidth/3;
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*62/3,Math.PI*5/6,Math.PI*13/6);
        ctx.stroke();
        //绘制最外面的圈
        ctx.beginPath();
        ctx.setLineDash([3,4]);
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.3);
        ctx.lineWidth=firstCircle.lineWidth*6;
        ctx.arc(circle.x,circle.y,firstCircle.radius+firstCircle.lineWidth*62/3,Math.PI*5/6+this.progressStart,Math.PI*5/6+this.progressEnd);
        ctx.stroke();
        //绘制两边的线条
        ctx.beginPath();
        ctx.setLineDash([]);
        ctx.strokeStyle=firstCircle.borderColor.colorRgb(.3);
        ctx.lineWidth=2;
        ctx.moveTo(circle.x+(firstCircle.radius+firstCircle.lineWidth/2)*Math.cos(Math.PI/6),circle.y+(firstCircle.radius+firstCircle.lineWidth/2)*Math.sin(Math.PI/6));
        ctx.lineTo(circle.x+(firstCircle.radius+firstCircle.lineWidth*62/3)*Math.cos(Math.PI/6),circle.y+(firstCircle.radius+firstCircle.lineWidth*62/3)*Math.sin(Math.PI/6));
        ctx.moveTo(circle.x+(firstCircle.radius+firstCircle.lineWidth/2)*Math.cos(Math.PI*5/6),circle.y+(firstCircle.radius+firstCircle.lineWidth/2)*Math.sin(Math.PI*5/6));
        ctx.lineTo(circle.x+(firstCircle.radius+firstCircle.lineWidth*62/3)*Math.cos(Math.PI*5/6),circle.y+(firstCircle.radius+firstCircle.lineWidth*62/3)*Math.sin(Math.PI*5/6));
        ctx.stroke();
        //绘制文字
        ctx.beginPath();
        ctx.fillStyle=data.color;
        ctx.font=data.fontSize+"px sans-serif";
        ctx.fillText(this.progress+"%",circle.x-ctx.measureText(this.progress+"%").width/2,circle.y);
        ctx.fillText(max.name,circle.x+firstCircle.radius+firstCircle.lineWidth*10/3-ctx.measureText(max.name).width/2,circle.y+firstCircle.radius+firstCircle.lineWidth*15/3);
        ctx.fillText(min.name,circle.x-firstCircle.lineWidth*10/3-firstCircle.radius-ctx.measureText(max.name).width/2,circle.y+firstCircle.radius+firstCircle.lineWidth*15/3);
        ctx.fill();
        ctx.font=data.fontSize*2/3+"px sans-serif";
        ctx.fillText("利用率",circle.x-ctx.measureText("利用率").width/2,circle.y+data.fontSize);
        ctx.fillText(max.value,circle.x+firstCircle.radius+firstCircle.lineWidth*10/3-ctx.measureText(max.value).width/2,circle.y+firstCircle.radius+firstCircle.lineWidth*15/3+data.fontSize);
        ctx.fillText(min.value,circle.x-firstCircle.lineWidth*10/3-firstCircle.radius-ctx.measureText(max.value).width/2,circle.y+firstCircle.radius+firstCircle.lineWidth*15/3+data.fontSize);
        ctx.fill();
        var drawController = window.requestAnimationFrame(this._draw.bind(this));
        if(this.progress<Math.round(data.value/max.value*100)){
            this.progress++;
        }
        if(this.n<(Math.PI*4/3)*data.value/max.value){
            this.n+=(Math.PI*4/3)*(data.value/max.value)/100;
        }else if(!isLoopPlay&&!isLoopOpen){
            window.cancelAnimationFrame(drawController);
        }
        if(this.isOk){
            if(this.progressEnd<(Math.PI*4/3)){
                this.progressEnd+=(Math.PI*4/3)/100;
            }else if(this.progressStart<(Math.PI*4/3)){
                this.progressStart+=(Math.PI*4/3)/100;
            }else{
                this.isOk=false;
            }
        }else{
            if(this.progressStart>0){
                this.progressStart-=(Math.PI*4/3)/100;
            }else if(isLoopOpen)
            if(this.progressEnd>0){
                this.progressEnd-=(Math.PI*4/3)/100;
            }else{
                this.isOk=true;
            }
        }
    }
    this._draw=function(){
        this.ctx.clearRect(0,0,this.width,this.height);//清空画布
        var x=((this.width-defaultVal.grid.left-defaultVal.grid.right)/2)+defaultVal.grid.left,y=(this.width-defaultVal.grid.top)/2;
        let circle={x,y}
        this._drawCircle(this.ctx,defaultVal.backgroundColor,circle,defaultVal.min,defaultVal.max,defaultVal.data,defaultVal.firstCircle,defaultVal.progressCircle,defaultVal.isLoopPlay,defaultVal.isLoopOpen,this.width,this.height);
    }
    this._draw();
}