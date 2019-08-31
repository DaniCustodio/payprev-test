const bcrypt = require("bcryptjs")
const config = require("../config.json")
const jwt = require("jsonwebtoken")
const db = require("../_helpers/db")
const User = db.User

const create = async userParam => {
	// validate params
	const cpfregex = /^\d{3}\d{3}\d{3}\d{2}$/
	if (!cpfregex.test(userParam.cpf)) {
		throw "Cpf inválido"
	}
	const emailregex = /[\w-]+@([\w-]+\.)+[\w-]+/
	if (!emailregex.test(userParam.email)) {
		throw "Email inválido"
	}
	const passwordregex = /^.{4,12}$/
	if (!passwordregex.test(userParam.password)) {
		throw "Senha inválida"
	}

	// validate database
	if (await User.findOne({ email: userParam.email })) {
		throw "Esse email já foi cadastrado"
	}
	if (await User.findOne({ cpf: userParam.cpf })) {
		throw "Esse cpf já foi cadastrado"
	}

	const user = new User(userParam)

	// hash password
	if (userParam.password) {
		user.hash = bcrypt.hashSync(userParam.password, 10)
	}

	// save user
	await user.save()
}

const auth = async ({ email, password }) => {
	const user = await User.findOne({ email })
	if (user && bcrypt.compareSync(password, user.hash)) {
		const token = jwt.sign(
			{ id: user.id, isAdmin: user.isAdmin },
			config.secret
		)
		const { hash, ...userWithoutHash } = user.toObject()
		return {
			...userWithoutHash,
			token
		}
	}
}

module.exports = {
	create,
	auth
}
