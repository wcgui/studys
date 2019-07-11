function Bar_3d(target,option){
    let defaultVal={
        title:'收出',
        backgroundColor:'#13265E',
        radius:30,//整个柱子的半径
        floatHeight:10,//上浮高度
        dataHeight:32,//整个柱子的高度
        grid:{top:0,left:0},//控制图像的中心位置，默认在最中间0，0，top的负数向下正数向上，left负数向左正数向右，
        color:"#025BD3",
        rotation:1/5,
        data:[
            {
                name:'水费',value:1000
            },
            {
                name:'燃气费',value:2000
            },
            {
                name:'电费',value:3240,
            },
            {
                name:'租金',value:2310,
            },
            {
                name:'医药费',value:3200,
            }
        ],//数据最少两个，最多五个
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
    if(defaultVal.data.length<2){
        console.log("数据个数小于2,不予绘制");
        return;
    }else if(defaultVal.data.length>5){
        defaultVal.data.length=5;
    }
    this.init=function(){
        this.width=target.style.width.slice(0,-2);//场景的宽度
        this.height=target.style.height.slice(0,-2);//场景的高度
        // this.float=true;//是否在上浮
        this.dataCount=0,this.count=0,this.dataHeight=new Array(),this.BarHeight=new Array(),this.boolean=new Array(),this.count1=0,this.timer=0;//timer控制信息显示时间,count1控制详细信息的展示dataCount总数值,dataHeight每个柱子的高度,比例,上边的半径barHeight用来上升，boolean判断是否可以绘制
        for(let i=0;i<defaultVal.data.length;i++){
            this.dataCount+=defaultVal.data[i].value;
            for(let j=0;j<defaultVal.data.length-1;j++){
                if(defaultVal.data[j].value<defaultVal.data[j+1].value){
                    let max=defaultVal.data[j];
                    defaultVal.data[j]=defaultVal.data[j+1];
                    defaultVal.data[j+1]=max;
                }
            }
        }
        for(let i=0;i<defaultVal.data.length;i++){
            this.BarHeight[i]=0;
            this.boolean[i]=false;
             let height=0;
             this.dataHeight[i]={ratio:Math.round(defaultVal.data[i].value/this.dataCount*100)/100,height:defaultVal.data[i].value/this.dataCount*defaultVal.dataHeight};
             for(let j=0;j<=i;j++){
                height+=this.dataHeight[j].height;
             }
             this.dataHeight[i].radiusTop=defaultVal.radius*(defaultVal.dataHeight-height)/defaultVal.dataHeight;
        }
        for(let i=0,count=this.boolean.length;i<5-count;i++){
            this.boolean.push(true);
        }
        //新建一个场景
        this.scene=new THREE.Scene();
        //新建一个相机
        //正交相机
        // this.camera=new THREE.OrthographicCamera(this.width/-2,this.width/2,this.height/2,this.height/-2,1,1000);
        //远景相机
        this.camera=new THREE.PerspectiveCamera(75,this.width/this.height,0.1,1000);
        this.camera.position.set(0,0,100);
        //新建一个渲染器
        this.renderer=new THREE.WebGLRenderer();
        this.renderer.setClearColor(defaultVal.backgroundColor);
        this.renderer.setSize(this.width,this.height);
        target.appendChild(this.renderer.domElement);
    }
    this._draw=function(scene,defaultVal,dataHeight){
        scene.rotation.x=Math.PI*defaultVal.rotation;
        scene.position.x=defaultVal.grid.left;
        scene.position.y=defaultVal.grid.top;
        let geometry,material,cylinder,cone,plane,light,boolean;//几何模型，材质，扇形结合，平面几何结合，灯光,判断是否可以继续绘制
        this.count++;
        //环境光均匀的照射场中的所有对象
        light = new THREE.AmbientLight(hexify(defaultVal.color.colorRgb(0.4)));
        scene.add(light);
        light = new THREE.PointLight('#E7FCFB',1);//新建一个点光源光强为1
        light.position.set( 0,dataHeight[0].height, 2);//设置光源的位置
        scene.add(light);
        //建立第一个四边形柱子
        // geometry=new THREE.CylinderGeometry(dataHeight[0].radiusTop,defaultVal.radius,dataHeight[0].height,4,1,false,0,Math.PI*2);//一次性绘制好的代码
        geometry=new THREE.CylinderGeometry(dataHeight[0].radiusTop,defaultVal.radius,0,4,1,false,0,Math.PI*2);
        material=new THREE.MeshPhongMaterial({color:hexify(defaultVal.color.colorRgb(0.8))});
        cylinder=new THREE.Mesh(geometry,material);
        scene.add(cylinder);
        // 建立第二个柱子
        // this.count++;
        // boolean=draw(scene,this.count,defaultVal,dataHeight,defaultVal.color.colorRgb(0.6));
        // // 若为true怎停止绘制否则继续执行
        // if(boolean){
        //     return;
        // }
        // //绘制第三个柱子
        // this.count++;
        // boolean=draw(scene,this.count,defaultVal,dataHeight,defaultVal.color.colorRgb(0.4));
        // if(boolean){
        //     return;
        // }
        // //绘制第四个柱子
        // this.count++;
        // boolean=draw(scene,this.count,defaultVal,dataHeight,defaultVal.color.colorRgb(0.2));
        // if(boolean){
        //     return;
        // }
        // // 绘制第五个柱子
        // this.count++;
        // boolean=draw(scene,this.count,defaultVal,dataHeight,defaultVal.color.colorRgb(0.1));
    }
    this.init();
    this._draw(this.scene,defaultVal,this.dataHeight);
    // this.renderer.render(this.scene,this.camera);
    this.animate=function(){
        // console.log(this.BarHeight[0],this.dataHeight[0].height);
        this.requestAnimation=window.requestAnimationFrame(this.animate.bind(this));
        this.scene.rotation.y-=0.01;
        //创建依次递增
        if(this.BarHeight[0]<this.dataHeight[0].height){
            //第一个柱子的高度增加
            this.BarHeight[0]+=this.dataHeight[this.count-1].height/100;
            this.scene.children[2].scale.y=this.BarHeight[0];
            if(this.BarHeight[0]>=this.dataHeight[0].height){
                this.count++;
                //第二个柱子的绘制
                draw(this.scene,this.count,defaultVal,this.dataHeight,defaultVal.color.colorRgb(0.6));
            }
        }else if(!this.boolean[this.count-1]){
            let op=0;
            if(this.count==3){
                op=0.4;
            }else if(this.count==4){
                op=0.2;
            }else if(this.count==5){
                op=0.1;
            }
            this.run(op);
        }else if(this.count1<this.dataHeight.length){
            let positionY=0;
            let mesh=new Array();
            for(let i=0;i<this.scene.children.length;i++){
                if(this.scene.children[i].type=="Mesh"){
                    mesh.push(this.scene.children[i]);
                }
            }
            mesh[this.count1].rotation.y+=0.05;
            for(let i=0;i<this.count1;i++){
                positionY+=this.dataHeight[i].height;
            }
            positionY=-3*(positionY+defaultVal.floatHeight*(this.count1-1));
            let DIV=target.getElementsByTagName("div");
            if(DIV.length==0){
                let div=document.createElement("div");
                div.className="run";
                div.style.width="0";
                div.style.top="10px";
                div.style.left=(3*defaultVal.grid.left+this.width/2+2*this.dataHeight[this.count1].radiusTop)+"px";
                div.style.top=(positionY+this.height/2-3*defaultVal.grid.top)+"px";
                target.appendChild(div);
            }else if(parseInt(DIV[0].style.width)<50){
                DIV[0].style.width= parseInt(DIV[0].style.width)+1;
            }else if(target.getElementsByTagName("span").length==0){
                let span=document.createElement("span");
                span.className="textShow";
                span.style.height=0;
                span.style.left=(3*defaultVal.grid.left+this.width/2+2*this.dataHeight[this.count1].radiusTop+50)+'px';
                span.innerHTML=`${defaultVal.title}总值：${this.dataCount}<br>
                                ${defaultVal.data[this.count1].name}：${defaultVal.data[this.count1].value}<br>
                                所占比例：${Math.round(this.dataHeight[this.count1].ratio*100)}%`;
                target.appendChild(span);
            }else if(parseInt(target.getElementsByTagName("span")[0].style.height)<80){
                let spanStyle=target.getElementsByTagName("span")[0].style;
                spanStyle.top=(positionY+this.height/2-3*defaultVal.grid.top-parseInt(spanStyle.height)/2)+'px';
                spanStyle.height=parseInt(spanStyle.height)+1;
                spanStyle.padding="10px";
            }else if(this.timer==300){
                target.removeChild(target.children[target.children.length-1]);
                target.removeChild(target.children[target.children.length-1]);
                mesh[this.count1].rotation.y=0;
                this.count1++;
                if(this.count1>=this.dataHeight.length){
                    this.count1=0;
                }
                this.timer++;
            }else{
                this.timer++;
                if(this.timer>301){
                    this.timer=0
                }
            }
        }
       this.renderer.render(this.scene,this.camera);
   }
    this.animate();
    //判断是否是绘制圆柱还是圆锥并绘制出来
    function draw(scene,count,defaultVal,dataHeight,color){
        color=hexify(color);
        let positionY=0,geometry,material,cone,cylinder,light;
        for(let i=0;i<count-1;i++){
            positionY+=dataHeight[i].height;
        }
        positionY=positionY+defaultVal.floatHeight*(count-1);
        if(count==defaultVal.data.length){
            // geometry=new THREE.ConeGeometry(dataHeight[count-2].radiusTop,dataHeight[count-1].height,4,1,false,0,Math.PI*2);//一次性完成绘制
            geometry=new THREE.ConeGeometry(dataHeight[count-2].radiusTop,0,4,1,false,0,Math.PI*2);
            material=new THREE.MeshPhongMaterial({color:color});
            cone=new THREE.Mesh(geometry,material);
            scene.add(cone);
            cone.position.y=positionY;
            light = new THREE.PointLight('#E7FCFB',0.1);
            light.position.set(0,positionY*3+dataHeight[count-1].height,0);
            scene.add(light);
            //返回true停止绘制
            return true;
        }else{
            geometry=new THREE.CylinderGeometry(dataHeight[count-1].radiusTop,dataHeight[count-2].radiusTop,0,4,1,false,0,Math.PI*2);
            // geometry=new THREE.CylinderGeometry(dataHeight[count-1].radiusTop,dataHeight[count-2].radiusTop,dataHeight[count-1].height,4,1,false,0,Math.PI*2);//一次性绘制好
            material=new THREE.MeshPhongMaterial({color:color});
            cylinder=new THREE.Mesh(geometry,material);
            scene.add(cylinder);
            cylinder.position.y=positionY;
            light = new THREE.PointLight('#E7FCFB',0.3);//新建一个点光源光强为1
            light.position.set( 0.5,positionY+dataHeight[count-1].height, 2 );//设置光源的位置
            scene.add( light );//添加进场景
            return false;
        }
    }
    //绘制动态
    this.run=function(opacity){
        if(this.BarHeight[this.count-1]<this.dataHeight[this.count-1].height){
            this.BarHeight[this.count-1]+=this.dataHeight[this.count-1].height/100;
            this.scene.children[2*this.count-1].scale.y=this.BarHeight[this.count-1];
            if(this.BarHeight[this.count-1]>=this.dataHeight[this.count-1].height){
                if(this.count==this.dataHeight.length){
                    this.boolean[this.count-1]=true;
                    return;
                }
                this.count++;
                draw(this.scene,this.count,defaultVal,this.dataHeight,defaultVal.color.colorRgb(opacity));
            }
        }
    }
    //rgba值转换十六进制
    function hexify(color) {
        let values = color
          .replace(/rgba?\(/, '')
          .replace(/\)/, '')
          .replace(/[\s+]/g, '')
          .split(',');
        let a = parseFloat(values[3] || 1),
            r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
            g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
            b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
        return "#" +
          ("0" + r.toString(16)).slice(-2) +
          ("0" + g.toString(16)).slice(-2) +
          ("0" + b.toString(16)).slice(-2);
    }
}