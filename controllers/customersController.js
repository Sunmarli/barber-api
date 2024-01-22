const {db} = require("../barber-api/db")
const customer = db.customers

exports.getAll = async (req,res) => {
    const customers = await customer.findAll({attributes:["id_customer", "customerName", "phone", "mail"]})
    res.send(customers)
}

exports.getById = async (req, res) => {
    const customers = await customer.findByPk(req.params.id)
    res.send(customers)
}

// exports.createNew = async (req, res) => {
//     let customer
//     try {
//         customer = await customer.create(req.body)
//     } catch (error) {
//         if (error instanceof db.Sequelize.ValidationError) {
//             console.log(error)
//             res.status(400).send({"error":error.errors.map((item)=> item.message)})
//         } else {
//             console.log("customersCreate: ", error)
//             res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
//         }
//         return
//     }
//     res
//     .status(201)
//     .location(`${getBaseUrl(req)}/customers/${customer.id}`)
//     .json(customer);
//     console.log(customer)
// }
exports.updateById = async (req, res) => {
    let result
    delete req.body.id
    try {
        result = await customer.update(req.body,{where: {id: req.params.id}})
    } catch (error) {
        console.log("customersUpdate: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"customer not found"})
        return
    }
    const customer = await customer.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/customers/${customer.id}`)
    .json(customer)
}
exports.deleteById = async (req, res) => {
    let result
    try {
        result = await customer.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("customersDelete: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"customer not found"})
        return
    }
    res
    .status(204).send()
}


getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encryption ? "https" : "http") +
        `://${request.headers.host}`
    )
}
