

hms.controller('doctorRegisterController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

    $scope.showPassState = 'Show'
    $scope.showHidePass = function () {
        document.getElementById('password').type = $scope.showPassState === 'Show' ? 'text' : 'password';
        $scope.showPassState = $scope.showPassState === 'Show' ? 'Hide' : 'Show';
    }
    $scope.showPassStateForConfirm = 'Show'
    $scope.showHidePassForConfirm = function () {
        document.getElementById('confirmPassword').type = $scope.showPassStateForConfirm === 'Show' ? 'text' : 'password';
        $scope.showPassStateForConfirm = $scope.showPassStateForConfirm === 'Show' ? 'Hide' : 'Show';
    }
    $scope.today = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()).toLocaleDateString('sv-SE');
    $scope.thatDay = new Date(new Date().getFullYear() - 60, new Date().getMonth(), new Date().getDate()).toLocaleDateString('sv-SE');
    // $scope.loaderVisible = false;
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


    function fileValidation(fileInput) {
        var filePath = fileInput.value;
        var allowedExtensions =
            /(\.jpg|\.jpeg|\.png)$/i;

        if (!allowedExtensions.exec(filePath)) {
            Toast.fire({
                icon: "error",
                title: "Missing or invalid profile image!"
            });
            fileInput.value = '';
            return false;
        }
        else {
            if (fileInput.files && fileInput.files[0]) {
                return true;
            };
        }
    }

    $scope.register = function () {
        console.log('submit called');
        const formdata = new FormData(document.getElementById('form'))
        if (formdata.get('password') != formdata.get('confirm_password')) {
            Toast.fire({
                icon: "error",
                title: "Passwords do not match!"
            });
            return;
        }
        if (!formdata.get('phone_no')) {
            Toast.fire({
                icon: "error",
                title: 'Please enter a valid phone number!'
            });
            return;
        }
        if (!formdata.get('gender')) {
            Toast.fire({
                icon: "error",
                title: 'Please choose a valid gender!'
            });
            return;
        }
        console.log(typeof Number(formdata.get('experience')), Number(formdata.get('experience')))
        console.log(typeof new Date(formdata.get('dob')).getFullYear(), new Date(formdata.get('dob')).getFullYear())
        if (Number(formdata.get('experience')) > new Date().getFullYear() - new Date(formdata.get('dob')).getFullYear()) {
            Toast.fire({
                icon: "error",
                title: 'Your age does not approve your experience!'
            });
            return;
        }
        if (fileValidation(document.getElementById('formFile'))) {
            console.log('formData: ', Array.from(formdata))
            $http({
                method: 'POST',
                // url: `${baseUrl.url}/${baseUrl.auth.register}?role=doctor`,
                url: `https://10.21.96.123:8000/auth/register?role=doctor`,
                data: formdata,
                headers: { 'Content-Type': undefined },
            }).then(function (res) {
                console.log('result: ', res.status);
                if (res.status == 201) {
                    Toast.fire({
                        icon: "success",
                        title: " User registered successfully!"
                    });
                    $state.go('login');
                }

                $http({
                    method: 'POST',
                    // url: `${baseUrl.url}/${baseUrl.auth.login}`,
                    url: `https://10.21.96.123:8000/auth/login/`,
                    data: {
                        email: formdata.get('email'),
                        password: formdata.get('password')
                    },
                    headers: { 'Content-Type': 'application/json' },
                }).then(function (res) {
                    console.log(res);
                }).catch(function (e) {
                    console.log(e);
                })


            }).catch(function (e) {

            });
        }
    }

    // $http.get(`${baseUrl.url}/${baseUrl.auth.dropdowns}`).then(function (res) {
    $http.get(`https://10.21.96.123:8000/auth/dropdowns/`).then(function (res) {
        console.log('result: ', res.data);
        $scope.genders = res.data.genders;
        $scope.specializations = res.data.specializations;
        $scope.qualifications = res.data.qualifications;
    }).catch(function (e) {

    });

}]);