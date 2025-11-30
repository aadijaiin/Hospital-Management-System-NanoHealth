hms.constant('baseUrl', {
    url: "https://10.21.99.62:8000",
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
    receptionist: {
        data: 'reception/appointments_data/',
        updateStatus : 'reception/update_appointment'
    }, 
    doctor: {
        
    }
});