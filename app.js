const express = require('express');
const mongoose = require('mongoose');
const {
	addCheesePost,
	getCheesePosts,
	getCheesePost,
	deleteCheesePost
} = require('./controllers/cheesePost');

const mapCheesePost = require('./helpers/mapCheesePost');
const mapUser = require('./helpers/mapUser');
const { register, login, updateUser } = require('./controllers/user');

const port = 4444;

const app = express();

app.use(express.json());

// Работа с постами
app.get('/posts', async (req, res) => {
	const CheesePosts = await getCheesePosts();

	res.send(CheesePosts.map((item) => mapCheesePost(item)));
});

app.get('/post/:id', async (req, res) => {
	const CheesePost = await getCheesePost(req.params.id);

	res.send(mapCheesePost(CheesePost));
});

app.delete('/post/:id', async (req, res) => {
	const postId = req.params.id;
	await deleteCheesePost(postId);
	res.send('Пост удален');
});

app.post('/post', async (req, res) => {
	const newCheesePost = await addCheesePost({
		title: req.body.title,
		content: req.body.content,
		image: req.body.image,
		price: req.body.price
	});

	const CheesePosts = await getCheesePosts();

	res.send(CheesePosts.map((item) => mapCheesePost(item)));
});

//----------------------------------------------------------------------------------------//

// Работа с пользователями

app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password);

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

app.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

app.patch('/patchUser', async (req, res) => {
	try {
		const userId = req.body.userId;
		const updatedUserData = req.body.updatedData;

		const updatedUser = await updateUser(userId, updatedUserData);

		res.send({ error: null, user: mapUser(updatedUser) });
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});

app.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({});
});

//----------------------------------------------------------------------------------------//

mongoose
	.connect(
		'mongodb+srv://admin:123@cluster0.wpnqajf.mongodb.net/cheeses?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server started on port ${port}`);
		});
	});
