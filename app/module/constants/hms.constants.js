hms.constant('baseUrl', {
    url: "https://10.21.99.181:8000",
    auth: {
        register: "auth/register",
        login: "auth/login/",
        dropdowns : "auth/dropdowns/",
        profile: "auth/profile/",
        logout: "auth/signOut/",
        navbar: 'auth/navbar'
    },
    patient: {
        getDoctors: 'patient/doctors/',
        bookAppointment: 'patient/book_appointment/',
    },
    receptionist: {
        data: 'reception/appointments_data/',
        updateStatus : 'reception/update_appointment',
        dashboard: 'reception/dashboard/'
    }, 
    doctor: {
        dashboard: 'doctor/dashboard/',
        prescribe: 'doctor/prescribe/'
    }
});