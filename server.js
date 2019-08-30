const express = require("express")
const app = express()
const errorHandler = require("./_helpers/error-handler")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// api routes
app.use("/users", require("./users/users-routes"))
app.use("/github", require("./users-github/users-github-routes"))

// global error handler
app.use(errorHandler)

const port = process.env.NODE_ENV || "3000"
app.listen(port, () => {
	console.log("Server listening on port " + port)
})
