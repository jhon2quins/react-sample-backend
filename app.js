const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();
app.use(bodyParser.json());

// CORS Headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Root Route (To Check If Backend is Running)
app.get('/', (req, res) => {
	res.send('Backend is running!');
});

// Get All Posts (Missing in Your Code)
app.get('/posts', async (req, res) => {
	const posts = await getStoredPosts();
	res.json({ posts });
});

// Create New Post
app.post('/posts', async (req, res) => {
	const existingPosts = await getStoredPosts();
	const postData = req.body;
	const newPost = {
		...postData,
		id: Math.random().toString()
	};
	const updatedPosts = [newPost, ...existingPosts];
	await storePosts(updatedPosts);
	res.status(201).json({ message: 'Stored new post.', post: newPost });
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));