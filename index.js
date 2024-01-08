const express=require('express')
const app=express()
const port=8081

const swaggerUI = require('swagger-ui-express')
const yamljs=require('yamljs')
const swaggerDocument=yamljs.load('./docs/swagger.yaml')

app.use(express.json())
//const swaggerDocument = require('./docs/swagger.json');


const barbers = [
    { id: 1, name: "John Wick", working_day: "Monday", specialization: "Haircuts" },
    { id: 2, name: "Will Smith", working_day: "Tuesday", specialization: "Beard Trims" },
    { id: 3, name: "Siim Tamm", working_day: "Wednesday", specialization: "Coloring" },
    { id: 4, name: "Marko Polo", working_day: "Thursday", specialization: "Haircuts" },
    { id: 5, name: "Basim Muhha", working_day: "Friday", specialization: "Hair Styling" },
    { id: 6, name: "Kerli Ostrov", working_day: "Saturday", specialization: "Facial Treatments" },
    { id: 7, name: "Siim Kallas", working_day: "Sunday", specialization: "Haircuts" }
];


app.get('/barbers', (req,res)=>{
    res.send(barbers)
})
app.get('/barbers/:id', (req,res)=>{

    if (typeof barbers[req.params.id -1]==='undefined'){
        return res.status(404).send({error:"Barber not found"})
    }
    res.send(barbers[req.params.id -1])    
})

app.post('/barbers',(req,res)=>{
    if(!req.body.name || !req.body.working_day || !req.body.specialization){
        return res.status(400).send({error: "One or all parameteres are missing"})
    }
    let game = {
        id:barbers.length +1,
        name:req.body.name,
        working_day:req.body.working_day,
        specialization:req.body.specialization
    }
    barbers.push(barbers)
    
    res.status(201).location(`${getBaseUrl(req)}/barbers/${barbers.length}`).send(barbers)
});


    app.delete('/barbers/:id', (req, res) =>{
        if(typeof barbers[req.params.id - 1] === 'undefined'){
            return res.status(404).send({error: "barber not found"})
        };
        barbers.splice(req.params.id -1, 1);
        res.status(204).send({error: "No Content"});
    });


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.listen(port,()=>{
    console.log(`API up at: http://localhost:${port}`)
})

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
};