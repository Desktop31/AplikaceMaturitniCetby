// == SETUP ==
const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bcrypt = require("bcrypt")

const app = express()
app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: "amogusgangnamstyle69420", // ZMĚNIT!!!
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

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/login", (req, res) => {
  if (!req.session.email) res.render("login")
  else res.redirect("/")
})

app.get("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

app.get("/booklist", (req, res) => {
  res.render("availableBooklist")
})

// - POST -

app.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status("400")
    res.render("login", { email: req.body.email, errorMsg: "Chybné údaje"})
    return
  }

  try {
    if (await bcrypt.compare(req.body.password, users[0].password)) {
      req.session.email = req.body.email
      req.session.role = "student"
      res.redirect("student")
    } else {
      res.render("login", { email: req.body.email, errorMsg: "Chybné údaje"})
    }

  } catch {
    res.status(500)
  }
})

// = OTHER ROUTERS =

const studentRouter = require("./routes/student")
const teacherRouter = require("./routes/teacher")
// const res = require("express/lib/response")
// const { render } = require("express/lib/response")

app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)


// = 404 =
app.get("*", (req, res) => {
  res.render("404")
})

// ==

app.listen(3000)

/* == TODO ==
mysql
pokud kniha done, disable možnost odebrat
zobrazit +/- v seznamu knih pouze pokud je přihlášen žák

student:
  - poznámky u knihy z pohledu žáka
  - systém pořadí knih
  - změna pořadí knih

teacher:
  - seznam tříd
  - seznam žáků ve třídě
  - seznam žáka z pohledu učitele
  - poznámky u knihy z pohledu učitele
  - uzamknout počet knih k testu

manuál
o aplikaci
?generátor PDF seznamu knih
?light/dark mode switch

databáze:
  - pořadí knihy
  - počet knih k testu ve třídě


*/

