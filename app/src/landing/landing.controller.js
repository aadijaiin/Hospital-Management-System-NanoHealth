hms.controller('landingController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {
    if(localStorage.getItem('user')){
        $scope.user = JSON.parse(localStorage.getItem('user'));
    }
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
            if($rootScope.user) {
                $rootScope.user = null;
            } 
            if(localStorage.getItem('user')){
                localStorage.removeItem('user');
            }
            // $state.go('landing')
            $scope.user = null;

        }).catch(function(e){
            console.log(e);
        })
    }
}]);