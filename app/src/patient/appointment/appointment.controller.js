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

    $scope.today = new Date().toLocaleDateString('sv-SE') + 'T' + new Date().toTimeString().slice(0,5);
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
        $rootScope.user = JSON.parse(localStorage.getItem('user'));
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
    $scope.docToVisit = function () {
        $scope.doctor = $scope.doctors.filter(function(d){
            return d.id == $scope.doc
        })[0];
    }
    $scope.timeOfVisit = function () {
        console.log($scope.datetime.toString().slice(0,15))
        $scope.date = $scope.datetime.toString().slice(0,15);
        $scope.time = $scope.datetime.toString().slice(16,21);
    }
    $scope.bookAppointment = function () {
        const appointmentForm = new FormData(document.getElementById('appointmentForm'));
        // $scope.date = appointmentForm.get('slot').split('T')[0];
        // $scope.time = appointmentForm.get('slot').split('T')[1];
        appointmentForm.append('date', appointmentForm.get('slot').split('T')[0]);
        appointmentForm.append('time', appointmentForm.get('slot').split('T')[1]);
        if(appointmentForm.get('reason_to_visit').trim().length < 2){
            Toast.fire({
                icon: "error",
                text: "Please enter a valid reason of visit!"
            })
            return;
        } else if (new Date($scope.date).getDate() - new Date().getDate() < 1){
            Toast.fire({
                icon: "error",
                text: "Appointment date must be valid!"
            })
            return;
        }
        console.log(new Date($scope.date).getDate())
        console.log(new Date().getDate());
        console.log('diff : ', new Date($scope.date).getDate() - new Date().getDate())
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

    // $scope.getAppointments = function () {
    //     $http.get(`${baseUrl.url}/${baseUrl.patient.bookAppointment}`).then(function(res){
    //         console.log(res);
    //     }).catch(function(e){
    //         console.log(e);
    //     })
    // }
    // $scope.getAppointments();
}]);