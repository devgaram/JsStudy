'use strict';

/*
	exports
	만들고자 하는 모듈을 파일로 만들고 exports 객체의 속성, 메소드를 
	정의해주면 모듈을 만들어 낼 수 있다.

	만들어진 모듈은 전역함수 require()을 이용해 추출,
*/

//foo.js 라는 객체를 만든 것.
exports.foo = (a,b) => {
	if(typeof a !== 'number' || typeof b !== 'number')
		return false;
	return a*b;
};
exports.bar = (coin) => {
	return coin;
};
exports.obExprots = (coin) => {
	return this;
};

/*
	웹서버가 됨.
	접속이 들어오기를 기다림.
*/		
exports.httpTest = () => {
	const http = require('http'); //node.js에서 제공하는 http 모듈을 가져온다.
								  //const 블락스코프, 선언과 동시에 할당해야함, 변수 재선언, 재할당 불가

	const hostname = '127.0.0.1';
	const port = 3000;

	//클라이언트의 request 요청에 대한 응답
	const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/plain');
	  res.end('Hello World\n');
	  server.close();	//서버종료
	  console.log("2 :" + server.listening);
	}).listen(port, hostname, () => {
	  console.log(`Server running at http://${hostname}:${port}/`);
	  console.log("1 :" + server.listening);
	});

	console.log("3 :"+ server.listening);
	console.log(http);
	return http;
};
/*
	운영체제 정보 얻기
*/		
exports.getOsInfo = () => {
	let o = require("os");
	console.log(o.platform());
};
/*
npm 설치
npm install uglify-js -g
es6에선 
npm install --save-dev uglify-js@github:mishoo/UglifyJS2#harmony -g
g(X) : 현재 프로젝트의 부품으로 설치
g(O) : 전역에서 독립적인 패키지로 설치

*/
exports.setUglify = () => {
	let hello =(name) => {
		console.log('Hi,'+name);
	}
	hello('garam');

};
exports.useUnderscore = () => {
	let _ = require('underscore');	//모듈을 사용할 수 있는 객체를 리턴
	let arry = [3,6,1,5,1];
	console.log(_.first(arry));
	console.log(_.last(arry));
};