const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config()

var con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSW,
  database: process.env.DB
})


function getAllBooks(callback) {
  sql = "SELECT b.name, b.century, b.category, b.active, b.link, a.firstName, a.lastName "
   + "FROM book b, author a, book_has_author bha "
   + "WHERE bha.book_id = b.id_book AND bha.author_id = a.id_author "
   + "ORDER BY a.lastName ASC, a.firstName ASC;"
  con.query(sql, function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function getAllBooksOpt(id, callback) {
  sql = "SELECT bl.name, bl.century, bl.category, bl.active, bl.link, bl.firstName, bl.lastname, sb.id "
    + "FROM "
    + "(SELECT b.id_book, b.name, b.century, b.category, b.active, b.link, a.firstName, a.lastName "
    + "FROM book b, author a, book_has_author bha "
    + "WHERE bha.book_id = b.id_book AND bha.author_id = a.id_author "
    + "ORDER BY a.lastName ASC, a.firstName ASC) bl "
    + "LEFT JOIN "
    + "(SELECT s.id_student id, b.id_book "
    + "FROM student s, book b, student_has_book shb "
    + "WHERE s.id_student = shb.student_id AND b.id_book = shb.book_id AND s.id_student = ?) sb "
    + "ON bl.id_book = sb.id_book; "
  con.query(sql, [id], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function getStudent(email, callback) {
  sql = "SELECT s.id_student id, s.firstName, s.lastName, s.email, s.password "
    + "FROM student s "
    + "WHERE s.email = ? "
    + "LIMIT 1; "
    con.query(sql, [email], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function getTeacher(email, callback) {
  sql = "SELECT t.id_teacher id, t.firstName, t.lastName, t.email, t.password "
    + "FROM teacher t "
    + "WHERE t.email = ? "
    + "LIMIT 1; "
    con.query(sql, [email], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

module.exports = {getAllBooks, getAllBooksOpt, getStudent, getTeacher}