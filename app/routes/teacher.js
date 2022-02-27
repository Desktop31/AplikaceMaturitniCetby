const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  res.render("teacher/home")
})

router.get("/class", (req, res) => {
  res.render("teacher/class")
})

router.get("/studentBooks", (req, res) => {
  res.render("teacher/studentBooks")
})

module.exports = router