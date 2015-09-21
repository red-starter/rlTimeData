var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../client'));

var port = process.env.PORT || 8080

// app.get('/',function(req,res){
// 	res.redirect('/index.html')
// })

app.listen(port,function(){
	console.log('listening on ',port)
});

module.exports = app;
