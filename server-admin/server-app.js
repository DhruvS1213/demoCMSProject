    var express = require('express'); 
    var fs = require('fs');
    var url = require('url');
    var app = express(); 
    var bodyParser = require('body-parser');
    var multer = require('multer');
    
    var imgArray=[];
    var imgDescription = [];
    var imgString;
    var imgDescriptionString;

    app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost:8100");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static('../admin'));
    app.use(express.static('../server-admin'));
    
    app.use(bodyParser.json());  

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            
            var extension = file.originalname.split('.')[file.originalname.split('.').length -1];
            if (extension == 'jpg' || extension == 'png' || extension == 'jpeg' || extension == 'bmp' || extension == 'tiff') {
                cb(null, file.originalname);
            }
            if (extension == 'mp4' || extension == 'ogv' || extension == 'wmv') {
                cb(null, 'vid.'+extension);
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
            res.end();
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
            res.end();
         });
    });

    app.get('/deleteImage', function(req,res){
        var fileUrl = url.parse(req.query.fileName).path;
        fs.unlinkSync('.'+fileUrl);
        res.end();
    });


    app.get('/admin', function(req,res){
       var index = fs.readFileSync('../admin/admin-index.html');
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(index);
    });

    app.get('/selectedImages', function(req, res){
        imgArray = req.query.imgArray;
        console.log('recieved image array', imgArray);
        fs.writeFile('./uploads/selectedImages.txt', imgArray, 'utf8', function(err){
            if(err){
                return console.log(err);
            }
            console.log('Stored Path to selected images in text file');
            res.end();
        });

    });

    app.get('/uploadImageDescription', function(req, res){
        imgDescription = req.query.imgDescription;
        console.log('recieved descriptions:', imgDescription);
        fs.writeFile('./uploads/imageDescription.txt', imgDescription, 'utf8', function(err){
            if(err){
                return console.log(err)
            }
            console.log('Stored Path to selected image description in text file');
            res.end();
        });
        
    });

    app.get('/getPage', function(req,res){
        console.log('Content Request: Blog content ...');
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
            console.log('Content Request Handled: No blog content added yet ...');
        }
    });

    app.get('/getHeading', function(req,res){
        console.log('Content Request : Blog Heading ...');
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
            var noContentHtml = '<p> No Heading added yet </p>';
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(noContentHtml);
            res.end();
            console.log('Content Request Handled: No blog heading added yet ...');
        }
   });

    app.get('/getImageAddress', function(req,res){
        try{
            var stats = fs.statSync('./uploads/selectedImages.txt');
            if(stats.isFile())
            {
                fs.readFile('./uploads/selectedImages.txt', "utf8", function (err,data) {
                    if(err){
                        console.log('try: cannot read selected images file');
                        imgArray=[];
                        imgString = JSON.stringify(imgArray);
                        res.end(imgString);
                        
                    }
                imgArray = data.split(','); 
                console.log('Image Array length', imgArray.length);
                if(imgArray.length !== 0){
                   res.writeHead(200, {"Content-Type": "application/json"});
                   imgString = JSON.stringify(imgArray);
                   res.end(imgString);
                }
             });
            }
        }
        catch(e){
            console.log('catch: No images added yet');
            imgArray=[];
            imgString = JSON.stringify(imgArray);
            res.end(imgString);
        }
    });


    app.get('/getImageDescription', function(req, res){
        try{
            var stats = fs.statSync('./uploads/selectedImages.txt');
            if(stats.isFile()){
                fs.readFile('./uploads/imageDescription.txt', 'utf8', function(err, data){
                    if(err){
                        console.log('try: cannot read image description file');
                        imgDescription = [];
                        imgDescriptionString = JSON.stringify(imgDescription);
                        res.end(imgDescriptionString);
                    }
                    imgDescription = data.split(',');
                    console.log('Image Description Array Length', imgDescription.length);
                    if(imgDescription.length != 0 )
                    {
                        res.writeHead(200, {'Content-type': 'application/json'});
                        imgDescriptionString =  JSON.stringify(imgDescription);
                        res.end(imgDescriptionString);
                    }
                });
            }
        }
        catch(e){
            console.log('catch: No image description added yet');
            imgDescription=[];
            imgDescriptionString = JSON.stringify(imgArray);
            res.end(imgDescriptionString);
        }
    })


app.get('/uploads/vid.mp4', function(req,res){
    try{
        console.log('Content Request: Video Content ...');
        var stats = fs.statSync('./uploads/vid.mp4');
        if(stats.isFile()){
            res.writeHead(200);
            res.end();
        }
    }
    catch(e){
        console.log('Content Request Handled: No video content found ...');
        res.writeHead(200);
        res.end();
    }
});

app.listen('3000', function(){
        console.log('running on 3000...');
    });    

