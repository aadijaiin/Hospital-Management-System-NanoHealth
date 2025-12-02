

hms.controller('homeController', ['$rootScope','$scope', '$http', '$state', 'baseUrl', function ($rootScope,$scope, $http, $state, baseUrl) {
    if(!$rootScope.user && !localStorage.getItem('user')){
        //get user function
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            $rootScope.user = res.data;
            localStorage.setItem('user', JSON.stringify(res.data));

        }).catch(function (e) {
            console.log(e);
            Toast.fire({
                icon : 'error',
                text : e.data.error
            })
            $state.go('login')
        })
    }
    else if(!$rootScope.user && localStorage.getItem('user')){
        $scope.user = JSON.parse(localStorage.getItem('user'));
    }
    $scope.pfpBaseUrl = baseUrl.url;

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