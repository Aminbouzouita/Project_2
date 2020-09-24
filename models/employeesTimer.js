module.exports = function (sequelize, DataTypes) {
    Timer = sequelize.define("Timer", {
       
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false
        },
        starttime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stoptime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        workedtime:{
            type: DataTypes.STRING,
            allowNull: false
        },
        totalmonthlytime:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    });
    // Timer.associate = function (models) {

    //     Timer.belongsTo(models.Employee, {
    //       foreignKey: "employee_id", targetKey: `id`
    //     });
    //   }
      
 return Timer;
};