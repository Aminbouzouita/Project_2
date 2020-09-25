const { response } = require("express");
var db = require("../models");
var Post = require("../models/post.js");
module.exports = function (app) {

//              Search for all
    app.get("/api/allPosts", function (req, res) {
        db.Post.findAll({}).then(function (results) {
            res.json(results);
            console.log(results);
        });
    });

//               Search using sender_id
app.get("/api/searchPost/email", function (req, res) {
    db.Post.findOne({
  where: {
    sender_id: req.query.sender_id
  },
  }).then(function (results) {
  res.json(results);
  return results;
  });
  });

  //               Search using receiver_id
app.get("/api/searchPost/email", function (req, res) {
    db.Post.findOne({
  where: {
    receiver_id: req.query.receiver_id
  },
  }).then(function (results) {
  res.json(results);
  return results;
  });
  });
//                 Create
    app.post("/api/newPost", function (req, res) {
        db.Post.create({
            sender_id: req.body.sender_id,
            receiver_id: req.body.receiver_id,
            post: req.body.post
        }).then(function (result) {
            res.json(result);
        });
    });
}