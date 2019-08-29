const express = require("express")
const app = express()

const port = process.env.NODE_ENV || "3000"

app.listen(port, () => {
	console.log("Server listening on port " + port)
})
