const { response } = require("express");
var db = require("../models");
var Timer = require("../models/employeesTimer.js");
module.exports = function (app) {
    //           Search for all
    app.get("/api/allTimer", function (req, res) {
        db.Timer.findAll({}).then(function (results) {
            res.json(results);
            console.log(results);
        });
    });

     //            Search using employee_id 
app.get("/api/searchtimer/employee_id", function (req, res) {
    db.Timer.findOne({
      where: {
        employee_id: req.query.employee_id,
      }
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

    //            Search using date 
    app.get("/api/searchtimer/date", function (req, res) {
        db.Timer.findOne({
          where: {
            date: req.query.date,
          }
        }).then(function (results) {
          res.json(results);
          return results;
        });
      });
          //            Search using created_At 
app.get("/api/searchtimer/created_At", function (req, res) {
    db.Timer.findOne({
      where: {
        created_At: req.query.created_At,
      }
    }).then(function (results) {
      res.json(results);
      return results;
    });
  });

//                Create
    app.post("/api/newTimer", function (req, res) {
        db.Timer.create({
            employee_id: req.body.employee_id,
            date: req.body.date,
            starttime: req.body.starttime,
            stoptime: req.body.stoptime,
            workedtime: req.body.workedtime,
            totalmonthlytime: req.body.totalmonthlytime,
        }).then(function (result) {
            res.json(result);
        });
    });
}