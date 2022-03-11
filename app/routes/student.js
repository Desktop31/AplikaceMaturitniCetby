const utils = require("../utils/functions.js")
const dbman = require("../utils/dbManager.js")

const express = require("express")
const router = express.Router()

router.get("/", utils.checkStudent, function(req, res){
  dbman.getPersonalBooklist(req.session.userid, function(err, data){
    res.render("student/bookList", { data})
  })
})

router.use("*", function(error, req, res, next){
  if (req.session.role === "teacher") {
    res.redirect("/")
    return
  }
  res.redirect("/login")
});

module.exports = router