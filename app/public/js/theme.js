var date = new Date()
var time = date.getHours()
const night = 19
var swChBox = document.getElementById("themeSwitch")

window.onload = function() {
  let theme = localStorage.getItem("theme")
  if (!theme) {
    if (time >= night) {
      swChBox.checked = true
      setTheme("night")
    } else {
      swChBox.checked = false
      setTheme("day")
    }
  } else if (theme === "night") {
    swChBox.checked = true
    setTheme("night")
  } else if (theme === "day") {
    swChBox.checked = false
    setTheme("day")
  }
}

swChBox.onchange = function() {
  if (swChBox.checked) {
    localStorage.setItem("theme", "night")
    setTheme("night")
  }
  else {
    localStorage.setItem("theme", "day") 
    setTheme("day")
  }
}

function setTheme(theme) {
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
