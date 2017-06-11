var  mysql = require('mysql');
var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'Wewechat'

});

connection.connect();

connection.query('select  * from ',function(err,rows,fields){
	if (err) throw err;
	console.log('select * from db')
});


connection.end();