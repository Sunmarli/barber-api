
const vue = Vue.createApp({
    data() {
        return {
            barberInModal: {name: null},
            barbers: [],
            customerInModal: {name: null},
            customer: []
        }
    },
    async created() {
        this.barbers = await (await fetch('http://localhost:8080/barbers')).json();
        this.customer = await (await fetch('http://localhost:8080/customer')).json();
    },
    methods: {
        getbarber: async function (id) {
            this.barberInModal = await (await fetch(`http://localhost:8080/barbers/${id}`)).json();
            let barberInfoModal = new bootstrap.Modal(document.getElementById('barberInfoModal'), {})
            barberInfoModal.show();
        },
        getCustomer: async function(id){
            this.customerInModal = await (await fetch(`http://localhost:8080/customer/${id}`)).json();
            let customerInfoModal = new bootstrap.Modal(document.getElementById('customerInfoModal'),{})
            customerInfoModal.show();
        },
        
    }
}).mount('#app')