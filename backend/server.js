const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const assetRoutes = require('./routes/assetRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API Routes
app.use('/api', assetRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 IT Asset Management System API is Running',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      health: 'GET /api/health',
      stats: 'GET /api/stats',
      assets: 'GET /api/assets',
      createAsset: 'POST /api/assets',
      updateAsset: 'PUT /api/assets/:id',
      assignAsset: 'PATCH /api/assets/:id/assign',
      deleteAsset: 'DELETE /api/assets/:id',
      resetSeed: 'POST /api/assets/seed'
    }
  });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌐 Backend Server running on http://localhost:${PORT}`);
    console.log(`📊 API Health check at http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
};

startServer();
