const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPosts, storePosts } = require('../data/posts'); // ✅ Adjust path

const app = express();
app.use(bodyParser.json());

// CORS Headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Root Route (For Testing)
app.get('/', (req, res) => {
	res.send('Backend is running on Vercel!');
});

// Get All Posts
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

// Export as Vercel API handler (IMPORTANT!)
module.exports = app;
