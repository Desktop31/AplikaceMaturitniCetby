const express = require("express")
const bcrypt = require("bcrypt")

const app = express()
app.set("view engine", "pug")
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
  res.render("index")
})

app.get("/login", (req, res) => {
  res.render("login")
})

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

app.post("/login", async (req, res) => {
  try {
    if (await bcrypt.compare(req.body.password, users[0].password)) {
      res.redirect("student")
    } else {
      res.render("login", { email: req.body.email, errorMsg: "opicecak"})
    }

  } catch {
    res.status(500)
  }
})


const studentRouter = require("./routes/student")
const teacherRouter = require("./routes/teacher")
const res = require("express/lib/response")
const { render } = require("express/lib/response")

app.use("/student", studentRouter)
app.use("/teacher", teacherRouter)


app.listen(3000)

/* TODO
logout: https://youtu.be/-RCnNyD0L-s?t=2141 ~35min

*/

