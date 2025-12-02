
hms.controller('manageDoctorsController', ['$rootScope','$scope', '$http', '$state', 'baseUrl', function ($rootScope,$scope, $http, $state, baseUrl) {
    $rootScope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            if(res.data.role != 'Rec'){
                $state.go('home');
            }
            $scope.user = res.data;
        }).catch(function (e) {
            console.log(e);
            $state.go('login');
        })
    }

    $scope.getUser();

    $scope.pfpBaseUrl = baseUrl.url;

    $scope.bigSideBar = true;
    $scope.showBigSideBar = function () {
        $scope.bigSideBar = true;
    }
    $scope.hideBigSideBar = function () {
        $scope.bigSideBar = false;
    }

    $scope.getData = function () {
        $http.get(`${baseUrl.url}/${baseUrl.receptionist.data}`).then(function (res) {
            console.log(res.data);
            $scope.appointments = res.data.appointment_data;
            $scope.doctors = res.data.doctor_data;
            $scope.patients = res.data.patient_data;

            for(let appointment of $scope.appointments) {
                let doctor = $scope.doctors.filter(function(doctor) {
                    return doctor.id === appointment.doctor_id;
                })[0]

                let patient = $scope.patients .filter(function(patient) {
                    return patient.id === appointment.patient_id;
                })[0]

                patient.age = new Date().getFullYear() - new Date(patient.D_O_B).getFullYear();
                appointment['doctor'] = doctor;
                appointment['patient'] = patient;
            }

            for (let doctor of $scope.doctors) {
                let temp = $scope.appointments.filter(function (appointment) {
                    return appointment.doctor_id === doctor.id;
                });
                doctor.age = new Date().getFullYear() - new Date(doctor.D_O_B).getFullYear();
                doctor['patients'] = [];
                let ids = [];
                for (let t of temp) {
                    if (!ids.includes(t.patient.id)) {
                        doctor['patients'].push(t.patient);
                        ids.push(t.patient.id);
                    }

                }
                console.log('ids ', ids);
            
            }
            for(let patient of $scope.patients) {
                patient.age = new Date().getFullYear() - new Date(patient.D_O_B).getFullYear();
            }

            console.log($scope.doctors)
            // console.log($scope.patients)
            console.log($scope.appointments);
        })
    }

    $scope.getData();




}]);