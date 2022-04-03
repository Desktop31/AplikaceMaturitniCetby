/* popup 
- Uzamknout výběr děl pro třídu XYZ
- form:
  - výběr konečného data (od aktuálního)
  - výběr počtu knih k uzamčení
  - submit button (Potvrdit)
  - cancel button (Zrušit)
*/

function lock(cid, cname) {
  container = document.createElement("div")
  container.classList.add("popupBg")
  container.id = "popupContainer"

  popup = document.createElement("div")
  popup.classList.add("popup")

  title = document.createElement("h2")
  title.innerText = "Uzamknout výběr děl pro třídu " + cname
  popup.appendChild(title)

  form = document.createElement("form")
  form.action = "/teacher/locking"
  form.method ="post"
  
  classId = document.createElement("input")
  classId.type = "hidden"
  classId.name = "classId"
  classId.value = cid
  form.appendChild(classId)

  dateLabel = document.createElement("label")
  dateLabel.htmlFor = "unlockDate"
  dateLabel.innerText = "Datum odemčení: "
  date = document.createElement("input")
  date.type = "datetime-local"
  date.name = "unlockDate"
  d = new Date(Date.now() + (24*60*60*1000)).toISOString()
  date.min = d.slice(0, 19)
  date.step = "1"
  date.required = true
  form.appendChild(dateLabel)
  form.appendChild(date)
  form.appendChild(document.createElement("br"))

  countLabel = document.createElement("label")
  countLabel.htmlFor = "count"
  countLabel.innerText = "Počet děl k testu: "
  count = document.createElement("input")
  count.type = "number"
  count.name = "count"
  count.min = 1
  count.max = 20
  count.value = 20
  count.required = true
  form.appendChild(countLabel)
  form.appendChild(count)
  form.appendChild(document.createElement("br"))

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

/* popup
- Opravdu chcete předčasně odemknout možnost výběru pro třídu XYZ?
- form:
  - submit button (ano)
  - cancel button (ne)
*/
function unlock(cid, cname) {
  container = document.createElement("div")
  container.classList.add("popupBg")
  container.id = "popupContainer"

  popup = document.createElement("div")
  popup.classList.add("popup")

  title = document.createElement("h2")
  title.innerText = "Opravdu chcete předčasně odemknout možnost výběru pro třídu " + cname + "?"
  popup.appendChild(title)

  form = document.createElement("form")
  form.action = "/teacher/locking"
  form.method ="post"

  classId = document.createElement("input")
  classId.type = "hidden"
  classId.name = "classId"
  classId.value = cid
  form.appendChild(classId)

  confBtn = document.createElement("input")
  confBtn.type = "submit"
  confBtn.name = "confirm"
  confBtn.value = "Ano"
  form.appendChild(confBtn)

  cancelBtn = document.createElement("input")
  cancelBtn.type = "button"
  cancelBtn.value = "Ne"
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