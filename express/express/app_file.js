const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const MySQLStore = require('express-mysql-session')(session);

const app = express(); //app 객체 생성
const topic = require('./routes_file/topic');
const upload = require('./routes_file/upload');
const topic_sql = require('./routes_file/topic_sql');
const cookie = require('./routes_file/cookie');

//req객체의 body 프로퍼티를 만들어서 post 접근 가능하게 해준다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//정적파일 접근
app.use(express.static(path.join(__dirname, 'upload')));

//쿠키 미들웨어 설정.
app.use(cookieParser('23asfag@#$%')); 	//암호의 키값이 됨.
app.use(session({
	secret : '1234asdf!@#$',
	resave : false,
	saveUninitialized : true,	//세션을 실제로 사용하기 전까지는 발급하지 말아라.
	//store : new FileStore() 	/*
								/*	세션정보를 filestore에 저장한다~
									sessions 폴더를 만듬.
									서버 껏다켜도 해당 파일 읽어와서 세션 유지됨.
								*/
	store:new MySQLStore({
		host : 'localhost',
		port:3306,
		user : 'root',
		password : '1234',
		database : 'o2'
	})
}));

//라우터 설정
//app.use('/topic',topic); //파일 저장 예제
//app.use('/upload',upload); //파일 업로드 예제.
//app.use('/topic_sql',topic_sql); //파일 업로드 예제.
/**20180224 쿠키&세션*/
app.use('/',cookie); 

//pug 설정
app.locals.pretty = true; 
app.set('views',path.join(__dirname,'views_file'));
app.set('view engine','pug');




module.exports = app;	//모듈로 만들자.