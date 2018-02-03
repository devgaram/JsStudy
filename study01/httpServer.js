const http = require('http');

	const hostname = '127.0.0.1';
	const port = 3000;

	//클라이언트의 request 요청에 대한 응답
	const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/plain');
	  res.end('Hello World\n');
	  server.close();
	  console.log("2 :" + server.listening);
	}).listen(port, hostname, () => {
	  console.log(`Server running at http://${hostname}:${port}/`);
	  console.log("1 :" + server.listening);
	});

	//console.log(server.listening);
	//server.close();
	//console.log("2 :" + server.listening);