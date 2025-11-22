hms.controller('loginController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {
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
    $scope.showPassState = 'Show'
    $scope.showHidePass = function () {
        document.getElementById('password').type = $scope.showPassState === 'Show' ? 'text' : 'password';
        $scope.showPassState = $scope.showPassState === 'Show' ? 'Hide' : 'Show';
    }
    // $scope.getUser = function () {
    //     $http({
    //         method: 'GET',
    //         url: `${baseUrl.url}/${baseUrl.account.profile}`,
    //     }).then(function (res) {
    //         console.log('inside then...')
    //         if(res.data.is_staff){
    //             $state.go('admin')
    //         }
    //         else $state.go('home')

    //     }).catch(function (e) {
    //         console.log('Server Unreachable')

    //     })
    // }
    // $scope.getUser();
    $scope.login = function () {
        console.log('login called')
        $scope.user = {
            email: $scope.email,
            password: $scope.password,
        }
        $http({
            method: 'POST',
            url: `${baseUrl.url}/${baseUrl.auth.login}`,
            data: $scope.user,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (res) {
            // if(res.data.isAdmin){
            //     $state.go('admin');
            // }else{
            // }
            $state.go('home')
            Toast.fire({
                icon: "success",
                title: res.data.msg || "Signed in successfully!"
            });


        }).catch(function (e) {
            console.log('error: ', e);
        });
    }
}]);