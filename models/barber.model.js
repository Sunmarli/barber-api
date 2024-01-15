module.exports = (sequelize, Sequelize) => {
    const Barber = sequelize.define("barbers", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        working_day: {
            type: Sequelize.STRING,
            allowNull: true
        },
        specialization: {
            type: Sequelize.STRING,
            allowNull: true
        } 
    });
    return Barber;
};