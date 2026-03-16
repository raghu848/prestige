const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/prestige_db',
});

// Export pool for use in routes/middleware
module.exports = { pool };

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const inquiryRoutes = require('./routes/inquiries');
const testimonialRoutes = require('./routes/testimonials');
const blogRoutes = require('./routes/blog');

// Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blog', blogRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ message: 'Prestige Realty API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
