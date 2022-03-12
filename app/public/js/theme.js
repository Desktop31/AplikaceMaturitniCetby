var date = new Date()
var time = date.getHours()
const night = 19
var swChBox = document.getElementById("themeSwitch")

window.onload = function() {
  let theme = localStorage.getItem("theme")
  if (time >= night || theme === "night") swChBox.checked = true
  else swChBox.checked = false
  setTheme()
}

swChBox.onchange = function() {
  if (swChBox.checked) localStorage.setItem("theme", "night");
  else localStorage.setItem("theme", "day");
  setTheme()
}

function setTheme() {
  let theme = localStorage.getItem("theme")
  if (theme === "night") {
      document.documentElement.style.setProperty("--text", "var(--white)");
      document.documentElement.style.setProperty("--background", "var(--darkBlue)");
      swChBox.classList = "fa-solid fa-sun"
  } else if (theme === "day") {
      document.documentElement.style.setProperty("--text", "var(--darkBlue)");
      document.documentElement.style.setProperty("--background", "var(--white)");
      swChBox.classList = "fa-solid fa-moon"
  }
}