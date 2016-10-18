    var express = require('express'); 
    var fs = require('fs');
    var app = express(); 
    var bodyParser = require('body-parser');
    var imgArray=[];

    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static('../server-user'));
    app.use(express.static('../user'));
    
    app.use(bodyParser.json());  

    app.get('/user', function(req,res){
       var index = fs.readFileSync('../user/client-index.html');
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(index); 
    });

    app.listen('4000', function(){
        console.log('running on 4000...');
    });    

