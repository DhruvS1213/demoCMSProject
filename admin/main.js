angular.module('fileUpload', ['ngFileUpload'])

.controller('MyCtrl',['Upload','$window','$location', '$http', function(Upload,$window,$location, $http){
    console.log('admin-view');
    var vm = this;
    vm.images = [];
    var demourl = 'http://localhost:3000/uploads/'
    vm.submit = function(contentType){
        vm.imUploadProgress = 0;
        vm.progressText1 = 0;
        if (vm.upload_form.file.$valid && vm.file) 
        {
            vm.upload(vm.file, contentType); 
        }
    }
    
    vm.preview = function()
    {
        $window.location.href = 'http://localhost:3000/user';
    }

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
        console.log(index);
        console.log(vm.images[index]);
        var imagePath = vm.images[index];
        vm.images.splice(index, 1);     
        $http({
            method: 'GET',
            url: 'http://localhost:3000/deleteImage?fileName='+ imagePath
        });
    }

    vm.upload = function (file, contentType) 
    {
       Upload.upload({
            url: 'http://localhost:3000/upload', 
            data:{file:file} 
        }).then(function (resp) { 
            if(resp.data.error_code === 0){ 
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                console.log(resp.config.data.file.name);
                name = resp.config.data.file.name;

                console.log(demourl + name);
                vm.images.push(demourl+name);
                console.log(vm.images); 
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
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    vm.imUploadProgress = progressPercentage;
                    vm.progressText1 = 'progress: ' + progressPercentage + '% ';
                }
                else
                {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    vm.vidUploadProgress = progressPercentage;
                    vm.progressText2 = 'progress: ' + progressPercentage + '% ';
                }            
            });
        };
}])


    





