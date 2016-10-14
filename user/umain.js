angular.module('fileDownload', ['ngSanitize', 'ui.bootstrap'])

.controller('uvCtrl', ['$sce','$http', function($sce, $http){ 
    var vm = this;
    var temp = Math.floor((Math.random() * 100) + 1);
    var tempimg1, tempimg2, tempimg3;
    console.log('user-view controller');
    vm.myInterval = 3000;
    
    $http({
        method: 'GET',
        url: 'http://localhost:3000/getHeading'
    }).then(function successCallback(resp)
    {
        vm.userHeadingRequest = resp.data;
        console.log('Sucess!!');
    }, function errorCallback(response)
        {
            console.log('error');
        });

    $http({
        method: 'GET',
        url: 'http://localhost:3000/getPage'
    }).then(function successCallback(resp)
        {
            vm.userContentRequest = resp.data;
            console.log('Sucess!!');
        }, function errorCallback(response)
        {
            console.log('error');
        });

   var tempImage1 = "http://localhost:3000/uploads/img-1.jpg";
   

   
    $http({
        method: 'GET',
        url: "http://localhost:3000/uploads/img.jpg?imgNo="+encodeURIComponent(1)    
    }).then(function successCallback(resp)
        {
           vm.imageRequest1 = "http://localhost:3000/uploads/img-1.jpg";
            console.log('Image Retreival Success !!');
        }, function errorCallback(response){
            console.log(response.status);
            
        });

    $http({
        method: 'GET',
        url: "http://localhost:3000/uploads/img.jpg?imgNo="+encodeURIComponent(2)
    }).then(function successCallback(resp)
        {
            vm.imageRequest2 = "http://localhost:3000/uploads/img-2.jpg";
            console.log('Image Retreival Success !!');
        }, function errorCallback(response){
            console.log(response.status);
            
        });

    $http({
        method: 'GET',
        url: "http://localhost:3000/uploads/img.jpg?imgNo="+encodeURIComponent(3)    
    }).then(function successCallback(resp)
        {
            vm.imageRequest3 = "http://localhost:3000/uploads/img-3.jpg";
            console.log('Image Retreival Success !!');
        }, function errorCallback(response){
            console.log(response.status);
            
        });

        vm.slides = [
            {
                image: "http://localhost:3000/uploads/img-1.jpg"
            },
            {
                image: "http://localhost:3000/uploads/img-2.jpg"
            },
            {
                image: "http://localhost:3000/uploads/img-3.jpg"
            },
            {
                image: "http://localhost:3000/uploads/img-1.jpg"
            }
        ];

        

   vm.videoSRC = "http://localhost:3000/uploads/vid.mp4?t="+ temp;
}]);
    
