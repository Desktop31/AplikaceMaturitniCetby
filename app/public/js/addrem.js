function remBook(bookId) {
  button = window.event.target
  let xhr = new XMLHttpRequest()

  xhr.open("POST", "/student/remove", true)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
  xhr.send("bookId=" + bookId)

  xhr.onload = function() {
    let serverRes = JSON.parse(xhr.response)
    if(xhr.status === 200 && serverRes.success) { 
        button.classList.remove("fa-minus")
        button.classList.add("fa-plus")
        button.title = "Přidat do mého seznamu"
        button.setAttribute("onclick", "addBook(\""+bookId+"\")")
    }
  }
}


function addBook(bookId) {
  button = window.event.target
  let xhr = new XMLHttpRequest()

  xhr.open("POST", "/student/add", true)
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
  xhr.send("bookId=" + bookId)

  xhr.onload = function() {
    let serverRes = JSON.parse(xhr.response)
    if(xhr.status === 200 && serverRes.success) { 
        button.classList.remove("fa-plus")
        button.classList.add("fa-minus")
        button.title = "Odebrat z mého seznamu"
        button.setAttribute("onclick", "remBook(\""+bookId+"\")")
    }
  }
}