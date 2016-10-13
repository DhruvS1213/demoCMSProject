    var express = require('express'); 
    var fs = require('fs');
    var url = require('url');
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var imgNo = 1;
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
                    // cb(null, 'img.' + extension);
                    cb(null, 'img-'+ imgNo + '.' + extension);
                    imgNo ++;    
                    if(imgNo > 3){
                        imgNo = 1;
                    }
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
         var usercontent = req.query.demo;
         var datetime = Date.now();
         fs.writeFile('./uploads/data'+ '.html', usercontent,  function(err) {
            if (err) {
                return console.error(err);
            }
         });
    });

    app.post('/headingupload', function(req,res){
         var heading_usercontent = req.query.demo;
         console.log(heading_usercontent);
         var datetime = Date.now();
         fs.writeFile('./uploads/heading'+ '.html', heading_usercontent,  function(err) {
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
        try{
            var stats = fs.lstatSync('./uploads/data.html');
            if(stats.isFile())
            {
                fs.readFile('./uploads/data.html', "utf8", function (err,data) {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data);
                    res.end();
                });
            }
        }
        catch(e){
            var noContentHtml = '<p> No content Added yet </p>';
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(noContentHtml);
            res.end();
            console.log('no data content exists');
        }
    });

    app.get('/getHeading', function(req,res){
        console.log('get heading-content request made');
        try{
            var stats = fs.lstatSync('./uploads/heading.html');
            if(stats.isFile())
            {
                fs.readFile('./uploads/heading.html', "utf8", function (err,data) {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data);
                    res.end();
                });
            }
        }
        catch(e){
            var noContentHtml = '<p> No content Added yet </p>';
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(noContentHtml);
            res.end();
            console.log('no heading content exists');
        }
   });

    app.get('/uploads/vid.mp4', function(req, res){
        try{
            console.log('get video-content request made');
            var stats = fs.statSync('./uploads/vid.mp4');
            if(stats.isFile()){
                res.writeHead(200);
                res.end();
            }
        }
        catch(e){
            console.log('Video doesnt exist');
        }
        
    });

   app.get('/uploads/img.jpg', function(req,res){
         var imgNo = req.query.imgNo;
         try{
            var stats = fs.statSync('./uploads/img-'+ imgNo + '.jpg');
            if(stats.isFile()){
                res.writeHead(200);
                res.end();
            }
        }
        catch(e){
            console.log('Image doesnt exist');
        }
    });

    

    app.listen('3000', function(){
        console.log('running on 3000...');
    });    

