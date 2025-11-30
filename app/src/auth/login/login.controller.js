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
    $rootScope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            $rootScope.user = res.data;
            localStorage.setItem('user', JSON.stringify(res.data));

        }).catch(function (e) {
            console.log(e);
        })
    }

    if(localStorage.getItem('user') || $rootScope.user){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user.role == 'Patient'){
            $state.go('home');
        } else if (user.role == 'Doctor'){
            $state.go('doctor');
        } else if (user.role ='Receptionist'){
            $state.go('receptionist');
        }
    }
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
            Toast.fire({
                icon : 'success', 
                text : res.data.msg
            })
            $rootScope.getUser()
            if(res.data.role == 'Patient') $state.go('home');
            else if (res.data.role == 'Doctor') $state.go('doctor');
            else if (res.data.role == 'Receptionist') $state.go('receptionist');

        }).catch(function (e) {
            console.log('error: ', e);
        });
    }
}]);