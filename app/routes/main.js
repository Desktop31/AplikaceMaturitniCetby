const dbman = require("../utils/dbManager.js")
const bcrypt = require("bcrypt")
const express = require("express")

const router = express.Router()


// - GET -

router.get("/", function(req, res) {
  res.render("index")
})

router.get("/login", function(req, res) {
  if (!req.session.email) res.render("login")
  else res.redirect("/")
})

router.get("/logout", function(req, res) {
  req.session.destroy()
  res.redirect("/")
})

router.get("/booklist", function(req, res) {
  if (req.session.role == "student") {
    dbman.getAllBooksOpt(req.session.userid, function(err, data){
      res.render("availableBooklist", { data})
    })
  }
  else {
    dbman.getAllBooks(function(err, data){
      res.render("availableBooklist", { data})
    })
  }
})


// - POST -

router.post("/login", function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.status("400")
    res.render("login", { email: req.body.email, errorMsg: "Vyplňte prosím všechny údaje!"})
    return
  }

  dbman.getStudent (req.body.email, async function(err, data) {
    if (err) {
      res.render("login", { email: req.body.email, errorMsg: "Došlo k chybě"})
      return
    }

    if (data.length != 0) { // našlo studenta
      try {
        if (await bcrypt.compare(req.body.password, data[0].password)) { // kontrola hesla
          req.session.userid = data[0].id
          req.session.email = data[0].email
          req.session.firstName = data[0].firstName
          req.session.lastName = data[0].lastName
          req.session.role = "student"
          res.redirect("/")
        } else { // špatné heslo
          res.render("login", { email: req.body.email, errorMsg: "Chybné údaje!"})
        }
      } catch {
        res.status(500)
      }
    } else {
      dbman.getTeacher (req.body.email, async function(err, data) {
        if (data.length != 0) { // našlo učitele
          try {
            if (await bcrypt.compare(req.body.password, data[0].password)) { // kontrola hesla
              req.session.userid = data[0].id
              req.session.email = data[0].email
              req.session.firstName = data[0].firstName
              req.session.lastName = data[0].lastName
              req.session.role = "teacher"
              res.redirect("/")
            } else { // špatné heslo
              res.render("login", { email: req.body.email, errorMsg: "Chybné údaje!"})
            }
          } catch {
            res.status(500)
          }
        } else {
          res.render("login", { email: req.body.email, errorMsg: "Chybné údaje!"})
        }
      })
    } 
  })
})

module.exports = router
