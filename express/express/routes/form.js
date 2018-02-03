let express = require('express');
let router = express.Router();

/*
	post 방식
	body parser 모듈 사용

*/
router.get('/', (req, res, next)=> {
  	res.render('form');
});
router.post('/form_receiver', (req, res, next)=> {
  	res.send(req.body.title +',' + req.body.description);
});

/* jade extends*/
router.get('/jade_add', (req, res, next)=> {
  	res.render('jade_add');
});
router.get('/jade_view', (req, res, next)=> {
  	res.render('jade_view');
});

module.exports = router;

/*
form.js에서 app.js의 변수를 사용하고 싶을 떄,

app.js 에서
let form = require('./routes/form')(app);

module.exports = (app) => {
	.....
	return router;	
};

*/