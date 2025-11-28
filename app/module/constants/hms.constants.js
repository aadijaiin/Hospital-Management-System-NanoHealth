hms.constant('baseUrl', {
    url: "https://10.21.97.46:8000",
    auth: {
        register: "auth/register",
        login: "auth/login/",
        dropdowns : "auth/dropdowns/",
        profile: "auth/profile/",
    },
    patient: {
        getDoctors: 'patient/doctors/',
        bookAppointment: 'patient/bookAppointment/',
    },
});