
const vue = Vue.createApp({
    data() {
        return {
            barberInModal: {name: null},
            barbers: [],
            customerInModal: {name: null},
            customers: [],
            bookingInModal: {name: null},
            bookings: []
        }
    },
    async created() {
        this.barbers = await (await fetch('http://localhost:8080/barbers')).json();
        this.customers = await (await fetch('http://localhost:8080/customers')).json();
        this.bookings = await (await fetch('http://localhost:8080/bookings')).json();
    },
    methods: {
        getbarber: async function (id) {
            this.barberInModal = await (await fetch(`http://localhost:8080/barbers/${id}`)).json();
            let barberInfoModal = new bootstrap.Modal(document.getElementById('barberInfoModal'), {})
            barberInfoModal.show();
        },
        getCustomer: async function(id){
            this.customerInModal = await (await fetch(`http://localhost:8080/customers/${id}`)).json();
            let customerInfoModal = new bootstrap.Modal(document.getElementById('customerInfoModal'),{})
            customerInfoModal.show();
        },
        getBooking: async function(id){
            this.bookingInModal = await (await fetch(`http://localhost:8080/bookings/${id}`)).json();
            let bookingInfoModal = new bootstrap.Modal(document.getElementById('bookingInfoModal'),{})
            bookingInfoModal.show();
        },
        
    }
}).mount('#app')