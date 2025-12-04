hms.controller('profileController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {

    $rootScope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            $scope.user = res.data;
            $scope.getData();
        }).catch(function (e) {
            console.log(e);
            $state.go('login');
        })
    }

    $scope.getUser();

}]);