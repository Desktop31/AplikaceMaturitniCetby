const utils = require("../utils/functions.js")
const dbman = require("../utils/dbManager.js")

const express = require("express")
const router = express.Router()

router.get("/", utils.checkStudent, function(req, res){
  if (req.session.classid == null) { // student nemá třídu
    dbman.getPersonalBooklist(req.session.userid, function(err, data){
      res.render("student/bookList", { data})
    })
  } else {
    dbman.getClassDetails(req.session.classid, function(err, details) {
      dbman.getPersonalBooklist(req.session.userid, function(err, data){
        res.render("student/bookList", { data, details: details[0]})
      })
    })
  }
})


/* --- POST --- */

router.post("/add", utils.checkStudent, function(req, res){
  if (req.body.bookId != null) {
    dbman.addBook(req.session.userid, req.body.bookId, req.session.classid, function(err, data){
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.post("/remove", utils.checkStudent, function(req, res){
  if (req.body.bookId != null) {
    dbman.remBook(req.session.userid, req.body.bookId, req.session.classid, function(err, data){
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.post("/removeRequest", utils.checkStudent, function(req, res){
  if (req.body.bookId != null) {
    dbman.remRequest(req.session.userid, req.body.bookId, req.session.classid, function(err, data){
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.post("/updateNotes", utils.checkStudent, function(req, res){
  if (req.body.bookId != null && (req.body.readState == "unread" || req.body.readState == "read")) {
    dbman.updateStateStudent(req.session.userid, req.body.bookId, req.body.readState, req.body.order, function(err, data){
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.use("*", function(error, req, res, next){
  if (req.session.role === "teacher") {
    res.redirect("/")
    return
  }
  res.redirect("/login")
});

module.exports = router
