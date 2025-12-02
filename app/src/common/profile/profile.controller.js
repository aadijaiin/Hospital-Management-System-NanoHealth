

hms.controller('profileController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {
    // if(!$rootScope.user && !localStorage.getItem('user')){
    //     //get user function
    //     $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
    //         console.log(res);
    //         $rootScope.user = res.data;
    //         localStorage.setItem('user', JSON.stringify(res.data));

    //     }).catch(function (e) {
    //         console.log(e);
    //     })
    // }
    // else if(!$rootScope.user && localStorage.getItem('user')){
    //     $scope.user = JSON.parse(localStorage.getItem('user'));
    // }
    

    $scope.logout = function () {
        $http.delete(`${baseUrl.url}/${baseUrl.auth.logout}`).then(function (res) {
            Toast.fire({
                icon: 'success',
                text: res.data.msg
            });
            $rootScope.user = null;
            $state.go('landing')

        }).catch(function (e) {
            console.log(e);
        })
    }

}]);