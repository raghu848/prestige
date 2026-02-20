const express = require('express');
const { pool } = require('../index');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Create inquiry
router.post('/', async (req, res) => {
  try {
    const {
      project_id,
      name,
      email,
      phone,
      message,
      inquiry_type,
      budget_min,
      budget_max,
      preferred_bhk,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO inquiries (
        project_id, name, email, phone, message, inquiry_type,
        budget_min, budget_max, preferred_bhk
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        project_id,
        name,
        email,
        phone,
        message,
        inquiry_type || 'general',
        budget_min,
        budget_max,
        preferred_bhk,
      ]
    );

    res.status(201).json({ inquiry: result.rows[0] });
  } catch (error) {
    console.error('Create inquiry error:', error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// Get inquiries (agent only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { project_id, status, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT i.*, p.name as project_name, p.slug as project_slug
      FROM inquiries i
      LEFT JOIN projects p ON i.project_id = p.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (req.user.role !== 'admin') {
      paramCount++;
      query += ` AND i.agent_id = $${paramCount}`;
      params.push(req.user.id);
    }

    if (project_id) {
      paramCount++;
      query += ` AND i.project_id = $${paramCount}`;
      params.push(project_id);
    }

    if (status) {
      paramCount++;
      query += ` AND i.status = $${paramCount}`;
      params.push(status);
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY i.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    res.json({ inquiries: result.rows });
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// Update inquiry status (agent only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, agent_notes } = req.body;

    const result = await pool.query(
      `UPDATE inquiries 
       SET status = $1, agent_notes = $2, agent_id = $3, updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING *`,
      [status, agent_notes, req.user.id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }

    res.json({ inquiry: result.rows[0] });
  } catch (error) {
    console.error('Update inquiry error:', error);
    res.status(500).json({ error: 'Failed to update inquiry' });
  }
});

module.exports = router;





