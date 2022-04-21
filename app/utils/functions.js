module.exports.checkStudent = function(req, res, next) {
  if (req.session.role === "student") {
    next()
  } else {
    var error = new Error("Musíte se přihlásit!")
    next(error)
  }
}

module.exports.checkTeacher = function(req, res, next) {
  if (req.session.role === "teacher") {
    next()
  } else {
    var error = new Error("Musíte se přihlásit!")
    next(error)
  }
}

module.exports.createBooklist = function(bookQuery) {
  var booklist = []

  bookQuery.forEach(function(book) {
    prevIndex = booklist.findIndex(b => b.id_book == book.id_book)
    if (prevIndex === -1) { // kniha nebyla, přidej knihu
      // přidej knihu
      booklist.push(
        {
          "id_student": book.id_student,
          "id_book": book.id_book,
          "name": book.name,
          "active": book.active,
          "century": book.century,
          "category": book.category,
          "link": book.link,
          "order": book.order,
          "state": book.state,
          "teachersNote": book.teachersNote,
          "authors": [
            {
              "firstName": book.firstName,
              "lastName": book.lastName
            }
          ]
        }
      )

    } else {
      // kniha už byla, přidej autora 
      booklist[prevIndex].authors.push(
        {
          "firstName": book.firstName ,
          "lastName": book.lastName
        }
      )

    }
  })

  return booklist
}
