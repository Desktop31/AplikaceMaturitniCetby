const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("teacher/teacherHome")
})

module.exports = router