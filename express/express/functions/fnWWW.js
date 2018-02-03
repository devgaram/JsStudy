/*
	www에서 사용되는 함수정의
*/
module.exports = {

	/**
 		* Normalize a port into a number, string, or false.
	 */
	normalizePort : (val)=>{

		 let port = parseInt(val, 10);

		 if (isNaN(port)) { //숫자-true
		   // named pipe
		   return val;
		 }

		 if (port >= 0) {
		   // port number
		   return port;
		 }

		 return false;
	},
	/**
 		* Event listener for HTTP server "error" event.
 	*/
	onError : (error)=>{
		if (error.syscall !== 'listen') {
		    throw error;
		  }

		  let bind = typeof port === 'string'
		    ? 'Pipe ' + port
		    : 'Port ' + port;

		  // handle specific listen errors with friendly messages
		  switch (error.code) {
		    case 'EACCES':
		      console.error(bind + ' requires elevated privileges');
		      process.exit(1);
		      break;
		    case 'EADDRINUSE':
		      console.error(bind + ' is already in use');
		      process.exit(1);
		      break;
		    default:
		      throw error;
		  }
	},
	/**
 		* Event listener for HTTP server "listening" event.
 	*/
	onListening : ()=>{
		let addr = server.address();
		let bind = typeof addr === 'string'
		  ? 'pipe ' + addr
		  : 'port ' + addr.port;
		debug('Listening on ' + bind);
	}
}








