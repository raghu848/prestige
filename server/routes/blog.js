const express = require('express');
const { pool } = require('../index');

const router = express.Router();

// Get blog posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const result = await pool.query(
      `SELECT b.*, a.first_name, a.last_name
       FROM blog_posts b
       LEFT JOIN agents a ON b.author_id = a.id
       WHERE b.published = true
       ORDER BY b.published_at DESC
       LIMIT $1 OFFSET $2`,
      [parseInt(limit), offset]
    );

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM blog_posts WHERE published = true'
    );

    res.json({
      posts: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: parseInt(countResult.rows[0].count),
      },
    });
  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Get single post
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      `SELECT b.*, a.first_name, a.last_name
       FROM blog_posts b
       LEFT JOIN agents a ON b.author_id = a.id
       WHERE b.slug = $1 AND b.published = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ post: result.rows[0] });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

module.exports = router;





