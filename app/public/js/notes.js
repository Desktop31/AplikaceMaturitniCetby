function notesStudent(bid, bname, bstate, border, tnote) {
  container = document.createElement("div")
  container.classList.add("popupBg")
  container.id = "popupContainer"

  popup = document.createElement("div")
  popup.classList.add("popup")

  title = document.createElement("h2")
  title.innerText = "Poznámky ke knize " + bname
  popup.appendChild(title)

  form = document.createElement("form")
  form.action = "/student/updateNotes"
  form.method ="post"
  
  bookId = document.createElement("input")
  bookId.type = "hidden"
  bookId.name = "bookId"
  bookId.value = bid
  form.appendChild(bookId)


  if (bstate != "done") {
    unreadLabel = document.createElement("label")
    unreadLabel.htmlFor = "unread"
    unreadLabel.innerText = "Nečteno"
    unreadLabel.classList.add("radioLabel")
    unread = document.createElement("input")
    unread.type = "radio"
    unread.id = "unread"
    unread.name = "readState"
    unread.value = "unread"
    unreadLabel.appendChild(unread)
    form.appendChild(unreadLabel)
    
    readLabel = document.createElement("label")
    readLabel.htmlFor = "read"
    readLabel.innerText = "Přečteno"
    readLabel.classList.add("radioLabel")
    read = document.createElement("input")
    read.type = "radio"
    read.id = "read"
    read.name = "readState"
    read.value = "read"
    readLabel.appendChild(read)
    form.appendChild(readLabel)

    switch (bstate) {
      case "unread": 
        unread.checked = true
        break
      case "read":
        read.checked = true
        break
    }

  } else {
    doneLabel = document.createElement("label")
    doneLabel.htmlFor = "done"
    doneLabel.innerText = "Kniha otestována"
    form.appendChild(doneLabel)
  }

  form.appendChild(document.createElement("br"))

  orderLabel = document.createElement("label")
  orderLabel.htmlFor = "order"
  orderLabel.innerText = "Pořadí: "
  order = document.createElement("input")
  order.type = "number"
  order.name = "order"
  order.min = 1
  order.max = 20
  order.value = border
  order.required = true
  form.appendChild(orderLabel)
  form.appendChild(order)

  title = document.createElement("h4")
  title.innerText = "Poznámka učitele:"
  form.appendChild(title)

  note = document.createElement("textarea")
  if (tnote == "null") note.textContent = "Žádná poznámka"
  else note.textContent = decodeURI(tnote)
  note.disabled = true
  form.appendChild(note)

  form.appendChild(document.createElement("br"))

  if (bstate != "done") {
    confBtn = document.createElement("input")
    confBtn.type = "submit"
    confBtn.name = "confirm"
    confBtn.value = "Potvrdit změny"
    form.appendChild(confBtn)
  }

  cancelBtn = document.createElement("input")
  cancelBtn.type = "button"
  cancelBtn.value = "Zavřít"
  cancelBtn.addEventListener("click", hide)
  form.appendChild(cancelBtn)

  popup.appendChild(form)
  container.appendChild(popup)
  document.body.appendChild(container)
}


function notesTeacher(stId, bid, bname, bstate, tnote) {
  container = document.createElement("div")
  container.classList.add("popupBg")
  container.id = "popupContainer"

  popup = document.createElement("div")
  popup.classList.add("popup")

  title = document.createElement("h2")
  title.innerText = "Poznámky ke knize " + bname
  popup.appendChild(title)

  form = document.createElement("form")
  form.action = "/teacher/updateNotes"
  form.method ="post"
  
  studentId = document.createElement("input")
  studentId.type = "hidden"
  studentId.name = "studentId"
  studentId.value = stId
  form.appendChild(studentId)

  bookId = document.createElement("input")
  bookId.type = "hidden"
  bookId.name = "bookId"
  bookId.value = bid
  form.appendChild(bookId)

  doneLabel = document.createElement("label")
  doneLabel.htmlFor = "done"
  doneLabel.innerText = "Kniha otestována"
  doneLabel.classList.add("radioLabel")
  done = document.createElement("input")
  done.type = "checkbox"
  done.id = "done"
  done.name = "done"
  done.value = "done"
  if (bstate == "done") done.checked = true
  else done.checked = false
  doneLabel.appendChild(done)
  form.appendChild(doneLabel)

  title = document.createElement("h4")
  title.innerText = "Poznámka učitele (vidí žák):"
  form.appendChild(title)

  note = document.createElement("textarea")
  if (tnote == "null") note.textContent = "Žádná poznámka"
  else note.textContent = decodeURI(tnote)
  note.name = "note"
  note.maxLength = "255"
  form.appendChild(note)

  form.appendChild(document.createElement("br"))

  confBtn = document.createElement("input")
  confBtn.type = "submit"
  confBtn.name = "confirm"
  confBtn.value = "Potvrdit změny"
  form.appendChild(confBtn)

  cancelBtn = document.createElement("input")
  cancelBtn.type = "button"
  cancelBtn.value = "Zavřít"
  cancelBtn.addEventListener("click", hide)
  form.appendChild(cancelBtn)

  popup.appendChild(form)
  container.appendChild(popup)
  document.body.appendChild(container)
}

function hide() {
  container = document.getElementById("popupContainer")
  container.remove()
}