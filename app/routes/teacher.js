const utils = require("../utils/functions.js")

const express = require("express")
const router = express.Router()

router.get("/", utils.checkTeacher, function(req, res){
  res.render("teacher/home")
})

router.get("/class", utils.checkTeacher, function(req, res){
  res.render("teacher/class")
})

router.get("/studentBooks", utils.checkTeacher, function(req, res){
  res.render("teacher/studentBooks")
})

router.use("*", function(error, req, res, next){
  if (req.session.role === "student") {
    res.redirect("/")
    return
  }
  res.redirect("/login")
});

module.exports = router