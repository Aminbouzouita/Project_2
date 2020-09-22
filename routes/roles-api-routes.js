const { response } = require("express");
// Requiring our models and passport as we've configured it
var db = require("../models");
var Role = require("../models/roles.js");
module.exports = function (app) {
  app.get("/api/allRoles", function (req, res) {
    db.Role.findAll({}).then(function (results) {
      res.json(results);
      console.log(results);
    });
  });


  app.get("/api/oneRoles", function (req, res) {
    db.Role.findOne({
      where: {
        id: req.body.id
      }
    }).then(function (results) {
      res.json(results);
      console.log(results);
    });
  });


  app.put("/api/Roles", function (req, res) {
    db.Role.update({
      title: req.body.title,
      salary: req.body.salary,
      department_id: req.body.department_id
    }, {
      where: {
        id: req.body.id
      }
    }).then(function (results) {
      res.json(results);
    });
  });


  app.post("/api/newRoles", function (req, res) {
    console.log("Role Data:");
    console.log(req.body);
    db.Role.create({
      title: req.body.title,
      salary: req.body.salary,
      department_id: req.body.department_id,
    }).then(function (results) {
      res.json(results);

    });
  });

  app.delete("/api/Roles/:id", function (req, res) {
    console.log("Role ID:");
    console.log(req.params.id);
    db.Role.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.end();
    });
  });
};