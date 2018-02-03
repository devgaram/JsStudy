/*
	express 구조화
	npm install express-generator -g
	express --view=pug express
	run the app:
     > SET DEBUG=express:* & npm start

  supervisor app.js -- 서버 자동 업데이트.
*/
let express = require('express');
let path = require('path'); //파일, 디렉토리 경로를 통한 접근.
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');  //body-parser 통과한 후 라우터 동작.

let index = require('./routes/index');
let users = require('./routes/users');
let form = require('./routes/form');

let app = express();
console.log('__dirname = '+__dirname); //C:\Users\USER\Desktop\JsStudy\express\express
// view engine setup
app.locals.pretty = true; //html 코드 가독성 향상.
/*
  app.set(name,value);
  app.get(name);

  정의된 app 속성
  views : string/array, app views.

  path.join(__dirname, 'views')
  return C:\Users\USER\Desktop\JsStudy\express\express\views

*/
app.set('views', path.join(__dirname, 'views'));

/*
  view engine : string
  return N/A(undefined)
*/
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use 미들웨어 쓸떄
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/*
  app.use([path,] callback [, callback...])
*/

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//정적인 파일이 위치한 디렉토리.
// 이미지 css js 와 같은 정적파일을 제공하기 위해 express.static 사용한다.
//정적 디렉토리의 이름은 url의 일부가 아님
//정적 파일은 내용 수정하면 바로 반영시킬 수 있음 서버 다시 킬필요 없음.

/*
  라우터 등록
  
  / 로 들어오는 건 index에서 처리하게.
  /form 으로 들어오는 건 form에서 처리하고.
*/
app.use('/', index);
app.use('/users', users);
app.use('/form', form);

/*
  express에서 에러처리하기.
  1) 다른 app.use()와 라우터 호출을 정의한 후, 
  맨 마지막으로 정의되어야함.
  2) 4개의 인자를 취하는 오류처리 미들웨어는 오류발생시에만 호출됨.
  3) 모든 경로의 request가 들어옴.
  4) 에러를 순서대로 처리함.

*/
// catch 404 and forward to error handler
app.use((req, res, next)=> {
  let err = new Error('Not Found'); //error.message
  err.status = 404;
  next(err);  // 익스프레스로 에러보내기. 그러면 바로뒤는 건너뛰고 오류처리기로 감.
});

app.use((req, res, next)=> {
  console.log('this will not print');
});
// error handler
/*
  다른 app.use() , 라우터 호출 정의한 후 마지막으로 정의해야함.
  always takes four arguments.
*/
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
