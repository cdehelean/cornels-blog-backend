// Simple Express backend for blog posts
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'posts.json');

app.use(cors());
app.use(express.json());

// Helper to read posts from file
function readPosts() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write posts to file
function writePosts(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8');
}

// GET all posts
app.get('/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

// GET post by id
app.get('/posts/:id', (req, res) => {
  const posts = readPosts();
  const post = posts.find(p => String(p.id) === req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// POST new post
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const posts = readPosts();
  const newPost = {
    id: Date.now(),
    title,
    content,
    author,
    date: new Date().toISOString().slice(0, 10),
  };
  posts.unshift(newPost);
  writePosts(posts);
  res.status(201).json(newPost);
});

// DELETE post by id
app.delete('/posts/:id', (req, res) => {
  const posts = readPosts();
  const id = req.params.id;
  const idx = posts.findIndex(p => String(p.id) === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const deleted = posts.splice(idx, 1)[0];
  writePosts(posts);
  res.json({ success: true, deleted });
});

// PUT update post by id
app.put('/posts/:id', (req, res) => {
  const posts = readPosts();
  const id = req.params.id;
  const idx = posts.findIndex(p => String(p.id) === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  const { title, content, author } = req.body;
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  posts[idx] = {
    ...posts[idx],
    title,
    content,
    author,
    // keep the original date and id
  };
  writePosts(posts);
  res.json(posts[idx]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Blog backend running at http://localhost:${PORT}`);
});