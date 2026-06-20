require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }
});

db.connect((err) => {
  if (err) console.error('DB connection failed:', err);
  else console.log('Connected to Aiven MySQL ✅');
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    if (results.length > 0) res.json({ user: results[0] });
    else res.status(401).json({ error: "Invalid credentials" });
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Reg failed" });
    res.status(201).json({ message: 'User registered' });
  });
});

app.get('/api/rooms', (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/rooms', (req, res) => {
  const { room_number, type, price, image, description, features } = req.body;
  db.query('INSERT INTO rooms (room_number, type, price, image, description, features) VALUES (?, ?, ?, ?, ?, ?)', 
  [room_number, type, price, price, image, description, features], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Room Added' });
  });
});

app.get('/api/bookings', (req, res) => {
  const sql = `
    SELECT bookings.*, users.name AS user_name, rooms.type 
    FROM bookings 
    JOIN users ON bookings.user_id = users.id 
    JOIN rooms ON bookings.room_id = rooms.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/bookings', (req, res) => {
  const { user_id, room_id, check_in, check_out, total_price } = req.body;
  db.query('INSERT INTO bookings (user_id, room_id, check_in, check_out, total_price) VALUES (?, ?, ?, ?, ?)', 
  [user_id, room_id, check_in, check_out, total_price], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Booking Success' });
  });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.query('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Message Received' });
  });
});

app.get('/api/reviews/:room_id', (req, res) => {
  db.query('SELECT reviews.*, users.name FROM reviews JOIN users ON reviews.user_id = users.id WHERE room_id = ?', [req.params.room_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post('/api/reviews', (req, res) => {
  const { user_id, room_id, rating, comment } = req.body;
  db.query('INSERT INTO reviews (user_id, room_id, rating, comment) VALUES (?, ?, ?, ?)', [user_id, room_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Review Posted' });
  });
});

app.listen(process.env.PORT || 5005, () => console.log(`Server running on port ${process.env.PORT || 5005}`));