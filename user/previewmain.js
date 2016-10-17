angular.module('previewModule', ['ngSanitize', 'ui.bootstrap'])

.controller('previewCtrl', ['$sce','$http', function($sce, $http){ 
    var vm = this;
    var temp = Math.floor((Math.random() * 100) + 1);
    vm.imageArray = new Array();
     

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

        $http({
        method: 'GET',
        url: 'http://localhost:3000/getImageAddress'
    }).then(function successCallback(response)
        {
            //vm.imageArray = response.data.split(',');
            vm.imageArray = response.data;
        }, function errorCallback(error)
        {
            console.log('error');
        });

    vm.videoSRC = "http://localhost:3000/uploads/vid.mp4?t="+ temp;
}]);
    
