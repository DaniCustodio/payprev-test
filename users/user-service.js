const bcrypt = require("bcryptjs")
const db = require("../_helpers/db")
const User = db.User

const create = async userParam => {
	// validate
	if (await User.findOne({ email: userParam.email })) {
		throw `Email ${userParam.email} already exist`
	}

	const user = new User(userParam)

	// hash password
	if (userParam.password) {
		user.hash = bcrypt.hashSync(userParam.password, 10)
	}

	// save user
	await user.save()
}

module.exports = {
	create
}
