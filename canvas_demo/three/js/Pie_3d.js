function Pie_3d(target,option){
    let defaultVal={
        backgroundColor:'#070826',
        radius:30,//扇形半径
        color:['#7435F8','#F951E4','#15BED1','#2157F8',],//扇形颜色
        grid:{top:0,left:0},//控制图像的中心位置，默认在最中间0，0，top的负数向下正数向上，left负数向左正数向右，
        rotation:1/6,//沿x轴翻转的角度
        dataHeight:[3,7,11,14,16],//扇形高度
        //数据
        data:[
            {
                value:1800,
                name:'保护费'
            },
            {
                value:2000,
                name:'过路费'
            },
            {
                value:1000,
                name:'水费'
            },
            {
                value:5200,
                name:'电费'
            },
            {
                value:5200,
                name:'燃气费'
            },
        ]
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
    for(let i=0;i<defaultVal.dataHeight.length;i++){
        for(let j=0;j<defaultVal.dataHeight.length-1;j++){
            if(defaultVal.dataHeight[j]>defaultVal.dataHeight[j+1]){
                let max=defaultVal.dataHeight[j];
                defaultVal.dataHeight[j]=defaultVal.dataHeight[j+1];
                defaultVal.dataHeight[j+1]=max;
            }
        }
    }
    this.init=function(){
        this.width=target.style.width.slice(0,-2);
        this.height=target.style.height.slice(0,-2);
        this.dataCount=0;this.count=0;//dataCount数据总值，count数据的个数
        //存放百分比
        this.per=new Array();
        //存放mesh的id
        this.meshId=[[],[],[],[],[]];
        this.dataHeight=[0,0,0,0,0]//defaultVal.dataHeight//[3,7,11,14,16];//存放不同扇形的高度
        this.scene=new THREE.Scene();//新建一个场景
        this.camera=new THREE.PerspectiveCamera(75,this.width/this.height,0.1,1000);//新建一个相机
        this.camera.position.set(0,0,100);//设置相机位置
        this.renderer=new THREE.WebGLRenderer();//新建一个渲染器
        this.renderer.setClearColor(defaultVal.backgroundColor,1);
        this.renderer.setSize(this.width,this.height);
        target.appendChild(this.renderer.domElement);
        if(defaultVal.data.length>5){
            defaultVal.data.length=5;
        }
        for(let i=0;i<defaultVal.color.length;i++){
            defaultVal.color[i]=defaultVal.color[i].colorRgb(1);
        }
        for(let i=0;i<defaultVal.data.length;i++){
            this.dataCount+=defaultVal.data[i].value;
        }
        if(defaultVal.color.length<defaultVal.data.length){
            for(let i=0;i<(defaultVal.data.length-defaultVal.color.length);i=0){
                let color=`rgba(${Math.round(Math.random()*(255-0+1)+0)},${Math.round(Math.random()*(255-0+1)+0)},${Math.round(Math.random()*(255-0+1)+0)},1)`;
                defaultVal.color.push(color);
            }
        }else{
            defaultVal.color.length=defaultVal.data.length;
        }
        if(defaultVal.dataHeight.length<defaultVal.data.length){
            for(let i=0;i<(defaultVal.data.length-defaultVal.dataHeight.length);i=0){
                let height=defaultVal.dataHeight[defaultVal.dataHeight.length-1]+4;
                defaultVal.dataHeight.push(height);
            }
        }else{
            defaultVal.dataHeight.length=defaultVal.data.length;
        }
    }
    this._draw=function(scene,defaultVal,dataCount){
        scene.rotation.x=Math.PI*defaultVal.rotation;
        scene.position.x=defaultVal.grid.left;
        scene.position.y=defaultVal.grid.top;
        let geometry,material,cylinder,plane,light;//几何模型，材质，扇形结合，平面几何结合，灯光
        this.count++;
        light = new THREE.PointLight('#E7FCFB',1);//新建一个点光源光强为1
        light.position.set( 0.5,40, 1 );//设置光源的位置
        scene.add( light );//添加进场景
        light = new THREE.PointLight('#E7FCFB',1);
        light.position.set( 0.5,30, 2 );
        scene.add( light );
        light = new THREE.DirectionalLight();//新建一个平行光默认是白色光，光强为1
        light.position.set( -0.5, -0.5, 1 );//设置光源的位置
        scene.add( light );
        light = new THREE.DirectionalLight();
        light.position.set( 0, 0, -1 );
        scene.add( light );
        light = new THREE.DirectionalLight();
        light.position.set( 10, 0, 0 );
        scene.add( light );
        //建立第一个扇形柱子
        this.per.push(Math.round(defaultVal.data[0].value/dataCount*100));
        geometry=new THREE.CylinderGeometry(defaultVal.radius,defaultVal.radius,this.dataHeight[0],36,1,false,-Math.PI*this.per[0]/100,Math.PI*this.per[0]/50);
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[0]});
        cylinder=new THREE.Mesh(geometry,material);
        scene.add(cylinder);
        this.meshId[0][0]=cylinder.id;
        if(this.count==defaultVal.data.length){
            return;
        }
        this.count++;
        // 绘制第二个扇形柱子
        this.per.push(Math.round(defaultVal.data[1].value/dataCount*100));
        this.per[this.count-1]=num(this.count,defaultVal.data.length,this.per);
        geometry=new THREE.CylinderGeometry(defaultVal.radius,defaultVal.radius,this.dataHeight[1],36,1,false,Math.PI*this.per[0]/100,Math.PI*this.per[1]/50);
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[1]});
        cylinder=new THREE.Mesh(geometry,material);
        cylinder.position.y=(this.dataHeight[1]-this.dataHeight[0])/2;
        scene.add(cylinder);
        this.meshId[1][0]=cylinder.id;
        geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[1]);
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[1]});
        plane=new THREE.Mesh(geometry,material);
        plane.position.y=(this.dataHeight[1]-this.dataHeight[0])/2;
        //绘制第一个面
        plane.position.x=defaultVal.radius/2*Math.sin(Math.PI*this.per[0]/100);
        plane.position.z=defaultVal.radius/2*Math.cos(Math.PI*this.per[0]/100);
        if(Math.PI*this.per[0]/50>Math.PI){
            plane.rotateY(Math.PI*(this.per[0]/50-1)/2);
        }else{
            plane.rotateY(-Math.PI*(1-this.per[0]/50)/2);
        }
        scene.add(plane);
        this.meshId[1][1]=plane.id;
        if(this.count==defaultVal.data.length){
            //倘若只有两个绘制第二个面
            geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[1]);
            material=new THREE.MeshPhongMaterial({color:defaultVal.color[1]});
            plane=new THREE.Mesh(geometry,material);
            plane.position.y=(this.dataHeight[1]-this.dataHeight[0])/2;
            plane.position.x=-defaultVal.radius/2*Math.cos(Math.PI*(1-this.per[0]/50)/2);
            plane.position.z=defaultVal.radius/2*Math.sin(Math.PI*(1-this.per[0]/50)/2);
            if(Math.PI*this.per[0]/50>Math.PI){
                plane.rotateY(-Math.PI*(this.per[0]/50-1)/2);
            }else{
                plane.rotateY(Math.PI*(1-this.per[0]/50)/2);
            }
            scene.add(plane);
            this.meshId[1][2]=plane.id;
            return;
        }
        this.count++;
        //绘制第三个扇形柱子
        this.per.push(Math.round(defaultVal.data[2].value/dataCount*100));
        this.per[this.count-1]=num(this.count,defaultVal.data.length,this.per);
        geometry=new THREE.CylinderGeometry(defaultVal.radius,defaultVal.radius,this.dataHeight[2],36,1,false,-Math.PI*this.per[0]/100-Math.PI*this.per[2]/50,Math.PI*this.per[2]/50);//改变起始点
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[2]});
        cylinder=new THREE.Mesh(geometry,material);
        cylinder.position.y=(this.dataHeight[2]-this.dataHeight[0])/2;
        scene.add(cylinder);
        this.meshId[2][0]=cylinder.id;
        //绘制第一个面
        geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[2]);
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[2]});
        plane=new THREE.Mesh(geometry,material);
        plane.position.y=(this.dataHeight[2]-this.dataHeight[0])/2;
        plane.position.x=-defaultVal.radius/2*Math.cos(Math.PI*(1-this.per[0]/50)/2);
        plane.position.z=defaultVal.radius/2*Math.sin(Math.PI*(1-this.per[0]/50)/2);
        if(Math.PI*this.per[0]/50>Math.PI){
            plane.rotateY(-Math.PI*(this.per[0]/50-1)/2);
        }else{
            plane.rotateY(Math.PI*(1-this.per[0]/50)/2);
        }
        scene.add(plane);
        this.meshId[2][1]=plane.id;
        if(this.count==defaultVal.data.length){
            //倘若只有三个绘制第二个面
            geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[2]);
            material=new THREE.MeshPhongMaterial({color:defaultVal.color[2]});
            plane=new THREE.Mesh(geometry,material);
            plane.position.y=(this.dataHeight[2]-this.dataHeight[0])/2;
            plane.position.x=defaultVal.radius/2*Math.sin(Math.PI*this.per[0]/100+Math.PI*this.per[1]/50);
            plane.position.z=defaultVal.radius/2*Math.cos(Math.PI*this.per[0]/100+Math.PI*this.per[1]/50);
            if(Math.PI*this.per[0]/50+Math.PI*this.per[1]/50>Math.PI){
                plane.rotateY(Math.PI*(this.per[0]/50-1)/2+Math.PI*this.per[1]/50);
            }else{
                plane.rotateY(-Math.PI*(1-this.per[0]/50)/2+Math.PI*this.per[1]/50);
            }
            scene.add(plane);
            this.meshId[2][2]=plane.id;
            return;
        }
        //绘制第四个扇形柱子
        this.count++;
        this.per.push(Math.round(defaultVal.data[3].value/dataCount*100));
        this.per[this.count-1]=num(this.count,defaultVal.data.length,this.per);
        geometry=new THREE.CylinderGeometry(defaultVal.radius,defaultVal.radius,this.dataHeight[3],36,1,false,Math.PI*this.per[0]/100+Math.PI*this.per[1]/50,Math.PI*this.per[3]/50);//改变起始点
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[3]});
        cylinder=new THREE.Mesh(geometry,material);
        cylinder.position.y=(this.dataHeight[3]-this.dataHeight[0])/2;
        scene.add(cylinder);
        this.meshId[3][0]=cylinder.id;
        //绘制第一个面
        geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[3]);
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[3]});
        plane=new THREE.Mesh(geometry,material);
        plane.position.y=(this.dataHeight[3]-this.dataHeight[0])/2;
        plane.position.x=defaultVal.radius/2*Math.sin(Math.PI*this.per[0]/100+Math.PI*this.per[1]/50);
        plane.position.z=defaultVal.radius/2*Math.cos(Math.PI*this.per[0]/100+Math.PI*this.per[1]/50);
        if(Math.PI*this.per[0]/50+Math.PI*this.per[1]/50>Math.PI){
            plane.rotateY(Math.PI*(this.per[0]/50-1)/2+Math.PI*this.per[1]/50);
        }else{
            plane.rotateY(-Math.PI*(1-this.per[0]/50)/2+Math.PI*this.per[1]/50);
        }
        scene.add(plane);
        this.meshId[3][1]=plane.id;
        if(this.count==defaultVal.data.length){
            //倘若只有四个绘制第二个面
            geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[3]);
            material=new THREE.MeshPhongMaterial({color:defaultVal.color[3]});
            plane=new THREE.Mesh(geometry,material);
            plane.position.y=(this.dataHeight[3]-this.dataHeight[0])/2;
            plane.position.x=-defaultVal.radius/2*Math.cos(Math.PI*(1-this.per[0]/50)/2-this.per[2]/50*Math.PI);
            plane.position.z=defaultVal.radius/2*Math.sin(Math.PI*(1-this.per[0]/50)/2-this.per[2]/50*Math.PI);
            if(Math.PI*this.per[0]/50>Math.PI){
                 // plane.rotateY(-Math.PI*(this.per[0]/50-1)/2+this.per[2]/50*Math.PI);修改前
                plane.rotateY(-Math.PI*(this.per[0]/50-1)/2-this.per[2]/50*Math.PI);
            }else{
                plane.rotateY(Math.PI*(1-this.per[0]/50)/2-this.per[2]/50*Math.PI);
            }
            scene.add(plane);
            this.meshId[3][2]=plane.id;
            return;
        }
        this.count++;
        //绘制第5个扇形
        this.per.push(Math.round(defaultVal.data[4].value/dataCount*100));
        this.per[this.count-1]=num(this.count,defaultVal.data.length,this.per);
        geometry=new THREE.CylinderGeometry(defaultVal.radius,defaultVal.radius,this.dataHeight[4],36,1,false,Math.PI*this.per[0]/100+Math.PI*this.per[1]/50+Math.PI*this.per[3]/50,Math.PI*this.per[4]/50);//改变起始点
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[4]});
        cylinder=new THREE.Mesh(geometry,material);
        cylinder.position.y=(this.dataHeight[4]-this.dataHeight[0])/2;
        scene.add(cylinder);
        this.meshId[4][0]=cylinder.id;
        //绘制第一个面
        geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[4]);
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[4]});
        plane=new THREE.Mesh(geometry,material);
        plane.position.y=(this.dataHeight[4]-this.dataHeight[0])/2;
        plane.position.x=defaultVal.radius/2*Math.sin(Math.PI*this.per[0]/100+Math.PI*this.per[1]/50+Math.PI*this.per[3]/50);
        plane.position.z=defaultVal.radius/2*Math.cos(Math.PI*this.per[0]/100+Math.PI*this.per[1]/50+Math.PI*this.per[3]/50);
        if(Math.PI*this.per[0]/50+Math.PI*this.per[1]/50+Math.PI*this.per[3]/50>Math.PI){
            plane.rotateY(Math.PI*(this.per[0]/50-1)/2+Math.PI*this.per[1]/50+Math.PI*this.per[3]/50);
        }else{
            plane.rotateY(-Math.PI*(1-this.per[0]/50)/2+Math.PI*this.per[1]/50+Math.PI*this.per[3]/50);
        }
        scene.add(plane);
        this.meshId[4][1]=plane.id;
        //绘制第二个面
        geometry=new THREE.PlaneGeometry(defaultVal.radius,this.dataHeight[4]);
        material=new THREE.MeshPhongMaterial({color:defaultVal.color[4]});
        plane=new THREE.Mesh(geometry,material);
        plane.position.y=(this.dataHeight[4]-this.dataHeight[0])/2;
        plane.position.x=-defaultVal.radius/2*Math.cos(Math.PI*(1-this.per[0]/50)/2-this.per[2]/50*Math.PI);
        plane.position.z=defaultVal.radius/2*Math.sin(Math.PI*(1-this.per[0]/50)/2-this.per[2]/50*Math.PI);
        if(Math.PI*this.per[0]/50>Math.PI){
            // plane.rotateY(-Math.PI*(this.per[0]/50-1)/2+this.per[2]/50*Math.PI);修改前
            plane.rotateY(-Math.PI*(this.per[0]/50-1)/2-this.per[2]/50*Math.PI);//修改后
        }else{
            plane.rotateY(Math.PI*(1-this.per[0]/50)/2-this.per[2]/50*Math.PI);
        }
        scene.add(plane);
        this.meshId[4][2]=plane.id;
    }
    this.init();
    this._draw(this.scene,defaultVal,this.dataCount);
    // this.renderer.render(this.scene,this.camera);
    this.animate=function(){
         this.requestAnimation=window.requestAnimationFrame(this.animate.bind(this));
         this.scene.rotation.y+=0.01;
        if(this.dataHeight[0]<defaultVal.dataHeight[0]){
            for(let i=0;i<defaultVal.dataHeight.length;i++){
                this.dataHeight[i]+=defaultVal.dataHeight[i]/100;
            }
            // this.scene.children[10].scale.y+=defaultVal.dataHeight[1]/100;
            // this.scene.children[11].scale.y+=defaultVal.dataHeight[1]/100;
            // this.scene.children[12].scale.y+=defaultVal.dataHeight[1]/100;
        } 
        if(this.dataHeight[0]<defaultVal.dataHeight[0]){
            for(let i=0;i<this.meshId.length;i++){
                for(let j=0;j<this.meshId[i].length;j++){
                    let index=0;
                    if(i!=0){
                        for(let z=0;z<i;z++){
                            index+=this.meshId[z].length;
                        }
                    }
                    if(this.scene.children[5+index+j].id==this.meshId[i][j]){
                        this.scene.children[5+index+j].scale.y+=defaultVal.dataHeight[i]/100;
                        // console.log(this.scene.children[5+index+j].id,this.meshId[i][j]);
                    }
                    if(i!=0)
                        this.scene.children[5+index+j].position.y=(defaultVal.dataHeight[i]-defaultVal.dataHeight[0])/2;
                }
            }
        }
        this.renderer.render(this.scene,this.camera);
    }
    this.animate();
    function num(count,count1,per){
        if(count==count1){
            let num=0;
            for(let i=0;i<count;i++){
                num+=per[i];
            }
            if(num!=100){
                return per[count-1]+(100-num);
            }else{
                return per[count-1];
            }
        }else{
            return per[count-1];
        }
    }
}