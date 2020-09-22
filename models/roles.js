module.exports = function (sequelize, DataTypes) {
    Role = sequelize.define("Role", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }

    });
    Role.associate = function(models) {
      
    // //     Role.belongsTo(models.Department, {
    // //         foreignKey: {
    // //             allowNull: false
    // //           }
    // //     });
    
        Role.hasOne(models.Employee, {
        foreignKey:"role_id", targetKey:`id`
    });
      };
     

    return Role;
};