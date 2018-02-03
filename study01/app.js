let express = require('express');
//express모듈을 통해서 application 객체를 만들어 줘야한다.
let app = express();
app.use(express.static('public'));
//정적인 파일이 위치한 디렉토리.
// 이미지 css js 와 같은 정적파일을 제공하기 위해 express.static 사용한다.
//정적 디렉토리의 이름은 url의 일부가 아님
//정적 파일은 내용 수정하면 바로 반영시킬 수 있음 서버 다시 킬필요 없음.
app.get('/route',(req, res)=>{
	res.send('hello router, <img src="/image01.jpg">');
});
app.get('/dynamic', (req,res)=>{
	let lis = '';
	for(let i=0; i<5; i++)
		lis = lis + '<li>coding</li>';	

	let output = `
	<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		hello dynamic
		<ul>
		${lis}
		</ul>
	</body>
	</html>`;
	res.send(output);
})
app.get('/',(req, res)=>{
	res.send('hello home page');
});	//사용자가 홈으로 들어오면 콜백함수 실행. '/' default
	//url로 들어오는 건 주로 get방식.
	//라우터역할
app.get('/login', (req,res)=>{
	res.send('login please');
});
app.listen(3000, ()=>{	//포트, 콜백
	console.log('connected 3000 port!');
});