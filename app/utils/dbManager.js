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
  sql = "SELECT bl.name, bl.century, bl.category, bl.active, bl.link, bl.firstName, bl.lastname, sb.id_student, sb.state, bl.id_book "
    + "FROM "
    + "(SELECT b.id_book, b.name, b.century, b.category, b.active, b.link, a.firstName, a.lastName "
    + "FROM book b, author a, book_has_author bha "
    + "WHERE bha.book_id = b.id_book AND bha.author_id = a.id_author "
    + "ORDER BY a.lastName ASC, a.firstName ASC) bl "
    + "LEFT JOIN "
    + "(SELECT s.id_student, b.id_book, shb.state "
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
  sql = "SELECT s.id_student id, s.class_id, s.firstName, s.lastName, s.email, s.password "
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
  sql = "SELECT bl.name, bl.century, bl.category, bl.active, bl.link, bl.firstName, bl.lastname, bl.id_book, sb.order, sb.state, sb.teachersNote "
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

function getClassDetails(id, callback) {
  sql = "SELECT id_class, name, teacher_id, lockTime, lockCount FROM class "
    + "WHERE id_class = ? LIMIT 1; "
  pool.query(sql, [id], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function getStudentDetails(id, callback) {
  sql = "SELECT c.id_class cid, c.name cname, c.teacher_id, st.id_student, st.firstName, st.lastName "
    + "FROM class c, student st "
    + "WHERE c.id_class = st.class_id AND st.id_student = ? LIMIT 1; "
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

function getRemoveRequests(teacherId, callback) {
  sql = "SELECT snb.id_student, snb.firstName, snb.lastName, snb.id_book, snb.name as cname, b.name as bname FROM book b RIGHT JOIN "
    + "(SELECT sn.id_student, sn.firstName, sn.lastName, sn.name, r.id_book, r.date FROM remove_request r JOIN "
    + "(SELECT st.id_student, st.firstName, st.lastName, c.name FROM student st LEFT JOIN class c "
    + "ON st.class_id = c.id_class LEFT JOIN teacher t ON t.id_teacher = c.teacher_id "
    + "WHERE t.id_teacher = ?) as sn ON sn.id_student = r.id_student) as snb ON b.id_book = snb.id_book "
    + "ORDER BY snb.date DESC; "
  pool.query(sql, [teacherId], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function checkRemoveRequests(teacherId, callback) {
  sql = "SELECT COUNT(st.id_student) as reqCount FROM remove_request rr LEFT JOIN student st "
    + "ON st.id_student = rr.id_student LEFT JOIN class c ON st.class_id = c.id_class "
    + "LEFT JOIN teacher t ON t.id_teacher = c.teacher_id WHERE t.id_teacher = ?; "
  pool.query(sql, [teacherId], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function scheduleUnlock(id_class, time, count, callback) {
  sql1 = "UPDATE class SET lockTime = ?, lockCount = ? WHERE id_class = ?; "
  pool.query(sql1, [time, count, id_class], function (err, results) {
    if (err) { 
      callback(err, null)
    } else {
      sql2 = "CREATE EVENT IF NOT EXISTS \`?\` ON SCHEDULE AT ? "
        + "DO UPDATE class SET lockTime = NULL "
        + "WHERE id_class = ?; "
      pool.query(sql2, ["UNLOCK"+id_class, time, id_class], function (error, results) {
        if (err) { 
          callback(error, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

function unlock(id_class, callback) {
  sql1 = "DROP EVENT IF EXISTS \`?\`; "
  pool.query(sql1, ["UNLOCK"+id_class], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      sql2 = "UPDATE class SET lockTime = NULL "
        + "WHERE id_class = ?; "
      pool.query(sql2, [id_class], function (error, results) {
        if (err) { 
          callback(error, null)
        } else {
          callback(null, results)
        }
      })
    }
  })
}

function addBook(stId, bookId, classId, callback) {
  sql1 = "SELECT lockTime FROM class WHERE id_class = ?; "
  pool.query(sql1, [classId], function (err, res) {
    if (err) {
      callback(err, null)
    } else {
      if (res[0].lockTime == null) {
        sql2 = "INSERT INTO student_has_book (`student_id`, `book_id`, `order`) "
          + "VALUES (?, ?, (SELECT COUNT(shb.student_id) FROM student_has_book shb WHERE shb.student_id = ?)); "
        pool.query(sql2, [stId, bookId, stId], function (err, results) {
          if (err) {
            callback(err, null)
          } else {
            callback(null, results)
          }
        })
      }
    }
  })
}

function remBook(stId, bookId, classId, callback) {
  sql1 = "SELECT lockTime FROM class WHERE id_class = ?; "
  pool.query(sql1, [classId], function (err, res) {
    if (err) {
      callback(err, null)
    } else {
      if (res[0].lockTime == null) {
        sql2 = "DELETE FROM student_has_book WHERE student_id = ? AND book_id = ?;  "
        pool.query(sql2, [stId, bookId], function (err, results) {
          if (err) {
            callback(err, null)
          } else {
            callback(null, results)
          }
        })
      }
    }
  })
}

function remRequest(stId, bookId, classId, callback) {
  sql1 = "SELECT c.lockTime FROM class c, student_has_book shb "
    + "WHERE shb.student_id = ? AND shb.book_id = ? AND shb.state = 'done' AND c.id_class = ?; "
  pool.query(sql1, [stId, bookId, classId], function (err, res) {
    if (err) {
      callback(err, null)
    } else {
      if (res.length > 0 && res[0].lockTime == null) {
        sql2 = "REPLACE INTO remove_request (`id_student`, `id_book`) VALUES (?, ?); "
        pool.query(sql2, [stId, bookId], function (err, results) {
          if (err) {
            callback(err, null)
          } else {
            callback(null, results)
          }
        })
      }
    }
  })
}

function acceptRemRequest(stId, bookId, teacherId, callback) {
  sql1 = "SELECT rr.id_book, c.teacher_id FROM remove_request rr LEFT JOIN student st "
    + "ON st.id_student = rr.id_student LEFT JOIN class c ON st.class_id = c.id_class "
    + "LEFT JOIN teacher t ON t.id_teacher = c.teacher_id WHERE st.id_student = ? AND rr.id_book = ?; "
  pool.query(sql1, [stId, bookId], function (err, res) {
    if (err) {
      callback(err, null)
    } else {
      if (res[0].teacher_id == teacherId) {
        sql2 = "DELETE rr, shb FROM remove_request rr JOIN student_has_book shb "
          + "ON rr.id_student = shb.student_id AND rr.id_book = shb.book_id WHERE rr.id_student = ? AND rr.id_book = ?; "
        pool.query(sql2, [stId, bookId], function (err, results) {
          if (err) {
            callback(err, null)
          } else {
            callback(null, results)
          }
        })
      }
    }
  })
}

function denyRemRequest(stId, bookId, teacherId, callback) {
  sql1 = "SELECT rr.id_book, c.teacher_id FROM remove_request rr LEFT JOIN student st "
    + "ON st.id_student = rr.id_student LEFT JOIN class c ON st.class_id = c.id_class "
    + "LEFT JOIN teacher t ON t.id_teacher = c.teacher_id WHERE st.id_student = ? AND rr.id_book = ?; "
  pool.query(sql1, [stId, bookId], function (err, res) {
    if (err) {
      callback(err, null)
    } else {
      if (res[0].teacher_id == teacherId) {
        sql2 = "DELETE FROM remove_request WHERE id_student = ? AND id_book = ?; "
        pool.query(sql2, [stId, bookId], function (err, results) {
          if (err) {
            callback(err, null)
          } else {
            callback(null, results)
          }
        })
      }
    }
  })
}

function updateStateStudent(stId, bookId, state, order, callback) {
  sql = "UPDATE student_has_book SET state = ?, `order` = ? WHERE student_has_book.student_id = ? AND student_has_book.book_id = ? AND state != \"done\"; "
  pool.query(sql, [state, order, stId, bookId], function (err, results) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, results)
    }
  })
}

function updateStateTeacher(teacherId, stId, bookId, done, note, callback) {
  sql1 = "SELECT c.teacher_id FROM student_has_book shb LEFT JOIN student st "
    + "ON st.id_student = shb.student_id LEFT JOIN class c ON st.class_id = c.id_class "
    + "LEFT JOIN teacher t ON t.id_teacher = c.teacher_id WHERE st.id_student = ? AND shb.book_id = ?; "
  pool.query(sql1, [stId, bookId], function (err, res) {
    if (err) {
      callback(err, null)
    } else {
      if (res[0].teacher_id == teacherId) {
        if (done) { // prikaz s nastavenim done
          sql2 = "UPDATE student_has_book SET state = \"done\", teachersNote = ? WHERE student_has_book.student_id = ? AND student_has_book.book_id = ?; "
        } else { // prikaz s oderbranim done
          sql2 = "UPDATE student_has_book SET state = \"unread\", teachersNote = ? WHERE student_has_book.student_id = ? AND student_has_book.book_id = ?; "
        }
        pool.query(sql2, [note, stId, bookId], function (err, results) {
          if (err) {
            callback(err, null)
          } else {
            callback(null, results)
          }
        })
      }
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
  getClassDetails,
  getStudentDetails,
  getClassStudents,
  getRemoveRequests,
  checkRemoveRequests,
  scheduleUnlock,
  unlock,
  addBook,
  remBook,
  remRequest,
  acceptRemRequest,
  denyRemRequest,
  updateStateStudent,
  updateStateTeacher
}