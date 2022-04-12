function classRequest() {
  container = document.createElement("div")
  container.classList.add("popupBg")
  container.id = "popupContainer"

  popup = document.createElement("div")
  popup.classList.add("popup")

  title = document.createElement("h2")
  title.innerText = "Zadejte název třídy"
  popup.appendChild(title)

  form = document.createElement("form")
  form.action = "/resendClassRequest"
  form.method ="post"

  classLabel = document.createElement("label")
  classLabel.for = "stClass"
  form.appendChild(classLabel)

  classInput = document.createElement("input")
  classInput.type = "text"
  classInput.name = "stClass"
  classInput.id = "stClass"
  form.appendChild(classInput)

  form.appendChild(document.createElement("br"))

  confBtn = document.createElement("input")
  confBtn.type = "submit"
  confBtn.name = "confirm"
  confBtn.value = "Odeslat"
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
