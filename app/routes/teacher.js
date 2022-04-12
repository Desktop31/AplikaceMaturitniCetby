const utils = require("../utils/functions.js")
const dbman = require("../utils/dbManager.js")

const express = require("express")
const session = require("express-session")
const { redirect } = require("express/lib/response")
const router = express.Router()

router.get("/", utils.checkTeacher, function(req, res){
  dbman.getClasslist(req.session.userid, function(err, data){
    if (err) {res.redirect("/"); return}
    res.render("teacher/classlist", { data})
  })
})

router.get("/class/:classId", utils.checkTeacher, function(req, res){
  dbman.getClassDetails(req.params.classId, function(err, details) {
    if (err) {res.redirect("/"); return}
    if(details.length == 0) {res.redirect("/"); return}
    if(details[0].teacher_id != req.session.userid) {res.redirect("/"); return}

    dbman.getClassStudents(req.params.classId, function(err, data){
      if (err) {res.redirect("/"); return}
      res.render("teacher/class", { data, details: details[0]})
    })
  })
})

router.get("/student/:stId", utils.checkTeacher, function(req, res){
  dbman.getStudentDetails(req.params.stId, function(err, details) {
    if (err) {res.redirect("/"); return}
    if(details.length == 0) {res.redirect("/"); return}
    if(details[0].teacher_id != req.session.userid) {res.redirect("/"); return}
    dbman.getPersonalBooklist(req.params.stId, function(err, data){
      if (err) {res.redirect("/"); return}
      res.render("teacher/studentBooks", { data, details: details[0]})
    })
  })
})

router.get("/requests", utils.checkTeacher, function(req, res){
  dbman.getRemoveRequests(req.session.userid, function(err, data){
    if (err) {res.redirect("/"); return}
    res.render("teacher/requests", { data})
  })
})

/* -- POST -- */

router.post("/locking", utils.checkTeacher, function(req, res){
  cid = parseInt(req.body.classId)
  dbman.getClassDetails(cid, function(err, details) {
    if (err) {res.redirect("/"); return}
    if(details.length == 0) {res.redirect(req.headers.referer); return}
    if(details[0].teacher_id != req.session.userid) {res.redirect(req.headers.referer); return}

    if (req.body.unlockDate) { // uzamceni
      time = req.body.unlockDate.replace("T", " ");
      dbman.scheduleUnlock(cid, time, req.body.count, function(err, data){
        if (err) {res.redirect("/"); return}
        res.redirect(req.headers.referer)
        return
      })
    } else { // odemceni
      dbman.unlock(cid, function(err, data){
        if (err) {res.redirect("/"); return}
        res.redirect(req.headers.referer)
        return
      })
    }
  })
})

router.post("/accept", utils.checkTeacher, function(req, res){
  if (req.body.bookId != null && req.body.studentId != null) {
    dbman.acceptRemRequest(req.body.studentId, req.body.bookId, req.session.userid, function(err, data){
      if (err) {res.redirect("/"); return}
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.post("/deny", utils.checkTeacher, function(req, res){
  if (req.body.bookId != null && req.body.studentId != null) {
    dbman.denyRemRequest(req.body.studentId, req.body.bookId, req.session.userid, function(err, data){
      if (err) {res.redirect("/"); return}
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.post("/updateNotes", utils.checkTeacher, function(req, res){
  state = req.body.prevState
  if (req.body.done) state = "done" 
  else if (state == "done") state = "unread"

  if (req.body.bookId != null) {
    dbman.updateStateTeacher(req.session.userid, req.body.studentId, req.body.bookId, state, req.body.note, function(err, data){
      if (err) {res.redirect("/"); return}
      res.redirect(req.headers.referer)
    })
  } else res.redirect(req.headers.referer)
})

router.use("*", function(error, req, res, next){
  if (req.session.role === "student") {
    res.redirect("/")
    return
  }
  res.redirect("/login")
});

module.exports = router