const express = require('express');
const router = express.Router();
const fs = require('fs'); //파일시스템 사용

//파일내용 입력창
router.get('/new',(req,res,next)=>{
	fs.readdir('./data', (err, files)=>{
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('new', {topics : files});
	});
});

//파일 리스트 보기
router.get(['/', '/:id'], (req,res,next)=>{
	fs.readdir('./data', (err, files)=>{
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}

		let id = req.params.id;
		if(id){
		//id 있을 때,
			fs.readFile('./data/'+id, 'utf8', (err,data)=>{
				if(err){
					console.log(err);
					res.status(500).send('Internal Server Error');
				}
				res.render('view', {title:id, topics:files, description:data});
			});
		}
		else{
		//id 없을 때,
			res.render('view', {topics : files, title:'welcome', description:'hello~!'}); //인자 : 파일이름, 주입객체
		}
	});
	
});

//파일 생성
router.post('/',(req,res,next)=>{
	let title = req.body.title;
	let description = req.body.description;
	
	fs.writeFile('./data/'+title, description, (err)=>{
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		
		res.redirect('/topic/'+title);		
		
	});
	
});

module.exports = router;