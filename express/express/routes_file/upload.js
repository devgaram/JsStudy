const express = require('express');
const router = express.Router();
const fs = require('fs'); //파일시스템 사용
const multer = require('multer');	//파일 업로드.

//let upload = multer({dest : './upload/'}); //업로드 위치// 업로드받을 수 있는 미들웨어 리턴.

//diskstorage가 storage객체를 리턴함.
let storage = multer.diskStorage({
	destination : (req, file, cb)=>{	//파일저장위치.
		if(file.mimetype === 'image/jpeg')
			cb(null, './upload/images');
		else
			cb(null, './upload/etc');
	},
	filename : (req, file, cb)=>{
		cb(null, file.originalname);
	}
});

let upload = multer({storage:storage});

router.get('/', (req, res, next)=>{
	res.render('upload');
});



//upload.single('input=file의 name')
router.post('/', upload.single('userfile'), (req, res, next)=>{
	console.log(req.file);
	res.send('uploaded :' +req.file.filename);
});

module.exports = router;