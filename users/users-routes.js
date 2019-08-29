const express = require("express")
const router = express.Router()
const userService = require("./user-service")

const register = (req, res, next) => {
	userService
		.create(req.body)
		.then(() => res.json({}))
		.catch(err => next(err))
}

// routes
router.post("/register", register)

module.exports = router
