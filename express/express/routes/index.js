let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=> {
	let id = req.query.id;
	res.render('index', { title: 'Express' ,id:id});
  	//index.pug 파일을 렌더링.
});
/*시멘틱 url*/
/*router.get('/:id/:title', (req, res, next)=> {
  	res.render('index', { title: req.params.title ,id:req.params.id});
  	//index.pug 파일을 렌더링.
});*/
module.exports = router;