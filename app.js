const express = require("express")
const app = express()
const errorHandler = require("./_helpers/error-handler")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// api routes
app.get("/", (req, res) => res.status(200).send())
app.use("/users", require("./users/users-routes"))
app.use("/github", require("./users-github/users-github-routes"))
app.use("/folders", require("./folders/folders-routes"))

// global error handler
app.use(errorHandler)

module.exports = app
