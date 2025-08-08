// app.js
const express = require('express');
const { body, validationResult, query } = require('express-validator');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// POST /addSchool
app.post('/addSchool', [
  body('name').trim().notEmpty().withMessage('name is required'),
  body('address').trim().notEmpty().withMessage('address is required'),
  body('latitude')
    .notEmpty().withMessage('latitude is required')
    .isFloat({ min: -90, max: 90 }).withMessage('latitude must be a number between -90 and 90'),
  body('longitude')
    .notEmpty().withMessage('longitude is required')
    .isFloat({ min: -180, max: 180 }).withMessage('longitude must be a number between -180 and 180')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, address, latitude, longitude } = req.body;

  try {
    const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [name, address, latitude, longitude]);
    return res.status(201).json({ message: 'School added', id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// GET /listSchools?lat=...&lon=...
app.get('/listSchools', [
  query('lat').notEmpty().withMessage('lat is required').isFloat({ min: -90, max: 90 }),
  query('lon').notEmpty().withMessage('lon is required').isFloat({ min: -180, max: 180 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const userLat = parseFloat(req.query.lat);
  const userLon = parseFloat(req.query.lon);

  try {
    // Use Haversine formula in SQL to compute distance (km) and order by it.
    const sql = `
      SELECT id, name, address, latitude, longitude,
        (6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?))
          + sin(radians(?)) * sin(radians(latitude))
        )) AS distance_km
      FROM schools
      ORDER BY distance_km ASC
    `;

    const [rows] = await pool.execute(sql, [userLat, userLon, userLat]);

    return res.json({ count: rows.length, schools: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Basic health check
app.get('/', (req, res) => res.send('School Management API is running'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));