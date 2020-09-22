// Dependencies
// =============================================================

module.exports = function (sequelize, DataTypes) {
    Employee = sequelize.define("Employee", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: true
            }
          },
          role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          }
          
        // manager_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        // is_manager: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false
        // }
    });

    Employee.associate = function(models) {
      
        Employee.belongsTo(models.Role, {
          foreignKey:"role_id",  targetKey:`id`
      });
    }
    return Employee;
};
