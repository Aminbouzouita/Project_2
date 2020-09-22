const { response } = require("express");
// Requiring our models and passport as we've configured it
var db = require("../models");
var Employee = require("../models/employees.js");

module.exports = function (app) {
  var query = {};
  app.get("/api/allRoles", function(req, res) {
    if (req.query.role_id) {
      query = req.query.role_id;
    }   
   });
  app.get("/api/allEmployees", function (req, res) {
    db.Employee.findAll({
      where: query,
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
    const { id, first_name, last_name, title, email } = req.body;

    db.Employee.update(
      {
        first_name: first_name,
        last_name: last_name,
        role_id: title,
        email: email,
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
      email: req.body.email,
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