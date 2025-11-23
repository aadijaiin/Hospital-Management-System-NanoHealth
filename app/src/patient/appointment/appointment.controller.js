hms.controller('appointmentController', ['$rootScope','$scope', '$http', '$state', 'baseUrl', function ($rootScope,$scope, $http, $state, baseUrl) {
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
    if(!$rootScope.user && !localStorage.getItem('user')){
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            $rootScope.user = res.data;
            localStorage.setItem('user', JSON.stringify(res.data));

        }).catch(function (e) {
            console.log(e);
        })
    }
    else if(!$rootScope.user && localStorage.getItem('user')){
        $scope.user = JSON.parse(localStorage.getItem('user'));
    }
    $scope.getDoctors = function () {
        console.log('getting the list of doctors')
        $http.get(`${baseUrl.url}/${baseUrl.patient.getDoctors}`).then(function (res) {
            console.log(res);
            $scope.doctors = res.data;
        }).catch(function (e) {
            console.log(e);
        })
    }

    $scope.getDoctors();

    $scope.bookAppointment = function () {
        const appointmentForm = new FormData(document.getElementById('appointmentForm'));
        // const date = {
        //     date : appointmentForm.get('slot').split('T')[0]
        // }
        // const time = {
        //     time : appointmentForm.get('slot').split('T')[1]
        // }
        $scope.date = appointmentForm.get('slot').split('T')[0];
        $scope.time = appointmentForm.get('slot').split('T')[1];
        appointmentForm.append('date', appointmentForm.get('slot').split('T')[0]);
        appointmentForm.append('time', appointmentForm.get('slot').split('T')[1]);
        console.log(...appointmentForm.entries());
        $http({
            method: 'POST',
            url: `${baseUrl.url}/${baseUrl.patient.bookAppointment}`,
            data: appointmentForm,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (res) {
            console.log(res);
            appointmentForm.reset();
            Toast.fire({
                icon: "success",
                title: res.data.msg
            });
        }).catch(function (e) {
            console.log(e);
        })
    }

    $scope.getAppointments = function () {
        $http.get(`${baseUrl.url}/${baseUrl.patient.bookAppointment}`).then(function(res){
            console.log(res);
        }).catch(function(e){
            console.log(e);
        })
    }
    $scope.getAppointments();
}]);