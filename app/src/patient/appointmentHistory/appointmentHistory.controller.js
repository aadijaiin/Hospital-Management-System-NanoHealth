
hms.controller('appointmentHistoryController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {

    $scope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            $rootScope.user = res.data;
            if(res.data.role != 'Pat'){
                $state.go('home');
            }
        }).catch(function (e) {
            console.log(e);
            $state.go('login');
        })
    }
    // if(!$rootScope.user){
        $scope.getUser();
    // }
    $scope.bigSideBar = true;
    $scope.showBigSideBar = function () {
        $scope.bigSideBar = true;
    }
    $scope.hideBigSideBar = function () {
        $scope.bigSideBar = false;
    }
    $rootScope.pfpBaseUrl = baseUrl.url

    console.log("getting appointment history...");

    $scope.getDoctors = function () {
        console.log('getting the list of doctors')
        $http.get(`${baseUrl.url}/${baseUrl.patient.getDoctors}`).then(function (res) {
            console.log(res);
            $scope.doctors = res.data;
            $scope.getAppointmentHistory();
        }).catch(function (e) {
            console.log(e);
        })
    }
    $scope.showReasonToCancel = function (reason) {
        Swal.fire({
            title: 'Reason for cancellation',
            text: reason,
            icon: "question"
        });
    }
    $scope.pastAppointments = [];
    $scope.upComingAppointments = [];
    $scope.todaysAppointments = [];
    $scope.getAppointmentHistory = function () {
        $http.get(`${baseUrl.url}/${baseUrl.patient.bookAppointment}`).then(function (res) {
            console.log(res);
            // $scope.appointments = res.data;
            for (let appointment of res.data) {
                appointment.appointment_time = appointment.appointment_time.slice(0,5)
                appointment.doctor = $scope.doctors.filter(function (doc) {
                    return doc.id === appointment.doctor_id;
                })[0];
                if(appointment.appointment_date < new Date().toLocaleDateString('sv-SE')) {
                    $scope.pastAppointments.push(appointment);
                } else if(appointment.appointment_date > new Date().toLocaleDateString('sv-SE')) {
                    $scope.upComingAppointments.push(appointment);
                } else {
                    $scope.todaysAppointments.push(appointment);
                }

            }
            console.log('after processing : ', res.data);
            console.log('after processing for past: ', $scope.pastAppointments);
            console.log('after processing for upComing : ', $scope.upComingAppointments);
            $scope.appointments = res.data;

        }).catch(function (e) {
            console.log(e);
        })
    }

    $scope.getDoctors();

}]);