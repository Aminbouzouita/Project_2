const { response } = require("express");
var db = require("../models");
var Post = require("../models/post.js");
module.exports = function (app) {
    app.get("/api/allPosts", function (req, res) {
        db.Post.findAll({}).then(function (results) {
            res.json(results);
            console.log(results);
        });
    });

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