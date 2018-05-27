const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const muscleAreaSchema = new Schema({
	name: String,
	areaId: Number
});

module.exports = mongoose.model("MuscleArea", muscleAreaSchema)