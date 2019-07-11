
var wsTime = (function(){
    Date.prototype.format = function (fmt) { 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    let time=new Worker("success_time.js");
    time.postMessage("fdsf");
    time.onmessage=function(event){
        let data=event.data;
        let dom = document.getElementsByClassName("time");
        Array.prototype.forEach.call(dom,function(item,key){
            let html="";
            if((key+1)%2==0){
                html=new Date(data).format("yyyy-MM-dd hh:mm:ss");
            }else{
                html=new Date(data).format("yyyy-MM-dd hh:mm");
            }
            item.innerHTML=html;
        });
        let div= document.createElement("div");
        div.className="time";
        document.getElementsByTagName("body")[0].appendChild(div);
        time.terminate();
        time=new Worker("success_time.js");
        time.postMessage("王");
    };
})();
// worker.terminate() 可以终止worker
