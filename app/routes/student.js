const utils = require("../utils/functions.js")

const express = require("express")
const router = express.Router()

router.get("/", utils.checkStudent, function(req, res){
    res.render("student/home")
})

router.get("/booklist", utils.checkStudent, function(req, res){
  res.render("student/booklist")
})

router.use("*", function(error, req, res, next){
  if (req.session.role === "teacher") {
    res.redirect("/")
    return
  }
  res.redirect("/login")
});

module.exports = router