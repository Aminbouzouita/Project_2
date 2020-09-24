const { response } = require("express");
var db = require("../models");
var Timer = require("../models/employeesTimer.js");
module.exports = function (app) {
    app.get("/api/allTimer", function (req, res) {
        db.Timer.findAll({}).then(function (results) {
            res.json(results);
            console.log(results);
        });
    });

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