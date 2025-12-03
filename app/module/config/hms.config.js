myInterceptor.$inject = ['$q', 'loaderService'];
function myInterceptor ($q, loaderService) {
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
    var count = 0;
    return {
        request: function (request) {
            request['withCredentials'] = true;
            if (count == 0) loaderService.show();
            count++;
            return request;
        },

        requestError: function (error) {
            count--;
            if (count == 0) {
                loaderService.hide();
            }
            return $q.reject(error);
        },

        response: function (result) {
            count--;
            if (count == 0) {
                loaderService.hide();
            }
            return result;
        },

        responseError: function (error) {
            count--;
            if (count == 0) {
                loaderService.hide();
            }
            if (!error.config.url.endsWith('profile/')) {
                Toast.fire({
                    icon: "error",
                    title: error.data ? (error.data.error ? error.data.error : "Something went wrong, Please try again!") : 'Something went wrong, Please try again!'
                });
            }
            return $q.reject(error);
        }

    };
}

hms.factory('myInterceptor', myInterceptor);
hms.config(function ($stateProvider, $httpProvider, $locationProvider) {
    
    $locationProvider.hashPrefix('');
    $httpProvider.interceptors.push('myInterceptor');

    let landingState = {
        name: 'landing',
        url: '/',
        templateUrl: 'app/src/landing/landing.html',
        controller : "landingController"
    }

    let patientRegistrationState = {
        name: 'patientRegistration',
        url: '/register-patient',
        templateUrl: 'app/src/auth/register/patient/register.html',
        controller: 'patientRegisterController'
    }

    let doctorRegistrationState = {
        name: 'doctorRegistration',
        url: '/register-doctor',
        templateUrl: 'app/src/auth/register/doctor/register.html',
        controller: 'doctorRegisterController'
    }

    let loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'app/src/auth/login/login.html',
        controller: 'loginController'
    }

    let appointmentState = {
        name : 'home.appointment', 
        url: '/book-appointment',
        templateUrl: 'app/src/patient/appointment/appointment.html',
        controller: 'appointmentController'
    }

    let appointmentHistoryState = {
        name : 'home.appointmentHistory',
        url : '/appointment-history',
        templateUrl: 'app/src/patient/appointmentHistory/appointmentHistory.html',
        controller: 'appointmentHistoryController'
    }

    let manageAppointmentsState = {
        name : 'home.manageAppointments',
        url : '/manage-appointments',
        templateUrl : 'app/src/common/manageAppointments/manageAppointments.html',
        controller : 'manageAppointmentsController'
    }

    let manageDoctorsState = {
        name : 'home.manageDoctors',
        url : '/manage-doctors',
        templateUrl : 'app/src/receptionist/manageDoctors/manageDoctors.html',
        controller : 'manageDoctorsController'
    }

    let managePatientsState = {
        name : 'home.managePatients',
        url : '/manage-patients',
        templateUrl : 'app/src/receptionist/managePatients/managePatients.html',
        controller : 'managePatientsController'
    }

    let doctorFullViewState = {
        name : 'home.manageDoctors.doctor',
        url : '/doctor',
        templateUrl : 'app/src/receptionist/manageDoctors/doctor/doctor.html',
        controller: 'doctorFullViewController',
        params : {
            doctor : null,
        }
    }

    let notFoundState = {
        name: 'otherwise',
        url: '*path',
        templateUrl : 'app/src/common/404/404.html'
    }

    let profileState = {
        name : 'profile',
        url : '/profile',
        templateUrl : 'app/src/common/profile/profile.html',
        controller : 'profileController'
    }

    let patientFullViewState = {
        name: 'home.managePatients.patient',
        url: '/patient',
        templateUrl: 'app/src/receptionist/managePatients/patient/patient.html',
        controller: 'patientFullViewController',
        params : {
            patient : null,
        }
    }

    let homeState = {
        name: 'home',
        url : '/home',
        templateUrl:'app/src/common/home/home.html',
        controller: 'reportController'
    }

    $stateProvider.state(landingState);
    $stateProvider.state(patientRegistrationState);
    $stateProvider.state(doctorRegistrationState);
    $stateProvider.state(loginState);
    $stateProvider.state(homeState);
    $stateProvider.state(appointmentState);
    $stateProvider.state(appointmentHistoryState);
    $stateProvider.state(manageAppointmentsState);
    $stateProvider.state(manageDoctorsState);
    $stateProvider.state(managePatientsState);
    $stateProvider.state(doctorFullViewState);
    $stateProvider.state(notFoundState);
    $stateProvider.state(profileState);
    $stateProvider.state(patientFullViewState);

})