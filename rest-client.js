/* const vue = Vue.createApp({
    data() {
        return {
            barberInModal: {name: null},
            barbers: []
        }
    },
    async created() {
        this.barbers = await (await fetch('http://localhost:8080/barbers')).json();
    },
    methods: {
        getbarber: async function (id) {
            this.barberInModal = await (await fetch(`http://localhost:8080/barbers/${id}`)).json();
            let barberInfoModal = new bootstrap.Modal(document.getElementById('barberInfoModal'), {})
            barberInfoModal.show();
        }
        
    }
}).mount('#app')	 */

const vue = Vue.createApp({
    data() {
        return {
            barberInModal: {name: null},
            barbers: []
        }
    },
    async created() {
        this.barbers = await (await fetch('http://localhost:8080/barbers')).json();
    },
    methods: {
        getbarber: async function (id) {
            this.barberInModal = await (await fetch(`http://localhost:8080/barbers/${id}`)).json();
            let barberInfoModal = new bootstrap.Modal(document.getElementById('barberInfoModal'), {})
            barberInfoModal.show();
        }
        
    }
}).mount('#app')