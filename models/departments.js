module.exports = function (sequelize, DataTypes) {
    Department = sequelize.define("Department", {
        department_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Department.associate = function (models) {
        Department.hasOne(models.Role, {
            foreignKey: "department_id", targetKey: `id`
        });
    };

    return Department;
};