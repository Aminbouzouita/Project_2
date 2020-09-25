const { response } = require("express");
// Requiring our models and passport as we've configured it
var db = require("../models");
var Role = require("../models/roles.js");
module.exports = function (app) {
 //        Search for all
  app.get("/api/allRoles", function (req, res) {
    db.Role.findAll({
      where: req.params.id,
      include: [db.Department],
    }).then(function (results) {
      res.json(results);
      console.log(results);
    });
  });

   //            Search using id 
app.get("/api/searchrole/id", function (req, res) {
  db.Role.findOne({
    where: {
      id: req.query.id,
    }
  }).then(function (results) {
    res.json(results);
    return results;
  });
});

 //             Search using title 
 app.get("/api/searchrole/title", function (req, res) {
  db.Role.findOne({
    where: {
      title: req.query.title,
    },
  }).then(function (results) {
    res.json(results);
    return results;
  });
});
//                    Update
  app.put("/api/updateRole/", function (req, res) {
    const { id, title, salary, department_id} = req.body;
    db.Role.update(
      {
        title:title,
        salary:salary,
        department_id: department_id,
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

//               Create
  app.post("/api/newRoles", function (req, res) {
    db.Role.create({
      title: req.body.title,
      salary: req.body.salary,
      department_id: req.body.department_id,
    }).then(function (results) {
      res.json(results);

    });
  });
//                Delete
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