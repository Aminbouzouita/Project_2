const { response } = require("express");
// Requiring our models and passport as we've configured it
var db = require("../models");
var Employee = require("../models/employees.js");

module.exports = function (app) {
  app.get("/api/allEmployees", function (req, res) {
    db.Employee.findAll({
      where: req.params.id,
      include: [db.Role]
    }).then(function (results) {
      res.json(results);
      console.log(results);
    });
  });

  // app.get("/api/Employees/:id", function(req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbAuthor) {
  //     res.json(dbAuthor);
  //   });
  // });

  app.put("/api/updateEmp/", function (req, res) {
    const { id, first_name, last_name, title, hourly_paid, email, street, city, zip_code, country, is_manager, manager_id, is_admin, is_active} = req.body;

    db.Employee.update(
      {
        first_name: first_name,
        last_name: last_name,
        role_id: title,
        hourly_paid: hourly_paid,
        email: email,
        street: street,
        city: city,
        zip_code: zip_code,
        country: country,
        is_manager: is_manager,
        manager_id: manager_id,
        is_admin: is_admin,
        is_active: is_active,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function (result) {
      res.json(result);
    });
  });
  
  
  app.post("/api/newEmployees", function (req, res) {
    console.log("Employee Data:");
    console.log(req.body);
    db.Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role_id: req.body.role_id,
      hourly_paid:req.body.hourly_paid,
      email: req.body.email,
      street: req.body.street,
      city: req.body.city,
      zip_code: req.body.zip_code,
      country: req.body.country,
      is_manager: req.body.is_manager,
      manager_id: req.body.manager_id,
      is_admin: req.body.is_admin,
      is_active: req.body.is_active,
    }).then(function (results) {
      res.json(results);

    });
  });

  app.delete("/api/Employees/:id", function (req, res) {
    console.log("Employee ID:");
    console.log(req.params.id);
    db.Employee.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.end();
    });
  });
};