const mongoose = require("mongoose")
const Schema = mongoose.Schema

const schema = new Schema({
	name: { type: String, unique: true, required: true },
	items: [{ type: Schema.Types.ObjectId, ref: "UserGithub" }],
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	createdDate: { type: Date, default: Date.now }
})

schema.set("toJSON", { virtuals: true })

module.exports = mongoose.model("Folder", schema)
