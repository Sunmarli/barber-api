const BarbersController = require('../controllers/BarbersController.js')

module.exports = (app) => {
    app.route("/barbers")
        .get(BarbersController.getAll)  // get all games as list
}