const express = require('express');
const bodyParser = require('body-parser');
const { getStoredPosts, storePosts } = require('../data/posts'); 

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
app.get('/api/posts', async (req, res) => {  // ✅ Changed to "/api/posts"
    const posts = await getStoredPosts();
    res.json({ posts });
});

// Create New Post
app.post('/api/posts', async (req, res) => {  // ✅ Changed to "/api/posts"
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

// ✅ Export for Vercel
module.exports = app;
