const express = require("express")
const bcrypt = require("bcrypt")

const app = express()
app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/login", (req, res) => {
  res.render("login")
})

/*
app.post("/login", async (req, res) => {
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("student/studentHome")
    }
  } catch {
    res.redirect("login")
  }
})
*/

const studentRouter = require("./routes/student")
const teacherRouter = require("./routes/teacher")

app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)


app.listen(3000)