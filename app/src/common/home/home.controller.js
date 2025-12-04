hms.controller('reportController', ['$rootScope', '$scope', '$http', '$state', 'baseUrl', function ($rootScope, $scope, $http, $state, baseUrl) {
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
    $scope.bigSideBar = true;
    $scope.showBigSideBar = function () {
        $scope.bigSideBar = true;
    }
    $scope.hideBigSideBar = function () {
        $scope.bigSideBar = false;
    }
    $rootScope.pfpBaseUrl = baseUrl.url
    $scope.getSidebar = function (res) {
        $http.get(`${baseUrl.url}/${baseUrl.auth.navbar}`, {params: {
            role: res.data.role
        }}).then(function (result) {
            console.log(result.data)
            $scope.sidebar = result.data;
        }).catch(function (e) {
            console.log(e);
        })
    }

    $scope.logout = function () {
        Swal.fire({
            title: "Are you sure ?",
            // showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            confirmButtonText: `Log out`
        }).then((result) => {
            if (result.isConfirmed) {
                $http.delete(`${baseUrl.url}/${baseUrl.auth.logout}`).then(function (res) {
                    Toast.fire({
                        icon: 'success',
                        text: res.data.msg
                    });
                    $rootScope.user = null;
                    $state.go('landing')

                }).catch(function (e) {
                    console.log(e);
                })
                
            } else if (result.isDenied) {
                // Swal.fire("Changes are not saved", "", "info");
            }
        });
        // $http.delete(`${baseUrl.url}/${baseUrl.auth.logout}`).then(function (res) {
        //     Toast.fire({
        //         icon: 'success',
        //         text: res.data.msg
        //     });
        //     $rootScope.user = null;
        //     $state.go('landing')

        // }).catch(function (e) {
        //     console.log(e);
        // })
    }

    $scope.getDashboard = function () {
        $http.get(`${baseUrl.url}/${baseUrl.receptionist.dashboard}`).then(function (res) {
            console.log('dashboard res: ', res);
            $scope.labels = [];
            $scope.counts = [];
            for (let e of res.data.appointment) {
                $scope.labels.push(e.date)
                $scope.counts.push(e.count);
            }
        }).catch(function (e) {
            console.log(e);
        })
    }

    // $scope.getDashboard();



    // const ctx = document.getElementById('myChart')
    // console.log('ctx :', ctx)
    // new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: $scope.labels,
    //         datasets: [{
    //             label: '# of Votes',
    //             data: $scope.counts,
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // })


    $rootScope.getUser = function () {
        $http.get(`${baseUrl.url}/${baseUrl.auth.profile}`).then(function (res) {
            console.log(res);
            // $rootScope.user = res.data;
            // localStorage.setItem('user', JSON.stringify(res.data));
            $scope.user = res.data;
            $scope.getSidebar(res);

        }).catch(function (e) {
            console.log(e);
            $state.go('login');
        })
    }

    $scope.getUser();


}]);