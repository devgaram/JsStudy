/*
	npm i mocha --save-dev
	npm i should --save-dev
	npm i supertest --save-dev
	 "test": "node_modules/.bin/mocha spec/login.spec.js"
*/
const should = require('should');
const request = require('supertest');			/*
													익스프레스 서버를 구조한 뒤 http 요청/응답받는 구조로
													그 응답을 should로 검증하면 된다.
												*/
const app = require('../app_file');				/*
													서버역할인 express 객체가 필요하다.
													supertest의 실행함수 파라미터로 사용하기 때문.
												*/
describe('GET /auth/login',()=>{						//(설명문자열, 콜백함수)
	it('should return 200 status code', (done)=>{	//실제테스트코드
		request(app)								//서버를 supertest로 테스트하겠다.
			.get('/auth/login')
			.expect(200)							//OK
			.end((err,res)=>{
				if(err) throw err;
				done();								//비동기 테스트함수의 실행(supertest)을 기다리고.it()함수 종료시킴.
			})
		//(true).should.be.equal(true);				
	});	
});

describe('POST /auth/login',()=>{
	it('check login',(done)=>{
		request(app)
			.post('/auth/login')
			.type('form')
			.redirects(0)
			.send({username:'egoing', password:'111'})
			.end((err,res)=>{
				if(err) throw err;
				else{
					console.log(res.text);				//res.send('afdafd'); afdafd 
					console.log(res.redirect);			//res.redirect('/'); true
					console.log(res.body);
					console.log(res);	

					res.redirect.should.be.equal(true);
					done();
				}
			});
	});

	it('get users /usersinfo',(done)=>{
		request(app)
			.get('/usersinfo')
			.expect(200)
			.end((err,res)=>{
				if(err) throw err;
				else{
					res.body.should.be.an.instanceof(Array);
					for(let i in res.body){
						console.log(res.body[i].username);
						console.log(res.body[i].password);
						console.log(res.body[i].displayName);
						console.log(res.body[i].salt);
						res.body[i].should.have.properties('username','salt');
						res.body[i].username.should.be.a.String();
					}
					

					done();
				}
			})
	});

	
});