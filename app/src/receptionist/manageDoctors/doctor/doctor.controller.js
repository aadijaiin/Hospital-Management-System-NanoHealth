
hms.controller('doctorFullViewController', ['$rootScope','$scope', '$http', '$state', 'baseUrl', function ($rootScope,$scope, $http, $state, baseUrl) {

    $rootScope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            if(res.data.role != 'Rec'){
                $state.go('home');
            }
            $scope.user = res.data;
        }).catch(function (e) {
            console.log(e);
            $state.go('login');
        })
    }

    $scope.getUser();
    console.log($state.params)


    $scope.id = $state.params.id
    $scope.doctor = $state.params.doctor




}]);