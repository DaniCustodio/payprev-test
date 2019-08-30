const fetch = require("node-fetch")
const db = require("../_helpers/db")
const UserGithub = db.UserGithub

const create = async userParam => {
	// validate
	if (await UserGithub.findOne({ login: userParam.login })) {
		throw `O usuário ${userParam.login} já foi adcionado ao banco de dados`
	}

	const userGithub = new UserGithub(userParam)

	// save user
	await userGithub.save()
}

const getAll = async () => {
	return await UserGithub.find()
}

const searchUser = async login => {
	const GITHUB_URL = `https://api.github.com/users/${login}`
	return await fetch(GITHUB_URL)
		.then(response => response.json())
		.then(user => ({
			login: user.login,
			name: user.name,
			bio: user.bio,
			location: user.location,
			html_url: user.html_url
		}))
		.catch(err => {
			throw "Usuário não encontrado"
		})
}

module.exports = {
	create,
	getAll,
	searchUser
}
