var date = new Date()
var time = date.getHours()
const night = 19
var swChBox = document.getElementById("themeSwitch")

window.onload = function() {
  let theme = localStorage.getItem("theme")
  console.log(time >= night || theme === "night")
  if (time >= night || theme === "night") {
    swChBox.checked = true
    localStorage.setItem("theme", "night");
  }
  if (theme === "day") {
    swChBox.checked = false
    localStorage.setItem("theme", "day");
  }
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
