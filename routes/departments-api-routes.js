const { response } = require("express");
var db = require("../models");
var Department = require("../models/departments.js");
module.exports = function(app) {
    app.get("/api/allDepartments", function(req, res) {
    db.Department.findAll({}).then(function(results) {
      res.json(results);
      console.log(results);
    });
  });
  app.put("/api/Departments", function(req, res) {
    db.Department.update({
      department_name: req.body.department_name
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(results) {
      res.json(results);
    });
  });


  app.post("/api/newDepartments", function(req, res) {
    console.log("department Data:");
    console.log(req.body);
    db.Department.create({
      department_name: req.body.department_name,
    }).then(function(results) {
      res.json(results);
     
    });
  });

  app.put("/api/updateDep/", function (req, res) {
    const { id, department_name} = req.body;

    db.Department.update(
      {
        department_name: department_name,
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
 
  app.delete("/api/Departments/:id", function(req, res) {
    console.log("Department ID:");
    console.log(req.params.id);
    db.Department.destroy({
      where: {
        id: req.params.id
      }
    }).then(function() {
      res.end();
    });
  });
};