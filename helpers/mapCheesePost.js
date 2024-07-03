module.exports = function (cheesePost) {
	return {
		id: cheesePost.id,
		title: cheesePost.title,
		content: cheesePost.content,
		image: cheesePost.image,
		price: cheesePost.price
	};
};
