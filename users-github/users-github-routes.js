const express = require("express")
const router = express.Router()
const authorize = require("../_helpers/authorize")
const userGithubService = require("./user-github-service")

const getAll = (req, res, next) => {
	userGithubService
		.getAll()
		.then(users => res.json(users))
		.catch(err => next(err))
}

const add = (req, res, next) => {
	userGithubService
		.create(req.body)
		.then(() => res.json({}))
		.catch(err => next(err))
}

const search = (req, res, next) => {
	userGithubService
		.searchUser(req.query.login)
		.then(githubUser => res.json(githubUser))
		.catch(err => next(err))
}

// routes
router.get("/", authorize("user"), getAll)
router.get("/search", authorize("admin"), search)
router.post("/add", authorize("admin"), add)

module.exports = router
