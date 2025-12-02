hms.controller('appointmentController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {
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

    $scope.slots = [
        {
            slot: "8:00 - 9:00",
            time: "08:00"
        },
        {
            slot: "9:00 - 10:00",
            time: "09:00"
        },
        {
            slot: "10:00 - 11:00",
            time: "10:00"
        },
        {
            slot: "11:00 - 12:00",
            time: "11:00"
        },
        {
            slot: "12:00 - 13:00",
            time: "12:00"
        },
        {
            slot: "13:00 - 14:00",
            time: "13:00"
        },
        {
            slot: "14:00 - 15:00",
            time: "14:00"
        },
        {
            slot: "15:00 - 16:00",
            time: "15:00"
        },
        {
            slot: "16:00 - 17:00",
            time: "16:00"
        },
        {
            slot: "17:00 - 18:00",
            time: "17:00"
        },
        {
            slot: "18:00 - 19:00",
            time: "18:00"
        },
        {
            slot: "19:00 - 20:00",
            time: "19:00"
        }
    ]

    $scope.today = new Date().toLocaleDateString('sv-SE');

    $scope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            $rootScope.user = res.data;
            if (res.data.role != 'Pat') {
                $state.go('home');
            }
        }).catch(function (e) {
            console.log(e);
            $state.go('login');
        })
    }
    $scope.getUser();
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
        $scope.doctor = $scope.doctors.filter(function (d) {
            return d.id == $scope.doc
        })[0];
    }
    // $scope.timeOfVisit = function () {
    //     console.log($scope.datetime.toString().slice(0, 15))
    //     $scope.date = $scope.datetime.toString().slice(0, 15);
    //     $scope.time = $scope.datetime.toString().slice(16, 21);
    // }
    $scope.bookAppointment = function () {
        let appointmentForm = new FormData(document.getElementById('appointmentForm'));
        if (appointmentForm.get('reason_to_visit').trim().length < 2) {
            Toast.fire({
                icon: "error",
                text: "Please enter a valid reason to visit!"
            })
            return;
        }
        $http({
            method: 'POST',
            url: `${baseUrl.url}/${baseUrl.patient.bookAppointment}`,
            data: appointmentForm,
            headers: {
                'Content-Type': undefined
            }
        }).then(function (res) {
            console.log(res);
            document.getElementById('appointmentForm').reset();
            Toast.fire({
                icon: "success",
                title: res.data.msg
            });
        }).catch(function (e) {
            console.log(e);
        })
    }

}]);