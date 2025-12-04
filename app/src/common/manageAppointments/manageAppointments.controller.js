

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

    $scope.today = new Date().toLocaleDateString('sv-SE');

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
    $scope.editAppointmentStatus = function (id, status) {
        console.log(id, typeof id);
        console.log('status : ',status)
        $scope.idToEdit = id;
    }

    $scope.updateAppoinmentStatus = function () {
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
    $scope.numberOfTests = [1];
    $scope.prescribeHelper = function(id) {
        $scope.idToPrescribe = id;
    }
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
    $scope.incrementNumberOfTests = function () {
        $scope.numberOfTests.push(1);

    }

    $scope.prescribe = function () {
        let form = new FormData(document.getElementById('prescriptionForm'));
        form.append('id', $scope.idToPrescribe);
        $http({
            method: 'POST',
            data: form,
            url: `${baseUrl.url}/${baseUrl.doctor.prescribe}`,
            headers: {
                'Content-Type' : undefined
            }
        }).then(function(res){
            console.log(res);
        }).catch(function(e){
            console.log(e);
        })
    }



}]);