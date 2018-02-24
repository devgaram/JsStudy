const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

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

//라우터 설정
//app.use('/topic',topic); //파일 저장 예제
//app.use('/upload',upload); //파일 업로드 예제.
//app.use('/topic_sql',topic_sql); //파일 업로드 예제.
/**20180224 쿠키*/
app.use('/',cookie); //파일 업로드 예제.

//pug 설정
app.locals.pretty = true; 
app.set('views',path.join(__dirname,'views_file'));
app.set('view engine','pug');




module.exports = app;	//모듈로 만들자.