require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()
const mariadb = require("mariadb")
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json())
app.use(cors())
//const port = 8080
const port = process.env.PORT
app.use(cors());

app.use(express.json());

require("../routes/app_routes")(app)

app.get("/errors", async (req,res) => {
    res.statusCode(404).send({"error": "something went wrong"})
})

 app.get('/barbers/:id', (req, res) => {
    if (typeof barbers[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "barber not found"})
    }
    res.send(barbers[req.params.id - 1])
 })
 app.get('/customers/:id', (req, res) => {
    if (typeof customers[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "customer not found"})
    }
    res.send(customers[req.params.id - 1])
 })
 
 app.get('/bookings/:id', (req, res) => {
    if (typeof bookings[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "booking not found"})
    }
    res.send(bookings[req.params.id - 1])
 })
 

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.post('/barbers', (req,res) => {
    if(!req.body.name || !req.body.working_day || !req.body.specialization) {
        return res.status(400).send({error: "One or all parameters that are required is missing"})
    }
    let barber = {
        id: barbers.length +1,
        name: req.body.name,
        working_day: req.body.working_day,
        specialization: req.body.specialization
    }
    barbers.push(barber)

    res.status(201)
        .location(`${getBaseUrl(req)}/barbers/${barbers.length}`)
        .send(barber)
})

app.post('/customers', (req,res) => {
    if(!req.body.customerName || !req.body.phone || !req.body.mail) {
        return res.status(400).send({error: "One or all parameters that are required is missing"})
    }
    let customer = {
        id: customers.length +1,
        customerName: req.body.customerName,
        phone: req.body.phone,
        mail: req.body.mail
    }
    customers.push(customer)

    res.status(201)
        .location(`${getBaseUrl(req)}/customers/${customers.length}`)
        .send(customer)
})


app.delete('/barbers/:id', (req, res) => {
    if(typeof barbers[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "barber not found"})
    }

    barbers.splice(req.params.id - 1, 1)

    res.status(204).send({error: "No Content"})
})

app.delete('/customers/:id', (req, res) => {
    if(typeof customers[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "customer not found"})
    }

    customers.splice(req.params.id - 1, 1)

    res.status(204).send({error: "No Content"})
})


app.listen(port, async () => {
    console.log(`Api up at: Http://localhost:${port}`)})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}
       


// const barbers = [
//     { id: 1, name: "John Wick", working_day: "Monday", specialization: "Haircuts" },
//     { id: 2, name: "Will Smith", working_day: "Tuesday", specialization: "Beard Trims" },
//     { id: 3, name: "Siim Tamm", working_day: "Wednesday", specialization: "Coloring" },
//     { id: 4, name: "Marko Polo", working_day: "Thursday", specialization: "Haircuts" },
//     { id: 5, name: "Basim Muhha", working_day: "Friday", specialization: "Hair Styling" },
//     { id: 6, name: "Kerli Ostrov", working_day: "Saturday", specialization: "Facial Treatments" },
//     { id: 7, name: "Siim Kallas", working_day: "Sunday", specialization: "Haircuts" }
// ];

