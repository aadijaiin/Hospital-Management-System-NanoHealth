
const myInterceptor = function ($q) {
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
    // var count = 0;
    return {
        request: function (request) {
            request['withCredentials'] = true;
            // if (!request.url.endsWith('profile/')) loaderService.show();
            // count++;
            return request;
        },

        requestError: function (error) {
            // count--;
            // if (count == 0) {
            //     loaderService.hide();
            // }
            return $q.reject(error);
        },

        response: function (result) {
            // count--;
            // if (count == 0) {
            //     loaderService.hide();
            // }
            // loaderService.hide();
            return result;
        },

        responseError: function (error) {
            // count--;
            // if (count == 0) {
            //     loaderService.hide();
            // }
            // loaderService.hide();
            if (!error.config.url.endsWith('profile/')) {
                Toast.fire({
                    icon: "error",
                    title: error.data ? (error.data.error ? error.data.error : "Something went wrong, Please try again!") : 'Something went wrong, Please try again!'
                });
            }
            return $q.reject(error);
        }

    };
};


hms.config(function ($stateProvider, $httpProvider, $locationProvider) {
    
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push(myInterceptor);

    let landingState = {
        name: 'landing',
        url: '/',
        templateUrl: 'app/src/landing/landing.html'
    }

    let patientRegistrationState = {
        name: 'patientRegistration',
        url: '/register-patient',
        templateUrl: 'app/src/auth/patient/register.html',
        controller: 'patientRegisterController'
    }

    let doctorRegistrationState = {
        name: 'doctorRegistration',
        url: '/register-doctor',
        templateUrl: 'app/src/auth/doctor/register.html',
        controller: 'doctorRegisterController'
    }

    let loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'app/src/auth/login/login.html',
        controller: 'loginController'
    }

    let homeState = {
        name : 'home', 
        url: '/home',
        templateUrl: 'app/src/patient/home.html',
        controller: 'homeController'
    }

    let appointmentState = {
        name : 'appointment', 
        url: '/book-appointment',
        templateUrl: 'app/src/patient/appointment/appointment.html',
        controller: 'appointmentController'
    }

    let appointmentHistoryState = {
        name : 'appointmentHistory',
        url : '/appointment-history',
        templateUrl: 'app/src/patient/appointmentHistory/appointmentHistory.html'
    }

    $stateProvider.state(landingState);
    $stateProvider.state(patientRegistrationState);
    $stateProvider.state(doctorRegistrationState);
    $stateProvider.state(loginState);
    $stateProvider.state(homeState);
    $stateProvider.state(appointmentState);
    $stateProvider.state(appointmentHistoryState);

})