const express = require('express');
const mongoose = require('mongoose');
const app = express();
   const cors = require('cors');
   app.use(cors());
const Ritual = require('./models/Ritual');
//const { startNotificationScheduler } = require('./notifications');

app.use(express.json());

mongoose.connect('process.env.MONGODB_URI')
.then(() => {
  console.log('Connected to MongoDB');
  //startNotificationScheduler();
})
.catch((err) => {
  console.log('MongoDB connection error:', err);
});

// CREATE a new ritual
app.post('/api/rituals', async (req, res) => {
  try {
    const newRitual = new Ritual(req.body);
    await newRitual.save();
    res.status(201).json(newRitual);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all rituals
app.get('/api/rituals', async (req, res) => {
  try {
    const rituals = await Ritual.find();
    res.json(rituals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single ritual by ID
app.get('/api/rituals/:id', async (req, res) => {
  try {
    const ritual = await Ritual.findById(req.params.id);
    if (!ritual) return res.status(404).json({ error: 'Ritual not found' });
    res.json(ritual);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a ritual by ID
app.put('/api/rituals/:id', async (req, res) => {
  try {
    const ritual = await Ritual.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ritual) return res.status(404).json({ error: 'Ritual not found' });
    res.json(ritual);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a ritual by ID
app.delete('/api/rituals/:id', async (req, res) => {
  try {
    const ritual = await Ritual.findByIdAndDelete(req.params.id);
    if (!ritual) return res.status(404).json({ error: 'Ritual not found' });
    res.json({ message: 'Ritual deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Basic Route
app.get('/', (req, res) => {
  res.send('Ritual Tracker Backend is Running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});