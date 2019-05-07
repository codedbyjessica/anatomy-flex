const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	displayName:  {
		type: String,
		required: true
	},
    components: {
        type: Array
    },
    moduleType: {
        type: String
    },
	isDeleted: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("Module", moduleSchema)