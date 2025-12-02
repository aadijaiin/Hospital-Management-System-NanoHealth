hms.controller('landingController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    $rootScope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            $scope.user = res.data;

        }).catch(function (e) {
            console.log(e);
            
        })
    }

    $scope.getUser();

    $scope.logout = function () {
        $http.delete(`${baseUrl.url}/${baseUrl.auth.logout}`).then(function(res) {
            Toast.fire({
                icon: 'success',
                text: res.data.msg
            });
            $rootScope.user = null;
            $state.go('landing')

        }).catch(function(e){
            console.log(e);
        })
    }
}]);