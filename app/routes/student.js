const utils = require("../utils/functions.js")
const dbman = require("../utils/dbManager.js")

const express = require("express")
const router = express.Router()

router.get("/", utils.checkStudent, function(req, res){
  if (req.session.classid == null) { // student nemá třídu
    dbman.getPersonalBooklist(req.session.userid, function(err, qResult){
      if (err) {res.redirect("/"); return}
      data = utils.createBooklist(qResult)
      switch (req.query.alert) {
        case "1":
          res.render("student/bookList", { data, msgType: "success", msg: "Email úspěšně odeslán!"})
          return
        case "2":
          res.render("student/bookList", { data, msgType: "error", msg: "Zadaná třída neexistuje!"})
          return
      }
      res.render("student/bookList", { data})
    })
  } else {
    dbman.getClassDetails(req.session.classid, function(err, details) {
      if (err) {res.redirect("/"); return}
      dbman.getPersonalBooklist(req.session.userid, function(err, qResult){
        if (err) {res.redirect("/"); return}
        data = utils.createBooklist(qResult)
        res.render("student/bookList", { data, details: details[0]})
      })
    })
  }
})


/* --- POST --- */

router.post("/add", utils.checkStudent, function(req, res){
  if (req.body.bookId != null) {
    dbman.addBook(req.session.userid, req.body.bookId, req.session.classid, function(err, data){
      if (err) {res.json({ success: false}); return}
      //res.redirect(req.headers.referer)
      res.json({ success: true})
      return
    })
  } else {res.json({ success: false}); return}
})

router.post("/remove", utils.checkStudent, function(req, res){
  if (req.body.bookId != null) {
    dbman.remBook(req.session.userid, req.body.bookId, req.session.classid, function(err, data){
      if (err) {res.json({ success: false}); return}
      res.json({ success: true})
      return
    })
  } else {res.json({ success: false}); return}
})

router.post("/removeRequest", utils.checkStudent, function(req, res){
  if (req.body.bookId != null) {
    dbman.remRequest(req.session.userid, req.body.bookId, req.session.classid, function(err, data){
      if (err) {res.redirect("/"); return}
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.post("/updateNotes", utils.checkStudent, function(req, res){
  if (req.body.bookId != null && (req.body.readState == "unread" || req.body.readState == "read")) {
    dbman.updateStateStudent(req.session.userid, req.body.bookId, req.body.readState, req.body.order, function(err, data){
      if (err) {res.redirect("/"); return}
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
}) // nice

router.use("*", function(error, req, res, next){
  if (req.session.role === "teacher") {
    res.redirect("/")
    return
  }
  res.redirect("/login")
});

module.exports = router
