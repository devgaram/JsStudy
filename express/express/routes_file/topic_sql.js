const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1234',
	database : 'o2'
});

conn.connect();


//form창 가기
router.get('/new',(req,res,next)=>{
	
		res.render('new_sql');	
});

//글 리스트 보기
router.get(['/', '/:id'], (req,res,next)=>{

	let sql = 'SELECT id, title FROM topic';
	conn.query(sql, (err, topics, fields)=>{
		if(err){
			console.log(err);
			res.status(500).send('1: Internal Server Error');
		}
		
		let id = req.params.id;
		if(id){
			let sql = 'SELECT * FROM topic WHERE id=?';
			conn.query(sql, [id], (err, topic, fields)=>{
				if(err){
					console.log(err);
					res.status(500).send('2: Internal Server Error');
				} 
				res.render('view_sql', {topic:topic[0], topics:topics});
			});
		}
		else{
			res.render('view_sql', {topics : topics, title:'welcome', description:'hello~!'}); 	
		}
	});		
});

//글 insert
router.post('/',(req,res,next)=>{
	let title = req.body.title;
	let description = req.body.description;
	let author = req.body.author;

	sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
	let params = [title, description, author];
	conn.query(sql, params, (err, result, fields)=>{
		if(err){ 
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		
		console.log(result.insertId);
		res.redirect('/topic_sql/'+result.insertId);	
	});
	
});

//update form
router.get(['/:id/edit'], (req,res,next)=>{

	let id = req.params.id;

	if(id){
		let sql = 'SELECT * FROM topic WHERE id=?';
		conn.query(sql, [id], (err, topic, fields)=>{
			if(err){
				console.log(err);
				res.status(500).send('2: Internal Server Error');
			} 
			res.render('edit', {topic:topic[0]});
		});
	}
	else
		res.status(500).send('ID가 없다~');
});

//update 하기!
router.post(['/:id/edit'], (req,res,next)=>{

	let id = req.params.id;
	if(id){
		let title = req.body.title;
		let description = req.body.description;
		let author = req.body.author;

		sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
		let params = [title, description, author, id];
		conn.query(sql, params, (err, result, fields)=>{
			if(err){ 
				console.log(err);
				res.status(500).send('Internal Server Error');
			}
			//console.log(result);
			res.redirect('/topic_sql/'+id);	
		});
	}
	else
		res.status(500).send('ID가 없다~');
});

//delete
router.get(['/:id/delete'], (req,res,next)=>{

	let id = req.params.id;

	if(id){
		let sql = 'SELECT * FROM topic WHERE id=?';
		conn.query(sql, [id], (err, topic, fields)=>{
			if(err){
				console.log(err);
				res.status(500).send('2: Internal Server Error');
			} 
			
			if(topic.length === 0){
				console.log(err);
				res.status(500).send('ID가 존재하지 않습니다.');
			}
			else{
				sql = 'DELETE FROM topic WHERE id=?';
				let params = [id];
				conn.query(sql, params, (err, rows, fields)=>{
					if(err) console.log(err);
					else{
						res.redirect('/topic_sql');
					}
				});
			}		
			
		});
	}
	else
		res.status(500).send('ID가 없다~');
});

module.exports = router;