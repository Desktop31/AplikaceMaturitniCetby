const nm = require("nodemailer")
const { pugEngine } = require("nodemailer-pug-engine")
const dotenv = require("dotenv")
dotenv.config()

const transporter = nm.createTransport({
  host: process.env.EHOST,
  EPORT: process.env.EPORT,
  secure: true,
  auth: {
    user: process.env.EUSER,
    pass: process.env.EPASSW
  }
})

transporter.use("compile", pugEngine({
  templateDir: __dirname + "/email",
  pretty: true
}))

module.exports.sendRegistrationEmail = function(domain, email, token) {
  transporter.sendMail({
    from: process.env.EUSER,
    to: email,
    subject: "Dokončení registrace",
    template: "regConfirm",
    ctx: {
      url: domain + "/newAccount?token=" + token
    }
  }).catch(err => console.log(err))
}

module.exports.sendClassRequestEmail = function(domain, tEmail, confToken, stName, stEmail, stClass) {
  transporter.sendMail({
    from: process.env.EUSER,
    to: tEmail,
    subject: "Žádost o přidání do třídy",
    template: "classRequest",
    ctx: {
      url: domain + "/confirmClass?confToken=" + confToken,
      stName, stEmail, stClass
    }
  }).catch(err => console.log(err))
}