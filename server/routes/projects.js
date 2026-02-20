const express = require('express');
const { pool } = require('../index');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all projects with filters
router.get('/', async (req, res) => {
  try {
    const {
      category,
      status,
      city,
      min_price,
      max_price,
      bhk,
      min_area,
      max_area,
      page = 1,
      limit = 12,
    } = req.query;

    let query = 'SELECT * FROM projects WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (city) {
      paramCount++;
      query += ` AND city ILIKE $${paramCount}`;
      params.push(`%${city}%`);
    }

    if (min_price) {
      paramCount++;
      query += ` AND price_max >= $${paramCount}`;
      params.push(min_price);
    }

    if (max_price) {
      paramCount++;
      query += ` AND price_min <= $${paramCount}`;
      params.push(max_price);
    }

    if (bhk) {
      paramCount++;
      query += ` AND bhk ILIKE $${paramCount}`;
      params.push(`%${bhk}%`);
    }

    if (min_area) {
      paramCount++;
      query += ` AND built_up_area_max >= $${paramCount}`;
      params.push(min_area);
    }

    if (max_area) {
      paramCount++;
      query += ` AND built_up_area_min <= $${paramCount}`;
      params.push(max_area);
    }

    // Only show published projects for non-agents
    if (!req.user) {
      query += ` AND published_at IS NOT NULL`;
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);
    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), offset);

    const result = await pool.query(query, params);

    // Get total count
    const countQuery = query.replace(/SELECT \*/, 'SELECT COUNT(*)').replace(/ORDER BY.*$/, '');
    const countResult = await pool.query(countQuery, params.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);

    res.json({
      projects: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project by slug
router.get('/:category/:slug', async (req, res) => {
  try {
    const { category, slug } = req.params;

    const result = await pool.query(
      `SELECT p.*, 
              a.first_name as agent_first_name, 
              a.last_name as agent_last_name,
              a.email as agent_email,
              a.phone as agent_phone
       FROM projects p
       LEFT JOIN agents a ON p.agent_id = a.id
       WHERE p.slug = $1 AND p.category = $2`,
      [slug, category]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const project = result.rows[0];

    // Get related projects
    const relatedResult = await pool.query(
      `SELECT id, name, slug, category, hero_image_url, price_min, price_max, city
       FROM projects
       WHERE category = $1 AND id != $2 AND published_at IS NOT NULL
       LIMIT 4`,
      [category, project.id]
    );

    res.json({
      project,
      related: relatedResult.rows,
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project (agent only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      status,
      address,
      city,
      state,
      pincode,
      lat,
      lng,
      price_min,
      price_max,
      bhk,
      built_up_area_min,
      built_up_area_max,
      description,
      overview,
      amenities,
      hero_image_url,
      image_urls,
      meta_title,
      meta_description,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO projects (
        name, slug, category, status, address, city, state, pincode,
        location_coords, price_min, price_max, bhk,
        built_up_area_min, built_up_area_max, description, overview,
        amenities, hero_image_url, image_urls, meta_title, meta_description, agent_id, published_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, POINT($9, $10), $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      RETURNING *`,
      [
        name,
        slug,
        category,
        status,
        address,
        city,
        state,
        pincode,
        lat,
        lng,
        price_min,
        price_max,
        bhk,
        built_up_area_min,
        built_up_area_max,
        description,
        overview,
        JSON.stringify(amenities || []),
        hero_image_url,
        JSON.stringify(image_urls || []),
        meta_title,
        meta_description,
        req.user.id,
        status === 'ongoing' || status === 'completed' ? new Date() : null,
      ]
    );

    res.status(201).json({ project: result.rows[0] });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (agent only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check ownership
    const checkResult = await pool.query(
      'SELECT agent_id FROM projects WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (checkResult.rows[0].agent_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Build update query dynamically
    const fields = [];
    const values = [];
    let paramCount = 0;

    Object.keys(updateData).forEach((key) => {
      if (key === 'lat' || key === 'lng') return; // Handle separately
      paramCount++;
      fields.push(`${key} = $${paramCount}`);
      if (key === 'amenities' || key === 'image_urls') {
        values.push(JSON.stringify(updateData[key]));
      } else {
        values.push(updateData[key]);
      }
    });

    if (updateData.lat && updateData.lng) {
      paramCount++;
      fields.push(`location_coords = POINT($${paramCount}, $${paramCount + 1})`);
      values.push(updateData.lat, updateData.lng);
      paramCount++;
    }

    values.push(id);
    paramCount++;

    const query = `UPDATE projects SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`;

    const result = await pool.query(query, values);

    res.json({ project: result.rows[0] });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (agent only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const checkResult = await pool.query(
      'SELECT agent_id FROM projects WHERE id = $1',
      [id]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (checkResult.rows[0].agent_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await pool.query('DELETE FROM projects WHERE id = $1', [id]);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;





