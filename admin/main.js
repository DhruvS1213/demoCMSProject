angular.module('fileUpload', ['ngFileUpload'])

.controller('MyCtrl',['Upload','$window','$location', function(Upload,$window,$location){
    console.log('admin-view');
    var vm = this;
   
    vm.submit = function(contentType){
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
  
    vm.upload = function (file, contentType) 
    {
       Upload.upload({
            url: 'http://localhost:3000/upload', 
            data:{file:file} 
        }).then(function (resp) { 
            if(resp.data.error_code === 0){ 
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
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


    





