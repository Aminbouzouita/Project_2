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
    },
    hourly_paid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_manager: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  Employee.associate = function (models) {

    Employee.belongsTo(models.Role, {
      foreignKey: "role_id", targetKey: `id`
    });
  //   Employee.hasOne(models.Timer, {
  //     foreignKey: "employee_id", targetKey: `id`
  // });
  }
  return Employee;
};
