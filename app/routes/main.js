const dbman = require("../utils/dbManager.js")
const email = require("../utils/emailManager.js")
const utils = require("../utils/functions.js")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const crypto = require("crypto")
const express = require("express")
const { redirect } = require("express/lib/response")

const router = express.Router()
dotenv.config()


// - GET -

router.get("/", function(req, res) {
  if (req.session.role == "teacher") {
    dbman.checkRemoveRequests(req.session.userid, function(err, data){
      if (err) {res.redirect("/"); return}
      res.render("index", { data: data[0]})
    })
  }
  else res.render("index")
})

router.get("/login", function(req, res) {
  if (!req.session.email) res.render("login")
  else res.redirect("/")
})

router.get("/logout", function(req, res) {
  req.session.destroy()
  res.redirect("/")
})

router.get("/register", function(req, res) {
  if (!req.session.email) res.render("register")
  else res.redirect("/")
})

router.get("/newAccount", function(req, res) {
  switch (req.query.alert) {
    case "1":
      res.render("newAccount", { msgType: "error", msg: "Neplatný registrační token!"})
      return
    case "2":
      res.render("newAccount", { msgType: "error", msg: "Zadaná třída neexistuje!"})
      return
  }

  dbman.checkToken(req.query.token, function(err, data) {
    if (err) {res.redirect("/"); return}
    if (data && data.length == 0) {
      res.render("newAccount", { msgType: "error", msg: "Neplatný registrační token!"})
    } else {
      res.render("newAccount", { email: data[0].email, token: req.query.token})
    }
  }) 

})

router.get("/confirmClass", function(req, res) {
  var token = req.query.confToken

  dbman.assignClass(token, function(err, data){
    if (err == null) res.render("confirmClass", { msgType: "success", msg: "Třída úspěšně přiřazena"})
    else res.render("confirmClass", { msgType: "error", msg: "Nastala chyba!"})
  })
})

router.get("/booklist", function(req, res) {
  if (req.session.role == "student") {
    if (req.session.classid == null) { // student nemá třídu
      dbman.getAllBooksOpt(req.session.userid, function(err, qResult){
        if (err) {res.redirect("/"); return}
        data = utils.createBooklist(qResult)
        res.render("availableBooklist", { data})
      })
    } else {
      dbman.getClassDetails(req.session.classid, function(err, details) {
        if (err) {res.redirect("/"); return}
        dbman.getAllBooksOpt(req.session.userid, function(err, qResult){
          if (err) {res.redirect("/"); return}
          data = utils.createBooklist(qResult)
          res.render("availableBooklist", { data, details: details[0]})
        })
      })
    }
  }
  else {
    dbman.getAllBooks(function(err, qResult){
      if (err) {res.redirect("/"); return}
      data = utils.createBooklist(qResult)
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

    if (data && data.length != 0) { // našlo studenta
      try {
        if (await bcrypt.compare(req.body.password, data[0].password)) { // kontrola hesla
          req.session.userid = data[0].id
          req.session.classid = data[0].class_id
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
        if (err) {res.redirect("/"); return}
        if (data && data.length != 0) { // našlo učitele
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

router.post("/register", function(req, res) {
  var emailPattern = process.env.USEREMAILPATTERN || "^\\w*\\.\\w*@purkynka\\.cz$"

  if (!req.body.email || !req.body.email.match(emailPattern)) {
    res.render("register", { email: req.body.email, msgType: "error", msg: "Neplatný email!"})
    return
  }

  dbman.checkStudentEmail(req.body.email, function(err, data) {
    if (err) {res.redirect("/"); return}
    if (data && data.length != 0) {
      res.render("register", { email: req.body.email, msgType: "error", msg: "Email už je registrován!"})
      return
    } 

    var token = crypto.randomBytes(16).toString("hex");
    dbman.createRegistration(req.body.email, token, function(err, data) {
      if (err) {res.redirect("/"); return}
      email.sendRegistrationEmail(req.get("origin"), req.body.email, token)
      res.render("register", { msgType: "success", msg: "Email byl odeslán"})
    }) 
  }) 
})

router.post("/createAccount", async function(req, res) {
  var regToken = req.body.token
  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var stClass = req.body.stClass
  var passwHash = await bcrypt.hash(req.body.password, 10)

  // check: špatná třída, neplatný token
  dbman.checkToken(regToken, function(err, data) { // email z tokenu
    if (err) {res.redirect("/"); return}
    if (data && data.length == 0) {res.redirect("/newAccount?token=" + regToken + "&alert=1"); return} // email neexistuje nebo vypršel token
    var stEmail = data[0].email

    dbman.checkClass(stClass, function(err, data) {
      if (err) {res.redirect("/"); return}
      if (data && data.length == 0) {res.redirect("/newAccount?token=" + regToken + "&alert=2"); return}
      var idClass = data[0].id_class
      var tEmail = data[0].email

      dbman.createAccount(firstName, lastName, stEmail, passwHash, regToken, function(err, data) {
        if (err) {res.redirect("/"); return}
        dbman.getStudent(stEmail, function(err, data) {
          var stId = data[0].id

          var stName = firstName + " " + lastName
          var confToken = crypto.randomBytes(16).toString("hex");

          dbman.createConfToken(confToken, idClass, stId, function(err, data) {
            if (err) {res.redirect("/"); return}
            email.sendClassRequestEmail(req.get("origin"), tEmail, confToken, stName, stEmail, stClass)
            res.redirect("login")
          })
        })
      })
    })
  }) 
})

router.post("/resendClassRequest", async function(req, res) {
  if (req.session.role != "student") {res.redirect("/"); return}

  var stName = req.session.firstName + " " + req.session.lastName
  var stId = req.session.userid
  var stEmail = req.session.email
  var stClass = req.body.stClass

  dbman.checkClass(stClass, function(err, data) {
    if (err) {res.redirect("/"); return}
    if (data && data.length == 0) {res.redirect("student?alert=2"); return} // trida neexistuje
    var idClass = data[0].id_class
    var tEmail = data[0].email

    var confToken = crypto.randomBytes(16).toString("hex");
    dbman.createConfToken(confToken, idClass, stId, function(err, data) {
      if (err) {res.redirect("/"); return}
      email.sendClassRequestEmail(req.get("origin"), tEmail, confToken, stName, stEmail, stClass)
      res.redirect("student?alert=1") // uspesne odeslano
    })
  })
})

module.exports = router
