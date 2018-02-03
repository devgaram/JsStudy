'use strict';

let chai = require('chai');	//nodejs에서 제공하는 chai 라이브러리
let should = chai.should(); //chai의 BDD style

/*
	BDD 인터페이스가 제공하는 함수.
	describe() : 테이스틔 이름을 지정하며, 중첩하여 사용할 수 있다. 
				 테스트를 구분하는 section이며, 단위테스트 부분을 콜백으로 넘겨준다.
	it() : 단위테스트의 이름을 작성하고 실제 실행되는 코드를 콜백(done)으로 넘겨준다.
	befor() : 테스트 코드가 실행되기 전 한번 실행된다.
	after() : 모든 테스트 코드가 실행된 후 한 번 실행된다.
	beforeEach() : (테스트 코드가 여러개일 경우) 각각의 테스트 코드가 실행되기 전마다 실행된다.
	afterEach() : (테스트코드가 여러개일 경우) 각각의 테스트 코드가 실행된 후마다 실행된다.
	.a(type[,msg]) : 지정된 타입과 동일한지 리턴.
	.equal(val[,msg]) : === var과 주어진 타켓이 같은지.
	.false : 타켓 === false

	TDD 인터페이스가 제공하는 함수.
	suite()
	test()
	setup()
	teardown()

	require('../JsStudy')
	JsStudy.js 에 정의된 exports 객체를 반환.
		

*/
let JsStudy = require('../JsStudy');

describe('Function Foo', () =>{
	describe('with two number params',()=>{
		before(()=>{
			console.log("before");
		})
		beforeEach(()=>{
			console.log("테스트");
		})
		after(()=>{
			console.log("after");
		})
		it('should return number',()=>{
			let result = JsStudy.foo(3,4);
			result.should.be.a('number');
			
		});
		it('should equal 12',()=>{
			let result = JsStudy.foo(3,4);
			result.should.equal(12);

		});
		it('should equal 12 -chaiX',done =>{
			let result = JsStudy.foo(3,4);
			if (result == 12)
				done();
			else
				throw Error('결과가 12가 아님.');
		});
	});

});

describe('with non-number params',()=>{
	it('should return false',()=>{
		let result = JsStudy.foo(3,null);
		result.should.be.false;
	});
});

describe('Function Bar', () =>{
	describe('with one number params',()=>{
		it('should return product',()=>{
			let result = JsStudy.bar(500);
			result.should.be.a('number');
			result.should.equal(500);
		});
	});

});

describe('Function obExprots', () =>{
	describe('with one number params',()=>{
		it('should return product',()=>{
			let result = JsStudy.obExprots(500);
			let result2 = result.foo(3,4);
			result.should.be.a('Object');
			result2.should.equal(12);
		});
	});

});

describe('Function httpTest', () =>{
	it('console',()=>{
		let result = JsStudy.httpTest();
		result.should.be.a('object');

	});
	
});
describe('Function getOsInfo', () =>{
	it('내 운영체제는',()=>{
		let result = JsStudy.getOsInfo();
	});
	
});

describe('Function setUglify', () =>{
	it('안녕',()=>{
		let result = JsStudy.setUglify();
		//done();
	});
	
});			
describe('Function useUnderscore', () =>{
	it('useUnderscore',()=>{
		let result = JsStudy.useUnderscore();
	});
	
});			

