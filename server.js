// server.js



require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // set this in .env

// (Optional) quick sanity check — remove after it prints true once
console.log('ENV MONGO_URI loaded?', Boolean(MONGO_URI));




mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    start();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.warn('⚠️  Starting without DB — pages will render but auth/data won\'t work.');
    start();
  });

function start() {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use. Run: lsof -ti :${PORT} | xargs kill -9`);
    } else {
      console.error('❌ Server error:', err.message);
    }
    process.exit(1);
  });
}
