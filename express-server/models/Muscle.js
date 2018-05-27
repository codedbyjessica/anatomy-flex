const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is what a pet is
const muscleSchema = new Schema({
	name: String,
	displayName: String,
	origin: String,
	insertion: String,
	nerve: String,
	function: String,
	class: {
		type: String,
		default: "muscle"
	},
	group: String
});

module.exports = mongoose.model("Muscle", muscleSchema)