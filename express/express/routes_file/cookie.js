const express = require('express');
const router = express.Router();
const bkfd2password = require('pbkdf2-password');
const hasher = bkfd2password();

router.get('/cookie', (req, res, next)=>{
	//쿠키의 값은 숫자로 셋팅되도 문자가 됨.
	if(req.signedCookies.count)
		var count = parseInt(req.signedCookies.count)+1;
	else
		var count = 0;

	res.cookie('count',count,{signed:true});
	res.send('count: '+count);
});
var products = {
	1 : {title:'the history of web 1'},
	2 : {title:'the next web'}
};

router.get('/products', (req, res, next)=>{
	var output = '';
	for(let name in products){
		output +=`
			<li>
				<a href="/cart/${name}">${products[name].title}</a>
			</li>`
	}
	res.send(`<h1>products</h1><ul>${output}</ul>
		<a href="/cart">cart</a>`);
});

router.get('/cart/:id', (req,res,next)=>{
	let id = req.params.id;
	if(req.signedCookies.cart){
		var cart = req.signedCookies.cart;
	}
	else{
		var cart = {};	
	}
	if(!cart[id])
		cart[id] = 0;

	cart[id] = parseInt(cart[id])+1;
	res.cookie('cart', cart,{signed:true});
	res.redirect('/cart');

});

router.get('/cart',(req,res,next)=>{
	let cart = req.signedCookies.cart;
	if(!cart)
		res.rend('empty!');
	else{
		var output ='';
		for(let id in cart)
			output +=`<li>${products[id].title}(${cart[id]})</li>`

		res.send(`
			<h1>cart</h1>
			<ul>${output}</ul>
			<a href="/products">products list</a>`);

	}

});

/*세션
서버가 웹브라우저에게 고유의 값을 전달함 connect.sid
서버는 connect.sid가 같으면.. 같은 사용자로 간주 할 수 있지 않을까.
connect.sid값만 서버에 보냄.
쿠키는 count값을 서버에 보냄.
*/
router.get('/count',(req,res,next)=>{
	if(req.session.count)
		req.session.count++;	//req.session.coun는 값 get/set 가능.
	else
		req.session.count = 1;	

	res.send('result : ' +req.session.count);
});

router.get('/auth/login',(req,res,next)=>{
	let output =`
 	<form action="/auth/login" method="post">
 		<p>
			<input type="text" name="username" placeholder="username">
 		</p>
 		<p>
 			<input type="password" name="password" placeholder="password">
 		</p>
 		<input type="submit" value="login">
 	</form>
	`;
	res.send(output);
});

router.post('/auth/login',(req,res,next)=>{
	
	let uname = req.body.username;
	let pwd = req.body.password;

	for(let i=0; i<users.length; i++){
		let user = users[i];
		if(uname === user.username){
			return hasher({password:pwd, salt:user.salt}, (err,pass,salt,hash)=>{
				if(hash === user.password){
					req.session.displayName = user.displayName;
					return req.session.save(()=>{
						//res.send('success');
						res.redirect('/welcome');
					});
				}
				else
					res.send('who are you? <a href="/auth/login">login</a>');
			});			
		}		
	}	
	
	
});

router.get('/welcome',(req,res,next)=>{
	if(req.session.displayName)
		res.send(`
			<h1>hello,${req.session.displayName}</h1>
			<a href="/auth/logout">logout</a>`
			);
	else
		res.send(`
			<h1>welcome</h1>
			<a href="/auth/login">login</a>
			<a href="/auth/register">register</a>
			`);

			
	
});

router.get('/usersinfo',(req,res,next)=>{
	return res.json(users);
});

router.get('/auth/logout',(req,res,next)=>{

	
	delete req.session.displayName;
	req.session.save(()=>{	//세션이 저장된 후에 실행되도록
		res.redirect('/welcome');
	});
	
});

router.get('/auth/register',(req,res,next)=>{
	let output =`
 	<form action="/auth/register" method="post">
 		<p>
			<input type="text" name="username" placeholder="username">
 		</p>
 		<p>
 			<input type="password" name="password" placeholder="password">
 		</p>
 		<p>
 			<input type="text" name="displayName" placeholder="displayName">
 		</p>
 		<input type="submit" value="register">
 	</form>
	`;
	res.send(output);	
	
});
var users = [{
		username : 'egoing',
		password : 'Ft66K4Dj0wpQM/FVUbrJT3RDyruFlw+qtmGY5NJNtiRgKGM+ILMpygb0zatYW2wmiarNiMvnQgd3q0x4DLFUBtN0BFWj6fJkpIKO1QxEKpvXfgskrW+8xXOPFPe7mFPHdTiZossi65mX9/m1n74Gnp/OKmiLUTVK9Dpfx/MD8ZQ=',
		displayName : 'Egoing',
		salt : 'Q9NbxgewjxDPxJIFrkgFL8w8MJB0mqMf3yEYx2I0PzN15pAupTkurkAdYtLzKSEtGpadUFgq6Lsy4haf2L7AQA=='
	}];

router.post('/auth/register',(req,res,next)=>{
	
	let pwd = req.body.password;	

	hasher({password:pwd}, (err,pass,salt,hash)=>{
		let user = {
			username : req.body.username,
			password : hash,
			displayName : req.body.displayName,
			salt : salt
		};
		users.push(user);
		req.session.displayName = req.body.displayName;
		req.session.save(()=>{
			res.redirect('/welcome');
		});
	});
	
});

/*
md5 이제 안씀. 설계적 결함
단방향 암호화 방법. 복호화 불가.
let md5 =  require('md5');	//함수임
md5('password') --> 암호화된 결과 반환.

salt
let salt = '!@#$%ASDFerwr15'
md5(sals+password)	--> 쉽게 해석 못함. 
모든 사용자에게 동일한 salt 적용시 한명만 털리면 다 털림.
다른 sqlt 사용하기.

sha256 씀. 
let sha256 = require('sha256');
sha256(salt+'111');

PBKDF2
const bkfd2password = require('pbkdf2-password');
let hasher = bkfd2password();
hasher({password:'111'},(err,pass,salt,hash)=>{
	console.log(err,pass,salt,hash);
})
//console.log 결과 undefined '111' 'OuUQcm+10x2/FK67+lLxuc8x6cmN4Yyi800i35SfUxWucLJISSME/9MjbXQBRljSuIs6IcDw0mHOvSMyrNk8ZA==' '6HqDqWhsuM4pQ5hnsMJVF6gnbkxVd63cu/FYS6SRF18IJdGXIP8b+J/z05TPTMI9kCGBMlPrmwaHPzvhT5qp8gaHGjH3+/n4uRNEZmHcMZNWsrBruv19TrczXhchGklfU6v3Z9yEZA0SEtQzLS+X6pEQRTHDYDcpJkx4TtMNK74='
	hash값을 db에 저장하기.
*/
module.exports = router;