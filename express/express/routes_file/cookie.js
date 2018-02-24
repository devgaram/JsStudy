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

module.exports = router;