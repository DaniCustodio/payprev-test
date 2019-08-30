const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
	login: { type: String, unique: true, required: true },
	name: { type: String, required: false },
	bio: { type: String, required: false },
	location: { type: String, required: false },
	html_url: { type: String, required: true },
	createdDate: { type: Date, default: Date.now }
})

schema.set("toJSON", { virtuals: true })

module.exports = mongoose.model("UserGithub", schema)
