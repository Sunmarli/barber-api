const BarbersController = require('../controllers/BarbersController.js')
const customerController = require('../controllers/customersController.js');

module.exports = (app) => {
    app.route("/barbers")
        .get(BarbersController.getAll)  // get all barbers as list
        .post(BarbersController.createNew) // create new barbers)
    app.route("/barbers/:id")
        .get(BarbersController.getById)        //get ONE barber by ID
        .put(BarbersController.updateById)     //UPDATE a barber by ID
        .delete(BarbersController.deleteById)  //DELETE one barber by ID
    app.route('/customers')
        .get(customersController.getAll)
        .post(customersController.createNew) //Create */
        app.route("/customers/:id_customer")
        .get(customersController.getById) //Read
        .put(customersController.updateById)  //Update
        .delete(customersController.deleteById)  //Delete

}

