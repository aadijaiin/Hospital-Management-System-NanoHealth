

hms.controller('appointmentController', ['$scope', '$http', '$state', 'baseUrl', function ($scope, $http, $state, baseUrl) {

    // console.log('home controller')
    console.log('fetching user...')
    $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function(res){
        console.log(res);
        $scope.user = res.data;
    }).catch(function(e){
        console.log(e);
    })

    $scope.getDoctors = function () {
        console.log('getting the list of doctors')
        $http.get(`${baseUrl.url}/${baseUrl.patient.getDoctors}`).then(function(res){
            console.log(res);
            $scope.doctors = res.data;
        }).catch(function(e){
            console.log(e);
        })
    }

    $scope.getDoctors();


    $scope.bookAppointment = function () {
        const appointmentForm = new FormData(document.getElementById('appointmentForm'));
        console.log(...appointmentForm.entries());
    }
}]);