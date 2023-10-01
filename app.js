// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

// Connect to MongoDB (replace 'your-mongodb-uri' with your actual MongoDB URI)
mongoose.connect(config.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(bodyParser.json(),cors({
  origin: 'http://localhost:8080', // Replace with the actual origin of your frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

// Routes
const blogRoutes = require('./routes/blog');
app.use('/api/blogs', blogRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
