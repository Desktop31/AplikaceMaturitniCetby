const utils = require("../utils/functions.js")
const dbman = require("../utils/dbManager.js")

const express = require("express")
const router = express.Router()

router.get("/", utils.checkTeacher, function(req, res){
  dbman.getClasslist(req.session.userid, function(err, data){
    res.render("teacher/classlist", { data})
  })
})

router.get("/class/:classId", utils.checkTeacher, function(req, res){
  //var className = req.query.cName
  //console.log(classId) toto dela bordel
  dbman.getClassStudents(1, function(err, data){
    //console.log(data)
    //console.log(className)
    res.render("teacher/class", { data})
  })
})

router.get("/studentBooks", utils.checkTeacher, function(req, res){
  res.render("teacher/studentBooks")
})

router.get("/requests", utils.checkTeacher, function(req, res){
  res.render("teacher/requests")
})

router.use("*", function(error, req, res, next){
  if (req.session.role === "student") {
    res.redirect("/")
    return
  }
  res.redirect("/login")
});

module.exports = router