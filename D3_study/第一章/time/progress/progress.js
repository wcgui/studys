var wsProgress=(function(){
    var wsProgressTime;
    const run=function({className,currentValue,totalValue,truthValue,value}){
        wsProgressTime=setTimeout(function(){
            loading(className,Math.round((value/totalValue)*100),truthValue?value:value+"%");
            value++;
            if(value<currentValue)
                run({className,currentValue,totalValue,truthValue,value});
        },1000);
    }
    const init=function(className="progress-bar",type="static"){
        var value=0;
        if(type=='static'){
            let $tar=$("."+className);
                currentValue=$tar.attr("current-value");
                totalValue=$tar.attr("total-value");
                truthValue=$tar.attr("truth-value");
            if(typeof(currentValue)=='undefined'){
                currentValue=100;
            }
            if(typeof(totalValue)=='undefined'){
                totalValue=100;
            }
            if(typeof(truthValue)=='undefined'){
                truthValue=false;
            }
            run({className,currentValue,totalValue,truthValue,value})
        }else{
            console.log("执行api的进度方式")
        }
    }
    const loading=function(className,progress,progressHtml){
        let $tar=$("."+className).children("div");

        $tar.animate({width:progress+"%"},1000,function(){
            $tar.prev("span").html(progressHtml);
        })
    }
    const clearTime=function(){
        clearTimeout(wsProgressTime);
        wsProgressTime=null;
    }
    return {
        init,
        clearTime
    }
})();