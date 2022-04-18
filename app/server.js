// == SETUP ==
const express = require("express")
const session = require("express-session")
const dotenv = require("dotenv")

const app = express()
dotenv.config()

app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

// -- SESSION --
var timeoutMin = process.env.SESSION_TIMEOUT || 15

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false, 
  resave: false,
  rolling: true,
  cookie: {
    maxAge: timeoutMin*60*1000
  }
})) 

app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
});

// = ROUTERS =

const mainRouter = require("./routes/main")
const studentRouter = require("./routes/student")
const teacherRouter = require("./routes/teacher")
const { render } = require("express/lib/response")

app.use("/", mainRouter)
app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)


// - 404 -
app.get("*", function(req, res) {
  res.render("404")
})

// ===

const port = process.env.PORT || 3000

app.listen(port)
