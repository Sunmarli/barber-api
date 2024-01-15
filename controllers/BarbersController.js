const {db} = require("../barber-api/db")
const barber = db.barbers

exports.getAll = async (req,res) => {
    const barbers = await barber.findAll({attributes:["id", "name", "working_day", "specialization"]})
    res.send(barbers)
}

exports.getById = async (req, res) => {
    const barbers = await barber.findByPk(req.params.id)
    res.send(barbers)
}

exports.createNew = async (req, res) => {
    let barber
    try {
        barber = await barber.create(req.body)
    } catch (error) {
        if (error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":error.errors.map((item)=> item.message)})
        } else {
            console.log("barbersCreate: ", error)
            res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        }
        return
    }
    res
    .status(201)
    .location(`${getBaseUrl(req)}/barbers/${barber.id}`)
    .json(barber);
    console.log(barber)
}

exports.deleteById = async (req, res) => {
    let result
    try {
        result = await barber.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("barbersDelete: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"barber not found"})
        return
    }
    res
    .status(204).send()
}

exports.updateById = async (req, res) => {
    let result
    delete req.body.id
    try {
        result = await barber.update(req.body,{where: {id: req.params.id}})
    } catch (error) {
        console.log("barbersUpdate: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"barber not found"})
        return
    }
    const barber = await barber.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/barbers/${barber.id}`)
    .json(barber)
}

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encryption ? "https" : "http") +
        `://${request.headers.host}`
    )
}