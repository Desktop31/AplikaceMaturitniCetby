// == SETUP ==
const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const dbman = require("./utils/dbManager.js")

const app = express()
dotenv.config()

app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, 
  resave: false,
  rolling: true,
  cookie: {
    maxAge: 15*60*1000
  }
})) 

app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

//---temp---

const users = []

async function createUser(username, password) {
  try {
    const hashedPass = await bcrypt.hash(password, 10)
    const user = { name: username, password: hashedPass}
    users.push(user)
  } catch (err) {
    console.log(err)
  }
}

createUser("opicak", "opice")

//---------

// == ROUTES ==

// - GET -

app.get("/", function(req, res) {
  res.render("index")
})

app.get("/login", function(req, res) {
  if (!req.session.email) res.render("login")
  else res.redirect("/")
})

app.get("/logout", function(req, res) {
  req.session.destroy()
  res.redirect("/")
})

app.get("/booklist", function(req, res) {
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

app.post("/login", function(req, res) {
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

// = OTHER ROUTERS =

const studentRouter = require("./routes/student")
const teacherRouter = require("./routes/teacher")
const { render } = require("express/lib/response")
// const res = require("express/lib/response")
// const { render } = require("express/lib/response")

app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)


// = 404 =
app.get("*", function(req, res) {
  res.render("404")
})

// ==
const port = process.env.PORT || 3000

app.listen(port)
