 function SoyuanPie(target,option){

    var defaultVal = {
        circleStrokeColor : "#327cc8",
        progressStrokeColor : "#f2637b",
        textColor : "#fff",
        backgroundColor:"#000",
        fillColor:"#0f1a3d",
        total : 200,
        val : 120
    };

    Object.assign(defaultVal, option);
    
    this.big_stroke_color = defaultVal.circleStrokeColor;
    this.progress_stroke_color = defaultVal.progressStrokeColor;
    this.textColor = defaultVal.textColor;

    this.total = defaultVal.total;
    this.val = defaultVal.val;
    this.n = 0;
    this.stopRAF = (this.val/this.total)*100;

    this.init = function(){
        var container = document.getElementById(target);
        var canvasObj = document.createElement("canvas");
        canvasObj.setAttribute("width",container.style.width);
        canvasObj.setAttribute("height",container.style.height);
        canvasObj.style.background = defaultVal.backgroundColor;
        document.getElementById('myCanvas').appendChild(canvasObj);

        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext('2d');
        this.centerX = this.canvas.width/2,   //Canvas中心点x轴坐标
        this.centerY = this.canvas.height/2, //Canvas中心点y轴坐标
        this.rad = Math.PI*2/100; //将360度分成100份，那么每一份就是rad度


        //大圆
        this.c_outer_radius = this.centerX*0.8,//大圆最外圈的半径
        this.c_second_radius = this.c_outer_radius*0.85,
        this.c_third_radius = this.c_second_radius*0.8,
        this.c_progress_radius = (this.c_second_radius-this.c_third_radius)/2 + this.c_third_radius,//进度条的半径
        this.c_progress_lineWidth = (this.c_second_radius - this.c_third_radius)/2 + 5;

         //小圆
        this.s_centerX = this.centerX+this.c_second_radius*Math.cos(45),
        this.s_centerY = this.centerY + this.c_second_radius * Math.sin(45),
        this.s_radius = this.c_outer_radius - this.c_second_radius+10;

        return this;
    };

    this._drawOutCircle = function(context,x,y,r,strokeStyle,lineWidth){
        context.strokeStyle = strokeStyle; //设置描边样式
        context.lineWidth = lineWidth; //设置线宽
        context.beginPath(); //路径开始
        context.arc(x, y, r , 0, Math.PI*2, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
    };

    this._drawProgress = function(context,x,y,r,strokeStyle,lineWidth,n){
        context.save();
        context.strokeStyle = strokeStyle; //设置描边样式
        context.lineWidth = lineWidth; //设置线宽
        context.beginPath(); //路径开始
        context.arc(x, y, r, -Math.PI/2, -Math.PI/2+this.rad*n); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.setLineDash([15, 5]);
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.restore();
    };

    this._drawText = function(context,x,y,text,textColor,fontSize){
        context.fillStyle = textColor; //设置描边样式
        context.font = fontSize+"px Arial"; //设置字体大小和字体
        var width = context.measureText(text).width;
        context.fillText(text,x-width/2,y);
    };

    this._drawSmallCircle = function(context,x,y,r){
        context.strokeStyle = "#173456"; //设置描边样式
        context.lineWidth = 20; //设置线宽
        context.beginPath(); //路径开始
        context.arc(x, y, r, 0, Math.PI*2, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke(); //绘制
        context.closePath(); //路径结束
        context.fillStyle = "#0062bf";
        context.fill();
    };


    this.draw = function() {
        
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //大圆-最外圈
        this._drawOutCircle(this.context,this.centerX,this.centerY,this.c_outer_radius,
            this.big_stroke_color,15);
        //大圆-第二圈
        this._drawOutCircle(this.context,this.centerX,this.centerY,this.c_second_radius,
            this.big_stroke_color,5);
        //大圆-第三圈
        this._drawOutCircle(this.context,this.centerX,this.centerY,this.c_third_radius,
            "#0f1a3d",5);
        //进度条
        this._drawProgress(this.context,this.centerX,this.centerY,this.c_progress_radius,
            this.progress_stroke_color,this.c_progress_lineWidth,this.n);

        this._drawText(this.context,this.centerX,this.centerY,
            this.total*this.n/100,this.textColor,40);
        this._drawText(this.context,this.centerX,this.centerY+30,
            "万吨",this.textColor,20);

        //画小圆
        this._drawSmallCircle(this.context,this.s_centerX,this.s_centerY,this.s_radius);
        this._drawText(this.context,this.s_centerX+4,this.s_centerY+5,
            this.n+"%",this.textColor,20);

        var drawController = window.requestAnimationFrame(this.draw.bind(this));
        console.log(drawController);
        if(this.n < this.stopRAF) {
            this.n = this.n + 3;
            console.log(this.stopRAF,this.n);
        }else {
            console.log(drawController);
            window.cancelAnimationFrame(drawController);
        }
    }
}