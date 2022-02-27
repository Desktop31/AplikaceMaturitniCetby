const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.render("student/home")
})

router.get("/booklist", (req, res) => {
    res.render("student/booklist")
})

module.exports = router