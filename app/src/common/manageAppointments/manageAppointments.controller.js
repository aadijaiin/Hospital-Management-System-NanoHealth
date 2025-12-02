

hms.controller('manageAppointmentsController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {
    $rootScope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            if (!(res.data.role == 'Rec' || res.data.role == 'Doc')) {
                $state.go('home');
            }
            $scope.user = res.data;
            $scope.getData();
        }).catch(function (e) {
            console.log(e);
            $state.go('login');
        })
    }

    $scope.getUser();

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

    $scope.pfpBaseUrl = baseUrl.url;
    $scope.getData = function () {
        if ($scope.user.role == 'Rec') {
            $http.get(`${baseUrl.url}/${baseUrl.receptionist.data}`).then(function (res) {
                console.log(res.data);
                $scope.appointments = res.data.appointment_data;
                $scope.doctors = res.data.doctor_data;
                $scope.patients = res.data.patient_data;

                // for (let appointment of $scope.appointments) {
                //     let doctor = $scope.doctors.filter(function (doctor) {
                //         return doctor.id === appointment.doctor_id;
                //     })[0]

                //     let patient = $scope.patients.filter(function (patient) {
                //         return patient.id === appointment.patient_id;
                //     })[0]

                //     patient.age = new Date().getFullYear() - new Date(patient.D_O_B).getFullYear();

                //     appointment['doctor'] = doctor;
                //     appointment['patient'] = patient;
                // }

                // for (let doctor of $scope.doctors) {
                //     let temp = $scope.appointments.filter(function (appointment) {
                //         return appointment.doctor_id === doctor.id;
                //     });
                //     doctor['patients'] = [];
                //     let ids = [];
                //     for (let t of temp) {
                //         if (!ids.includes(t.patient.id)) {
                //             doctor['patients'].push(t.patient);
                //             ids.push(t.patient.id);
                //         }

                //     }
                //     console.log('ids ', ids);
                // }

                // console.log($scope.doctors)
                // // console.log($scope.patients)
                // console.log($scope.appointments);
            })
        } else if ($scope.user.role == 'Doc') {
            $http.get(`${baseUrl.url}/${baseUrl.receptionist.data}`).then(function (res) {
                console.log(res.data);
                $scope.appointments = res.data;
            }).catch(function (e) {
                console.log(e);
            })
        }
    }

    $scope.showReasonToVisit = function (reason) {
        Swal.fire({
            title: 'Reason to visit',
            text: reason,
            icon: "question"
        });
    }


    $scope.showReasonToCancel = function (reason) {
        Swal.fire({
            title: 'Reason for cancellation',
            text: reason,
            icon: "question"
        });
    }
    $scope.editAppointmentStatus = function (id) {
        console.log(id, typeof id);
        $scope.idToEdit = id;
    }

    $scope.updateAppoinmentStatus = function () {
        // let form = new FormData(document.getElementById('updateAppoinmentStatusForm'));
        if ($scope.accepted == '1' && (!$scope.reason_for_cancel || $scope.reason_for_cancel.trim().length <= 2)) {
            Toast.fire({
                icon: 'error',
                text: 'Please provide a valid reason for rejection.'
            })
            return;
        }


        $http({
            method: 'PUT',
            url: `${baseUrl.url}/${baseUrl.receptionist.updateStatus}`,
            data: {
                id: $scope.idToEdit,
                accepted: $scope.accepted == '0' ? true : false,
                reason_for_cancel: $scope.reason_for_cancel
            },
            headers: { 'Content-Type': undefined },
        }).then(function (res) {
            myModal.hide();
            console.log(res);
            Toast.fire({
                icon: 'success',
                text: res.data.msg
            })
            document.getElementById('updateAppoinmentStatusForm').reset();
            $scope.getData();
            $scope.accepted = '';
            $scope.reason_for_cancel = '';
        }).catch(function (e) {
            myModal.hide();
            console.log(e);
            $scope.accepted = '';
            $scope.reason_for_cancel = '';
        })

    }
    $scope.numberOfMedicines = [1];

    const myModal = new bootstrap.Modal('#exampleModal')
    // const prescriptionModal = new bootstrap.Modal('#prescriptionModal')
    // const prescriptionModal = document.getElementById('prescriptionModal')
    // prescriptionModal.addEventListener('hidden.bs.modal', function (event) {
    //     console.log($scope.numberOfMedicines);
    //     console.log(
    //         'fired...'
    //     )
    //     $scope.numberOfMedicines = [1];
    //     console.log($scope.numberOfMedicines);
    // })

    $scope.incrementNumberOfMedicines = function () {
        $scope.numberOfMedicines.push(1);
    }



}]);