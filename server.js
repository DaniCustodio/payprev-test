const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// api routes
app.use("/users", require("./users/users-routes"))

const port = process.env.NODE_ENV || "3000"
app.listen(port, () => {
	console.log("Server listening on port " + port)
})
