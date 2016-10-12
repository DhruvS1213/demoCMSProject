    var express = require('express'); 
    var fs = require('fs');
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');

    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static('../admin'));
    app.use(express.static('../server'));
    app.use(express.static('../user'));
    
    app.use(bodyParser.json());  

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            var extension = file.originalname.split('.')[file.originalname.split('.').length -1];
            if (extension == 'jpg' || extension == 'png') {
                cb(null, 'img.' + extension);
            }
            if (extension == 'mp4' || extension == 'ogv' || extension == 'wmv') {
                cb(null, 'vid.' + extension);
            }
        }
    });

   var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

   /** API path that will upload the files */
    app.post('/upload', function(req, res) {
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
             res.json({error_code:0,err_desc:null});
        });
    });

   app.post('/htmlupload', function(req,res){
         var usercontent = req.param("demo");
         var datetime = Date.now();
         fs.writeFile('./uploads/data'+ '.html', usercontent,  function(err) {
            if (err) {
                return console.error(err);
            }
         });
    });

    app.post('/headingupload', function(req,res){
         var usercontent = req.param("demo");
         var datetime = Date.now();
         fs.writeFile('./uploads/heading'+ '.html', usercontent,  function(err) {
            if (err) {
                return console.error(err);
            }
         });
    });

    
    app.get('/admin', function(req,res){
       var index = fs.readFileSync('../admin/admin-index.html');
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(index);
    });

    app.get('/user', function(req,res){
       var index = fs.readFileSync('../user/client-index.html');
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(index); 
    });

    app.get('/getPage', function(req,res){
        console.log('get html-content request made');
        fs.readFile('./uploads/data.html', "utf8", function (err,data) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
        });
    });

    app.get('/getHeading', function(req,res){
        console.log('get heading-content request made');
        fs.readFile('./uploads/heading.html', "utf8", function (err,data) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
        });
    });

    app.get('/%7B%7Buv.videoSRC%7D%7D', function(req, res){
        console.log('get video-content request made');
    });

    app.get('/uploads/img.jpg', function(req,res){
        console.log('get image-content request made');
    });

    app.get('/uploads/img.jpg', function(req,res){
        console.log('get image-content request made');
    });

    app.listen('3000', function(){
        console.log('running on 3000...');
    });    

