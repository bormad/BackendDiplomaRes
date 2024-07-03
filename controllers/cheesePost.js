const CheesePost = require('../models/CheesePost');

async function getCheesePosts() {
	return CheesePost.find();
}

async function getCheesePost(id) {
	return CheesePost.findOne({ _id: id });
}

async function addCheesePost(post) {
	const newCheesePost = await CheesePost.create(post);

	return newCheesePost;
}

async function deleteCheesePost(postId) {
	const deletedPost = await CheesePost.deleteOne({ _id: postId });
	return deletedPost;
}

module.exports = {
	getCheesePosts,
	getCheesePost,
	addCheesePost,
	deleteCheesePost
};
