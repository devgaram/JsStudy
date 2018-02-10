const mysql = require('mysql');
const conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1234',
	database : 'o2'
});

conn.connect();

// connection.query('SELECT 1+1 AS solution', (err, rows, fields)=>{
// 	if(err) throw err;
// 	console.log('the solution is : ', rows[0].solution);
// });

//select문 사용방법
let sql = 'SELECT * FROM topic';
conn.query(sql, (err, rows, fields)=>{
	if(err) console.log(err);
	else{
		// console.log('rows', rows);
		// console.log('fields',fields);
		for(let i=0; i<rows.length; i++)
			console.log(rows[i].author);
	}
});

//insert문 사용방법
sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
let params = ['supervisor','watcher','graphittie'];
conn.query(sql, params, (err, rows, fields)=>{
	if(err) console.log(err);
	else console.log(rows.insertId);
});

//update 사용방법
sql = 'UPDATE topic SET title=?, author=? WHERE id=?';
let params = ['NPM','leezche','1'];
conn.query(sql, params, (err, rows, fields)=>{
	if(err) console.log(err);
	else console.log(rows);
});

//delete 방법
sql = 'DELETE FROM topic WHERE id=?';
let params = [1];
conn.query(sql, params, (err, rows, fields)=>{
	if(err) console.log(err);
	else console.log(rows);
});

conn.end();