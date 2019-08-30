const db = require("../_helpers/db")
const Folder = db.Folder

const create = async folderParam => {
	// validate
	if (await Folder.findOne({ name: folderParam.name })) {
		throw `A pasta ${folderParam.name} já existe`
	}

	const folder = new Folder(folderParam)

	// save folder
	await folder.save()
}

const update = async (id, folderParam) => {
	const folder = await Folder.findById(id)
	// validate
	if (!folder) throw "Esta pasta não existe"
	if (
		folder.name !== folderParam.name &&
		(await Folder.findOne({ name: folderParam.name }))
	) {
		throw `A pasta ${folderParam.name} já existe`
	}

	// copy folderParam properties to folder
	Object.assign(folder, folderParam)

	await folder.save()
}

const getAll = async idUser => {
	return await Folder.find({ user: idUser })
}

const getById = async id => {
	return await Folder.findById(id)
}

const addItem = async (idFolder, idUserGithub) => {
	const folder = await Folder.findById(idFolder)

	// validate
	if (!folder) throw "Esta pasta não existe"
	if (folder.items.includes(idUserGithub)) {
		throw "Este usuário já esta na pasta"
	}

	let newitems = folder.items.concat([idUserGithub])

	Object.assign(folder, { items: newitems })

	await folder.save()
}

const removeItem = async (idFolder, idUserGithub) => {
	const folder = await Folder.findById(idFolder)

	// validate
	if (!folder) throw "Esta pasta não existe"
	if (!folder.items.includes(idUserGithub)) {
		throw "Este usuário não esta nesta pasta"
	}

	let newitems = folder.items.filter(item => item != idUserGithub)

	Object.assign(folder, { items: newitems })

	await folder.save()
}

module.exports = {
	create,
	update,
	getAll,
	getById,
	addItem,
	removeItem
}
