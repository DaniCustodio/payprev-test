const bcrypt = require("bcryptjs")
const db = require("../_helpers/db")
const User = db.User

const create = async userParam => {
	// validate
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
		const { hash, ...userWithoutHash } = user.toObject()
		return {
			...userWithoutHash
		}
	}
}

module.exports = {
	create,
	auth
}
