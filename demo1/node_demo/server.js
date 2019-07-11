var http=require("http");
http.createServer(function(res,rep){
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('HELLO WORLD\n');
}).listen(8888);
console.log('server running at http://127.0.0.1:8888');
