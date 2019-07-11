async function asyncFunc(params){console.log(this);
	const result1 = await this.login();
	const result2 = await this.getInfo();
}
function login(){
	console.log(Object.entries({one:1,two:2}));
}
function getInfo(){
	let obj={one:1,two:2};
	console.log(Object.entries(obj));
	for(let [k,v] of Object.entries(obj)){
		console.log(k,v);
	}
	console.log("Vue".padEnd(10));
}
asyncFunc();