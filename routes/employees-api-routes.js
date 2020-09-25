const { response } = require("express");
// Requiring our models and passport as we've configured it
var db = require("../models");
var Employee = require("../models/employees.js");

module.exports = function (app) {
  //           Search for all
  app.get("/api/allEmployees", function (req, res) {
    db.Employee.findAll({
      where: req.params.id,
      include: [db.Role],
    }).then(function (results) {
      res.json(results);
      //console.log(results);
    });
  });

//            Search using id 
app.get("/api/searchemployee/id", function (req, res) {
  db.Employee.findOne({
    where: {
      id: req.query.id,
    },include: [db.Role],
  }).then(function (results) {
    res.json(results);
    return results;
  });
});

//          Search using first name
  app.get("/api/searchemployee/?", function (req, res) {
    var first = req.query.first_name;
    console.log("employee one search: primero", first);
    db.Employee.findOne({
      where: {
        first_name: first,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

//             Search using last name
  app.get("/api/searchemployeelast/?", function (req, res) {
    var last = req.query.last_name;
    console.log("employee one search: primero", last);
    db.Employee.findOne({
      where: {
        last_name: last,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

  //    Search using first name and last name
  app.get("/api/searchemployee/fullname", function (req, res) {
    db.Employee.findOne({
      where: {
        first_name: req.query.first_name, 
        // last_name: req.query.last_name,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

//                 Search using email 
  app.get("/api/searchemployee/email", function (req, res) {
    db.Employee.findOne({
      where: {
        email: req.query.email,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

  //             Search using manager_id 
  app.get("/api/searchemployee/manager_id", function (req, res) {
    db.Employee.findOne({
      where: {
        manager_id: req.query.manager_id,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

  //             Search using department_id 
  app.get("/api/searchemployee/department_id", function (req, res) {
    db.Employee.findOne({
      where: {
        department_id: req.query.department_id,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

  //              Search using is_manager 
  app.get("/api/searchemployee/is_manager", function (req, res) {
    db.Employee.findOne({
      where: {
        is_manager: true,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

  //               Search using is_active 
  app.get("/api/searchemployee/is_active", function (req, res) {
    db.Employee.findOne({
      where: {
        is_active: true,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

    //               Search using is_admin 
  app.get("/api/searchemployee/is_admin", function (req, res) {
    db.Employee.findOne({
      where: {
        is_admin: true,
      },include: [db.Role],
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });


//                    Update
  app.put("/api/updateEmp/", function (req, res) {
    const {
      id,
      first_name,
      last_name,
      title,
      hourly_paid,
      email,
      street,
      city,
      zip_code,
      country,
      is_manager,
      manager_id,
      is_admin,
      is_active,
    } = req.body;

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

//                     Create
  app.post("/api/newEmployees", function (req, res) {
    console.log("Employee Data:");
    console.log(req.body);
    db.Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      role_id: req.body.role_id,
      hourly_paid: req.body.hourly_paid,
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

  //                  Delete
  app.delete("/api/Employees/:id", function (req, res) {
    console.log("Employee ID:");
    console.log(req.params.id);
    db.Employee.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function () {
      res.end();
    });
  });
};
