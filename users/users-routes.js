const express = require("express")
const router = express.Router()
const userService = require("./user-service")

const register = (req, res, next) => {
	userService
		.create(req.body)
		.then(() => res.json({}))
		.catch(err => next(err))
}

const auth = (req, res, next) => {
	userService
		.auth(req.body)
		.then(user =>
			user
				? res.json(user)
				: res.status(400).json({ message: "Email ou senha incorreta" })
		)
		.catch(err => next(err))
}

// routes
router.post("/register", register)
router.post("/auth", auth)

module.exports = router
