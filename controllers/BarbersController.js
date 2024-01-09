
const {db} = require("../db")
const Barber = db.barbers

exports.getAll = async (res, req) => {

    const barbers = await Barber.findAll({attributes:["name"]})
    res.send(barbers)

}
     /*
    try{
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT etc")
        res.send(rows)
    }catch(error){
        throw error
    }finally{
        if(connection) return connection.end()
    }*/