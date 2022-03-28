const mysql = require("mysql")
const dotenv = require("dotenv")
dotenv.config()

const pool = mysql.createPool({ // pool se sám postará o výpadky/znovu připojení databáze
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
  pool.query(sql, function (err, results) {
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
    + "ON bl.id_book = sb.id_book "
    + "ORDER BY bl.lastName ASC, bl.firstName ASC; "
    pool.query(sql, [id], function (err, results) {
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
    pool.query(sql, [email], function (err, results) {
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
    pool.query(sql, [email], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function getPersonalBooklist(id, callback) {
  sql = "SELECT bl.name, bl.century, bl.category, bl.active, bl.link, bl.firstName, bl.lastname, sb.order, sb.state, sb.teachersNote "
    + "FROM "
    + "(SELECT b.id_book, b.name, b.century, b.category, b.active, b.link, a.firstName, a.lastName "
    + "FROM book b, author a, book_has_author bha "
    + "WHERE bha.book_id = b.id_book AND bha.author_id = a.id_author "
    + "ORDER BY a.lastName ASC, a.firstName ASC) bl "
    + "INNER JOIN "
    + "(SELECT s.id_student id, b.id_book, shb.order, shb.state, shb.teachersNote "
    + "FROM student s, book b, student_has_book shb "
    + "WHERE s.id_student = shb.student_id AND b.id_book = shb.book_id AND s.id_student = ?) sb "
    + "ON bl.id_book = sb.id_book "
    + "ORDER BY bl.lastName ASC, bl.firstName ASC; "
    pool.query(sql, [id], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function getClasslist(id, callback) {
  sql = "SELECT id_class id, name, lockTime, lockCount FROM class "
    + "WHERE teacher_id = ? ORDER BY name; "
    pool.query(sql, [id], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function getClassStudents(id, callback) {
  sql = "SELECT id_student id, firstName, lastName FROM student "
    + "WHERE class_id = ? ORDER BY lastName ASC; "
    pool.query(sql, [id], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

module.exports = {
  getAllBooks, 
  getAllBooksOpt, 
  getStudent, 
  getTeacher, 
  getPersonalBooklist,
  getClasslist,
  getClassStudents
}