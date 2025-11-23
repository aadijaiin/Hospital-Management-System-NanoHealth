

hms.controller('homeController', ['$scope', '$http', '$state', 'baseUrl', function ($scope, $http, $state, baseUrl) {

    console.log('home controller')
    console.log('fetching user...')
    $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function(res){
        console.log(res);
        $scope.user = res.data;
    }).catch(function(e){
        console.log(e);
    })
}]);