function swapPopup(bid, bname) {
  container = document.createElement("div")
  container.classList.add("popupBg")
  container.id = "popupContainer"

  popup = document.createElement("div")
  popup.classList.add("popup")

  title = document.createElement("h2")
  title.innerText = "Požádat o odebrání knihy " + bname
  popup.appendChild(title)

  form = document.createElement("form")
  form.action = "/student/removeRequest"
  form.method ="post"
  
  bookId = document.createElement("input")
  bookId.type = "hidden"
  bookId.name = "bookId"
  bookId.value = bid
  form.appendChild(bookId)

  confBtn = document.createElement("input")
  confBtn.type = "submit"
  confBtn.name = "confirm"
  confBtn.value = "Potvrdit"
  form.appendChild(confBtn)

  cancelBtn = document.createElement("input")
  cancelBtn.type = "button"
  cancelBtn.value = "Zrušit"
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