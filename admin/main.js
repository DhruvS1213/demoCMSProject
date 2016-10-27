angular.module('authorModule', ['ui.bootstrap', 'ngFileUpload', 'ngSanitize', 'angular.filter'])

.controller('uploadCtrl',['Upload','$window','$location', '$http', function(Upload, $window, $location, $http){
    console.log('admin-view');
    var vm = this;
    vm.images = [];
    vm.imgDescription = [];
    vm.videoPath = [];
    vm.accordion=1;
    vm.imgJSON = [];
    var flag=0;
    var demourl = 'http://localhost:3000/uploads/'

    
    vm.accordianFunction = function(id){
        if(id == 1)
        {
            vm.showHeading = !vm.showHeading;
            if(vm.showHeading && vm.showTextContent){
                vm.showTextContent = !vm.showTextContent;
            }
            if(vm.showHeading && vm.showImagePart){
                vm.showImagePart = !vm.showImagePart;
            }
            if(vm.showHeading && vm.showVideoPart){
                vm.showVideoPart = !vm.showVideoPart;
            }
        }
        if(id == 2)
        {
            vm.showTextContent = !vm.showTextContent;
            if(vm.showHeading && vm.showTextContent){
                vm.showHeading = !vm.showHeading;
            }
            if(vm.showTextContent && vm.showImagePart){
                vm.showImagePart = !vm.showImagePart;
            }
            if(vm.showTextContent && vm.showVideoPart){
                vm.showVideoPart = !vm.showVideoPart;
            }
        }
        if(id == 3)
        {
            vm.showImagePart = !vm.showImagePart;
            if(vm.showHeading && vm.showImagePart){
                vm.showHeading = !vm.showHeading;
            }
            if(vm.showTextContent && vm.showImagePart){
                vm.showTextContent = !vm.showTextContent;
            }
            if(vm.showImagePart && vm.showVideoPart){
                vm.showVideoPart = !vm.showVideoPart;
            }
        }
        if(id == 4)
        {
            vm.showVideoPart = !vm.showVideoPart;
            if(vm.showHeading && vm.showVideoPart){
                vm.showHeading = !vm.showHeading;
            }
            if(vm.showTextContent && vm.showVideoPart){
                vm.showTextContent = !vm.showTextContent;
            }
            if(vm.showImagePart && vm.showVideoPart){
                vm.showImagePart = !vm.showImagePart;
            }
        }
    };



    // console.log('Descriptions', vm.desription);

    
    // Adding description using this function
    vm.addDescription = function(description, index){
        console.log('index', index);
        console.log('description', description)
        //vm.imgDescription[index] = description;
       //vm.imgDescription[index] = vm.images[index] + '.txt';
       tempItem = {}
       
     
     
       
            for(var i=0; i<vm.imgJSON.length; i++){
                console.log('Searching if ID Exists');
                flag=0;
                if(vm.imgJSON[i].id == index)
                {
                    flag=1;
                    console.log('i',i);
                    console.log('id', index);
                    console.log('ID Exists');
                    vm.imgJSON[i].description = description;
                    break;
                }
            }
       
                
                
                
                if(flag == 0 )
                {
                    console.log('flag', flag);
                    console.log('ID Not found. Creating new');
                    
                    console.log('i',i);
                    console.log('id', index);
                    tempItem['id'] = index;
                    tempItem['description'] = description;
                    vm.imgJSON.push(tempItem);
                }
            
       
    
       console.log('json-length', vm.imgJSON.length);

        
        // console.log(vm.imgDescription);
        // for (desc in vm.imgDescription){
        //     console.log(desc + ':' + vm.imgDescription[desc]);
        // }

        // $http({
        //     method: 'GET',
        //     url: 'http://localhost:3000/uploadImageDescription?imgDescription=' + vm.imgDescription 
        // });
        //console.log('Descriptions', vm.desription);

        $http({
            method: 'GET',
            url: 'http://localhost:3000/uploadImgJSON?imgJSON='+ JSON.stringify(vm.imgJSON)
        });
    }

    $http({
        method: 'GET',
        url: '/getImageAddress'
    }).then(function successCallback(response){
        console.log('images recieved successfully at admin side');
        //vm.images = response.data.split(',');
        //console.log(response.data.length);
        //console.log('empty-', response.data);
        if(response.data[0] == ''){
            console.log('No Images added to blog');
        }else{
            vm.images = response.data;
        }
        

    }, function errorCallback(error){
        console.log('admin side: error in fetching image address');
    });


    // $http({
    //     method: 'GET',
    //     url: '/getImageDescription'
    // }).then(function successCallback(response){
    //     console.log('image Description recieved');
    //     if(response.data[0] == ''){
    //         console.log('No Image Description Added');
    //     }
    //     else{
    //         //vm.description = response.data;
    //         vm.imgDescription = response.data;
    //     }
    // }, function errorCallback(error){
    //     console.log('admin side: error in fetching image descriptions');
    // });


    $http({
        method: 'GET',
        url: '/getImgJSON'
    }).then(function successCallback(res){
        console.log('json object recieved');
        vm.imgJSON = res.data;
        console.log(vm.imgJSON);
        for(var i=0;i<vm.imgJSON.length;i++)
        {
            vm.imgDescription[i] = vm.imgJSON[i].description;
        }
    });


    $http({
        method:'GET',
        url: '/getHeading'
    }).then(function successCallback(response){
        //console.log(response.data);
        vm.heading = response.data;
    }, function errorCallback(error){
        console.log(error);
    });

    $http({
        method:'GET',
        url: '/getPage'
    }).then(function successCallback(response){
        //console.log(response.data);
        vm.data = response.data;
    }, function errorCallback(error){
        console.log(error);
    });

    vm.submit = function(contentType){
        console.log('submit', contentType);
        vm.imUploadProgress = 0;
        vm.progressText1 = 0;
        if (vm.file) 
        {
            console.log('valid', contentType);
            vm.upload(vm.file, contentType); 
        }
    };
    
    vm.preview = function()
    {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/selectedImages?imgArray='+vm.images
        });
        $window.location.href = 'http://localhost:4000/user';
        
    };

    vm.fetchText = function(data)
    {
        var file = CKEDITOR.instances.usercontent.getData();
        Upload.upload({
            url: 'http://localhost:3000/htmlupload?demo='+encodeURIComponent(file)
        });
        alert("Data Successfully Uploaded");
    };

    vm.fetchHeading = function(head)
    {
       var file = CKEDITOR.instances.userheading.getData();
       console.log(file);
        Upload.upload({
            url: 'http://localhost:3000/headingupload?demo='+encodeURIComponent(file)
        });
        alert("Data Successfully Uploaded"); 
    };
  
    vm.remove = function(image) { 
        console.log('delete');
        var index = vm.images.indexOf(image);
        console.log('removed-index:', index);
        console.log('deleted image path', vm.images[index]);
        var imagePath = vm.images[index];
        vm.images.splice(index, 1);
        console.log('image path array', vm.images);   
        //vm.description.splice(index,1);  
        vm.imgDescription.splice(index,1);
       // console.log('inside remove');
       // console.log('image description', vm.imgDescription);
        
        $http({
            method: 'GET',
            url: 'http://localhost:3000/deleteImage?fileName='+ imagePath
        });

        console.log('img array length', vm.images.length);
        //console.log('description array length', vm.description.length);
        // console.log('updated description array');
        // for (desc in vm.imgDescription){
        //     console.log(desc + ':' + vm.imgDescription[desc]);
        // }
        if(vm.images.length == 0){
            vm.images = [];    
        }

        vm.imgJSON.splice(index,1)
        for(var i = index ; i<vm.imgJSON.length; i++){
            console.log('inside for');
            console.log('id', vm.imgJSON[i].id);
            vm.imgJSON[i].id = vm.imgJSON[i].id - 1 ;
        }

        console.log('updated after delete');
        console.log(vm.imgJSON);

        $http({
            method: 'GET',
            url: 'http://localhost:3000/uploadImgJSON?imgJSON='+ JSON.stringify(vm.imgJSON)
        });

        $http({
            method: 'GET',
            url: 'http://localhost:3000/selectedImages?imgArray='+ vm.images
        });
    };

    vm.upload = function (file, contentType) 
    {
       Upload.upload({
            url: 'http://localhost:3000/upload', 
            data:{file:file} 
        }).then(function (resp) { 
            console.log(contentType);
            if(resp.data.error_code === 0){ 
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                if(contentType == 1)
                {
                    console.log(resp.config.data.file.name);
                    name = resp.config.data.file.name;
                    console.log(demourl + name);
                    vm.images.push(demourl+name);
                    console.log(vm.images);
                    $http({
                        method: 'GET',
                        url: 'http://localhost:3000/selectedImages?imgArray='+vm.images
                     });
                } 

                if(contentType == 2)
                {
                    console.log('videoName', resp.config.data.file.name);
                    name = resp.config.data.file.name;
                    console.log(demourl + name);
                    vm.videoPath.push(demourl+name);
                    console.log(vm.videoPath);
                    $http({
                        method: 'GET',
                        url: 'http://localhost:3000/selectedVideos?videoPath='+vm.videoPath
                     });
                }
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) 
            { 
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) { 
                
                if(contentType == 1)
                {
                    console.log('1');
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    vm.imUploadProgress = progressPercentage;
                    vm.progressText1 = 'progress: ' + progressPercentage + '% ';
                }

                if(contentType == 2)
                {
                    console.log("2");
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    vm.vidUploadProgress = progressPercentage;
                    vm.progressText2 = 'progress: ' + progressPercentage + '% ';
                }            
            });
        };
}])





