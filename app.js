const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');         // <-- you need to create this
const profileRoutes = require('./routes/profile');   // <-- and this
const activityRoutes = require('./routes/activity');
const goalRoutes = require('./routes/goal');

const app = express();
app.use ((cors(
  {
    origin: ["https://deploy-fit-trackr.vercel.app"],
    method: ["POST", "GET"],
    credentials: true
  }
  ));
app.use(express.json());

app.use('/api/auth', authRoutes);          // POST /api/auth/login, /api/auth/register
app.use('/api/profile', profileRoutes);    // GET/PUT/DELETE /api/profile
app.use('/api/activities', activityRoutes);
app.use('/api/goals', goalRoutes);

app.get('/', (req, res) => res.send('Fitness Tracker API'));

const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb+srv://micheal_king:Emma2005@cluster0.lqiwdlj.mongodb.net/FitTrackr?retryWrites=true&w=majority&appName=Cluster0');
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.log(err));

module.exports = app;
