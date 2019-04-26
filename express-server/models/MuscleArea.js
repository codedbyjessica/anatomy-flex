const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleAreaSchema = new Schema({
	name: String,
	areaId: Number,
	isDeleted: Boolean
});

module.exports = mongoose.model("MuscleArea", muscleAreaSchema)