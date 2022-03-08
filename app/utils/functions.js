function checkStudent(req, res, next) {
  if (req.session.role === "student") {
    next()
  } else {
    var error = new Error("Musíte se přihlásit!")
    next(error)
  }
}

function checkTeacher(req, res, next) {
  if (req.session.role === "teacher") {
    next()
  } else {
    var error = new Error("Musíte se přihlásit!")
    next(error)
  }
}

module.exports = {checkStudent, checkTeacher}