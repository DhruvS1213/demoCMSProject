angular.module('fileDownload', ['ngSanitize'])
.controller('uvCtrl', ['$sce','$http', function($sce, $http){ 
    var vm = this;
    var temp = Math.floor((Math.random() * 100) + 1);
    console.log('user-view controller');
    
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

    vm.imageRequest1 = "http://localhost:3000/uploads/img.jpg";
    vm.imageRequest2 = "http://localhost:3000/uploads/img.jpg";
    vm.imageRequest3 = "http://localhost:3000/uploads/img.jpg";
    
    vm.videoSRC = "http://localhost:3000/uploads/vid.mp4?t="+ temp;

}])
    





