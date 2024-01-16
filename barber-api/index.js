require("dotenv").config();
const express = require('express');
const cors = require('cors')
const app = express();
//const port = 8080
const port = process.env.PORT
const swaggerUi = require('swagger-ui-express')
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');

app.use(cors());

app.use(express.json());

require("../routes/app_routes")(app)

app.get("/errors", async (req,res) => {
    res.statusCode(404).send({"error": "something went wrong"})
})




// method 1, we subtract one from the id input by the user.
/*  app.get('/barbers/:id', (req, res) => {
    if (typeof barbers[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "barber not found"})
    }
    res.send(barbers[req.params.id - 1])
 })
 */

 app.get('/barbers/:id', (req, res) => {
    if (typeof barbers[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "barber not found"})
    }
    res.send(barbers[req.params.id - 1])
 })
 app.get('/customers/:id', (req, res) => {
    if (typeof barbers[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "barber not found"})
    }
    res.send(barbers[req.params.id - 1])
 })
 
// method 2, we locate the item with the described id in the request, irrelevant of its location in the array.
// app.get('/barbers/:id', (req, res) => {
//     if (typeof barbers[req.params.id - 1] === 'undefined'){
//         return res.status(404).send({error: "barber not found"})
//     }    
// const barber = barbers.find(g => g.id== req.params.id);
// res.send(barber);});  kood by: Nirgi

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.post('/barbers', (req,res) => {
    if(!req.body.name || !req.body.price || !req.body.description) {
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

app.delete('/barbers/:id', (req, res) => {
    if(typeof barbers[req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "barber not found"})
    }

    barbers.splice(req.params.id - 1, 1)

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

