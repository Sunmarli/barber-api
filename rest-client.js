
const vue = Vue.createApp({
    data() {
        return {
            barberInModal: {name: null},
            barbers: [],
            customerInModal: {name: null},
            customers: [],
            bookingInModal: {name: null},
            bookings: [],
            newBarber: {
                name: '',
                working_day: '',
                specialization: ''
            }

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
        async addNewBarber() {
            try {
                // Send a POST request to your server with the new barber data
                const response = await fetch('http://localhost:8080/barbers/createNew', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.newBarber),
                });

                if (response.ok) {
                    // If the request is successful, you might want to do something (e.g., clear the form)
                    this.newBarber = {
                        name: '',
                        working_day: '',
                        specialization: ''
                    };
                } else {
                    // Handle errors if the request is not successful
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            }
        }    
    }
}).mount('#app')