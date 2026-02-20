const express = require('express');
const { pool } = require('../index');

const router = express.Router();

// Get testimonials
router.get('/', async (req, res) => {
  try {
    const { project_id, featured } = req.query;

    let query = 'SELECT * FROM testimonials WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (project_id) {
      paramCount++;
      query += ` AND project_id = $${paramCount}`;
      params.push(project_id);
    }

    if (featured === 'true') {
      paramCount++;
      query += ` AND is_featured = $${paramCount}`;
      params.push(true);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);

    res.json({ testimonials: result.rows });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

module.exports = router;





