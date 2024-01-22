const {db} = require("../barber-api/db")
const booking = db.booking

exports.getAll = async (req,res) => {
    const bookings = await booking.findAll({attributes:["id_booking", "bookingDate", "bookingTime","id_customer", "id_service", "id_barber"]})
    res.send(bookings)
}

exports.getById = async (req, res) => {
    const bookings = await booking.findByPk(req.params.id)
    res.send(bookings)
}

 /*    exports.createNew = async (req, res) => {
        let booking
        try {
            booking = await booking.create(req.body)
        } catch (error) {
            if (error instanceof db.Sequelize.ValidationError) {
                console.log(error)
                res.status(400).send({"error":error.errors.map((item)=> item.message)})
            } else {
                console.log("bookingsCreate: ", error)
                res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
            }
            return
        }
        res
        .status(201)
        .location(`${getBaseUrl(req)}/bookings/${booking.id}`)
        .json(booking);
        console.log(booking)
    }  */
    exports.createNew = async (req, res) => {
        let booking
        try {
            booking = await booking.create(req.body)
        } catch (error) {
            if (error instanceof db.Sequelize.ValidationError) {
                console.log(error)
                res.status(400).send({"error":error.errors.map((item)=> item.message)})
            } else {
                console.log("bookingsCreate: ", error)
                res.status(500).send({"error":"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
            }
            return
        }
        res
        .status(201)
        .location(`${getBaseUrl(req)}/bookings/${booking.id}`)
        .json(booking);
        console.log(booking)
    } 
exports.updateById = async (req, res) => {
    let result
    delete req.body.id
    try {
        result = await booking.update(req.body,{where: {id: req.params.id}})
    } catch (error) {
        console.log("bookingsUpdate: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"booking not found"})
        return
    }
    const booking = await booking.findByPk(req.params.id)
    res.status(200)
    .location(`${getBaseUrl(req)}/bookings/${booking.id}`)
    .json(booking)
}
exports.deleteById = async (req, res) => {
    let result
    try {
        result = await booking.destroy({where: {id: req.params.id}})
    } catch (error) {
        console.log("bookingsDelete: ", error)
        res.status(500).send({error:"Something has gone wrong in our monkey pit, lead orangutan has been deployed to fix it up"})
        return
    }
    if (result === 0) {
        res.status(404).send({error:"booking not found"})
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

//commit test