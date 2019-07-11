onmessage=function(event){
    console.log(event)
    let times = function(){
        postMessage(new Date());
        setTimeout(function(){
            times();
        },1000);
    }
    setTimeout(function(){
        times();
    }, 1000);
}