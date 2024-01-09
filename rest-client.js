const vue = Vue.createApp({
    data() {
        
        return { 
            barbers: [ 
                { id: 1, name: "John Wick", working_day: "Monday", specialization: "Haircuts" },
                { id: 2, name: "Will Smith", working_day: "Tuesday", specialization: "Beard Trims" },
                { id: 3, name: "Siim Tamm", working_day: "Wednesday", specialization: "Coloring" },
                { id: 4, name: "Marko Polo", working_day: "Thursday", specialization: "Haircuts" },
                { id: 5, name: "Basim Muhha", working_day: "Friday", specialization: "Hair Styling" },
                { id: 6, name: "Kerli Ostrov", working_day: "Saturday", specialization: "Facial Treatments" },
                { id: 7, name: "Siim Kallas", working_day: "Sunday", specialization: "Haircuts" }],
            barberInModal: {name: null}, 
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