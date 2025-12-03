
hms.controller('patientFullViewController', ['$rootScope','$scope', '$http', '$state', 'baseUrl', function ($rootScope,$scope, $http, $state, baseUrl) {
    if(!$rootScope.user && !localStorage.getItem('user')){
        //get user function
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

    $scope.pfpBaseUrl = baseUrl.url;

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
    console.log($state.params)
    if(!$state.params.patient){
        $state.go('receptionist.managePatients');
    }

    $scope.patient = $state.params.patient



}]);