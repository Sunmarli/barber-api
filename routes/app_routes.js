const BarbersController = require('../controllers/BarbersController.js')

module.exports = (app) => {
    app.route("/barbers")
        .get(BarbersController.getAll)  // get all barbers as list
        .post(BarbersController.createNew) // create new barbers)
    app.route("/barbers/:id")
        .get(BarbersController.getById)        //get ONE barber by ID
        .put(BarbersController.updateById)     //UPDATE a barber by ID
        .delete(BarbersController.deleteById)  //DELETE one barber by ID

}

