const mongoose = require('mongoose');
const validator = require('validator');

const CheesePostSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true,
		validate: {
			validator: validator.isURL,
			message: 'Image should be a valid url'
		}
	},
	price: {
		type: Number,
		required: true
	}
});

const CheesePost = mongoose.model('CheesePost', CheesePostSchema);

module.exports = CheesePost;
