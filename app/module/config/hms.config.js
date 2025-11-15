angular.module('hms').config(function ($stateProvider, $httpProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    let landingState = {
        name: 'landing',
        url: '/',
        templateUrl: 'app/src/landing/landing.html'
    }

    let patientRegistrationState = {
        name : 'patientRegistration',
        url: '/register-patient',
        templateUrl : 'app/src/auth/patient/register.html'
    }

    let doctorRegistrationState = {
        name : 'doctorRegistration',
        url: '/register-doctor',
        templateUrl : 'app/src/auth/doctor/register.html'
    }

    let loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'app/src/auth/login/login.html'
    }
    $stateProvider.state(landingState);
    $stateProvider.state(patientRegistrationState);
    $stateProvider.state(doctorRegistrationState);
    $stateProvider.state(loginState);

})