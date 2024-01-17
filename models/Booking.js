const Customer = require("./Customer")
 const barberModel = require("./barber.model")

module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        id_booking: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookingDate: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true}
        },
        id_customer: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Customer,
                key: "id_customer"
            }
        },
       
        
        id_barber: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: barberModel,
                key: "id_barber"
            }
        }
    })

    // Customer.hasMany(Booking, {foreignKey: "id_customer"});
    // Booking.belongsTo(Customer, { foreignKey: 'id_customer'});
    // Customer.belongsToMany(Service, {through: Booking});
    // Customer.belongsToMany(Barber, {through: Booking});

    // Service.hasMany(Booking, { foreignKey: 'id_service'});
    // Booking.belongsTo(Service, { foreignKey: 'id_service'});
    // Service.belongsToMany(Customer, {through: Booking});

    // Barber.hasMany(Booking, { foreignKey: 'id_barber'});
    // Booking.belongsTo(Barber, { foreignKey: 'id_barber'});
    // Barber.belongsToMany(Customer, {through: Booking});
    
     return Booking

}