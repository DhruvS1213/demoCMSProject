    var express = require('express'); 
    var fs = require('fs');
    var url = require('url');
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var shell = require('shelljs');
    var imgArray=[];

    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    //app.use(express.static('../admin'));
    app.use(express.static('../server'));
    app.use(express.static('../user'));
    
    app.use(bodyParser.json());  

    app.get('/user', function(req,res){
       var index = fs.readFileSync('../user/client-index.html');
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(index); 
    });

    app.get('/selectedImages', function(req, res){
        imgArray = req.query.imgArray;
        console.log('recieved image array', imgArray);
        fs.writeFile('../server-admin/uploads/selectedImages.txt', imgArray, 'utf8', function(err){
            if(err){
                return console.log(err);
            }
            console.log('Stored Path to selected images in text file');
        });
    });

    app.get('/getPage', function(req,res){
        console.log('Content Request: Blog content ...');
        try{
            var stats = fs.lstatSync('../server-admin/uploads/data.html');
            if(stats.isFile())
            {
                fs.readFile('./server-admin/uploads/data.html', "utf8", function (err,data) {
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
            console.log('Content Request Handled: No blog content added yet ...');
        }
    });

    app.get('/getHeading', function(req,res){
        console.log('Content Request : Blog Heading ...');
        try{
            var stats = fs.lstatSync('../server-admin/uploads/heading.html');
            if(stats.isFile())
            {
                fs.readFile('../server-admin/uploads/heading.html', "utf8", function (err,data) {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(data);
                    res.end();
                });
            }
        }
        catch(e){
            var noContentHtml = '<p> No Heading added yet </p>';
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(noContentHtml);
            res.end();
            console.log('Content Request Handled: No blog heading added yet ...');
        }
   });

    app.get('/uploads/vid.mp4', function(req, res){
        try{
            console.log('Content Request: Video content ...');
            var stats = fs.statSync('../server-admin/uploads/vid.mp4');
            if(stats.isFile()){
                res.writeHead(200);
                res.end();
            }
        }
        catch(e){
            console.log('Content Request Handled: No video content found ...');
        }
    });

    app.get('/getImageAddress', function(req,res){
        try{
            var stats = fs.statSync('../server-admin/uploads/selectedImages.txt');
            if(stats.isFile())
            {
                fs.readFile('../server-admin`/uploads/selectedImages.txt', "utf8", function (err,data) {
                    if(err){
                        console.log('cannot read selected images file');
                    }
                imgArray = data.split(','); 
                console.log('Image Array length', imgArray.length);
                if(imgArray.length !== 0){
                   res.writeHead(200, {"Content-Type": "application/json"});
                   var imgString = JSON.stringify(imgArray);
                   res.end(imgString);
                }
             });
            }
        }
        catch(e){
            console.log('No images added yet');
        }
    });

app.get('/uploads/img.jpg', function(req,res){
    var imgNo = req.query.imgNo;
    try{
            console.log('Content Request: Image content ...');
            var stats = fs.statSync('../server-admin/uploads/img-'+ imgNo + '.jpg');
            if(stats.isFile()){
                res.writeHead(200);
                res.end();
             }
    }   
    catch(e){
        console.log('Content Request Handled: No image content found ...');
    }
});

app.listen('3000', function(){
        console.log('running on 3000...');
    });    

