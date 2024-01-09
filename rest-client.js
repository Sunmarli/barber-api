const vue = Vue.createApp({
    data() {
        return { 
            barbers: [  { id: 1, name: "John Wick", working_day: "Monday", specialization: "Haircuts" },],
            barberInModal: { id: 1,
                name: "John Wick",
                specialization: "Haircuts",}, 
        }
},
async created() {
    this.barbers = await (await fetch('http://localhost:8081/barbers')).json();
},
methods: {
    getBarber: async function(id) {
        this.barberInModal = await (await fetch(`http://localhost:8081/barbers/${id}`)).json();
        let barberInfoModal = new bootstrap.Modal(document.getElementById('barberInfoModal'), {})
        barberInfoModal.show();
    }
}
}).mount('#app')