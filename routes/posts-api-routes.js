const { response } = require("express");
// Requiring our models and passport as we've configured it
var db = require("../models");
var Employee = require("../models/post.js");
var Post = require("../models/post.js");

//Updating Post Api Routes
// This is the best code for now

module.exports = function (app) {
  app.get("/api/allEmployees", function (req, res) {
    db.Employee.findAll({
      where: req.params.id,
      include: [db.Role],
    }).then(function (results) {
      res.json(results);
      //console.log(results);
    });
  });

  app.get("/api/userPosts/?", function (req, res) {
    console.log("here", req.query.id);
    var searchUser = {
      receiver_id: req.query.id,
    };
    db.Post.findAll({
      where: searchUser,
      //include: [db.Role],
    }).then(function (results) {
      res.json(results);
      //console.log(results);
    });
  });

  app.post("/api/newPost", function (req, res) {
    db.Post.create({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      post: req.body.post,
    }).then(function (result) {
      res.json(result);
    });
  });
};
