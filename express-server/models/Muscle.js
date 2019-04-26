const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	displayName:  {
		type: String,
		required: true
	},
	origin:  {
		type: String,
		required: true
	},
	insertion:  {
		type: String,
		required: true
	},
	nerve:  {
		type: String,
		required: true
	},
	function:  {
		type: String,
		required: true
	},
	class: {
		type: String,
		default: "muscle"
	},
	group:  {
		type: String,
		required: true
	},
	isDeleted: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("Muscle", muscleSchema)