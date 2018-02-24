const express = require('express');
const router = express.Router();

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
	let user = {
		username : 'egoing',
		password : '111',
		displayName : 'Egoing'
	};

	let uname = req.body.username;
	let pwd = req.body.password;
	
	if(uname === user.username && pwd === user.password){
		req.session.displayName = user.displayName;
		res.redirect('/welcome');
	}
	else{
		res.send('who are you? <a href="/auth/login">login</a>');
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
			`);
	
});

router.get('/auth/logout',(req,res,next)=>{

	
	delete req.session.displayName;
	req.session.save(()=>{	//세션이 저장된 후에 실행되도록
		res.redirect('/welcome');
	})
	
	
	
});



module.exports = router;