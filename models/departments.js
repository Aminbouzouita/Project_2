module.exports = function (sequelize, DataTypes) {
    Department = sequelize.define("Department", {
        department_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Department.associate = function(models) {
    //     Department.hasMany(models.Role, {
    //       onDelete: "cascade"
    //     });
    //   };
    return Department;
};