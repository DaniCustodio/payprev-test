const express = require("express")
const router = express.Router()
const folderService = require("./folder-service")

const create = (req, res, next) => {
	folderService
		.create(req.body)
		.then(() => res.json({}))
		.catch(err => next(err))
}

const update = (req, res, next) => {
	folderService
		.update(req.body.id, req.body.folder)
		.then(() => res.json({}))
		.catch(err => next(err))
}

const getAll = (req, res, next) => {
	folderService
		.getAll(req.body.idUser)
		.then(folders => res.json(folders))
		.catch(err => next(err))
}

const additems = (req, res, next) => {
	folderService
		.addItem(req.body.idFolder, req.body.idUserGithub)
		.then(() => res.json({}))
		.catch(err => next(err))
}

const removeItem = (req, res, next) => {
	folderService
		.removeItem(req.body.idFolder, req.body.idUserGithub)
		.then(() => res.json({}))
		.catch(err => next(err))
}

router.post("/create", create)
router.post("/update", update)
router.post("/additem", additems)
router.post("/removeitem", removeItem)
router.post("/", getAll)

module.exports = router
