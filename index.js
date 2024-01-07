const app=require('express')()
const port=8081

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.get('/barber', (req,res)=>{
    res.send(["John Wick", "Will Smith"])
})


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.listen(port,()=>{
    console.log(`API up at: http://localhost:${port}`)
})