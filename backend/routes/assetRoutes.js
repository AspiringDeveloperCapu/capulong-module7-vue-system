const express = require('express');
const router = express.Router();
const storage = require('../services/storage');
const { checkStatus } = require('../config/db');

// @route   GET /api/health
// @desc    Get API Health & Storage engine mode
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'IT Asset Management System API',
    database: checkStatus(),
    timestamp: new Date().toISOString()
  });
});

// @route   GET /api/stats
// @desc    Get dashboard metrics & inventory summary
router.get('/stats', (req, res) => {
  const assets = storage.getAll();
  const totalAssets = assets.length;
  const available = assets.filter(a => a.status === 'Available').length;
  const assigned = assets.filter(a => a.status === 'Assigned').length;
  const maintenance = assets.filter(a => a.status === 'Under Maintenance').length;
  const retired = assets.filter(a => a.status === 'Retired').length;
  const totalValue = assets.reduce((sum, a) => sum + (Number(a.cost) || 0), 0);

  // Breakdown by asset type
  const typeBreakdown = {};
  assets.forEach(a => {
    typeBreakdown[a.assetType] = (typeBreakdown[a.assetType] || 0) + 1;
  });

  res.json({
    totalAssets,
    available,
    assigned,
    maintenance,
    retired,
    totalValue,
    typeBreakdown
  });
});

// @route   GET /api/assets
// @desc    Get all assets with optional filtering & search
router.get('/assets', (req, res) => {
  const { search, status, assetType } = req.query;
  const assets = storage.find({ search, status, assetType });
  res.json({
    count: assets.length,
    assets
  });
});

// @route   GET /api/assets/:id
// @desc    Get single asset by ID
router.get('/assets/:id', (req, res) => {
  const asset = storage.findById(req.params.id);
  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' });
  }
  res.json(asset);
});

// @route   POST /api/assets
// @desc    Create a new IT asset record
router.post('/assets', (req, res) => {
  const { assetName, assetType, serialNumber } = req.body;

  if (!assetName || !serialNumber) {
    return res.status(400).json({ error: 'Asset name and serial number are required' });
  }

  // Check duplicate serial number
  const existing = storage.getAll().find(a => a.serialNumber.toLowerCase() === serialNumber.toLowerCase());
  if (existing) {
    return res.status(400).json({ error: `Asset with serial number ${serialNumber} already exists` });
  }

  const newAsset = storage.create(req.body);
  res.status(201).json({
    message: 'Asset successfully recorded',
    asset: newAsset
  });
});

// @route   PUT /api/assets/:id
// @desc    Update an asset record
router.put('/assets/:id', (req, res) => {
  const updated = storage.update(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ error: 'Asset not found' });
  }
  res.json({
    message: 'Asset successfully updated',
    asset: updated
  });
});

// @route   PATCH /api/assets/:id/assign
// @desc    Assign or return an asset
router.patch('/assets/:id/assign', (req, res) => {
  const { assignedTo, status } = req.body;
  const asset = storage.findById(req.params.id);

  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' });
  }

  const newStatus = status || (assignedTo && assignedTo !== 'Unassigned' ? 'Assigned' : 'Available');
  const updated = storage.update(req.params.id, {
    assignedTo: assignedTo || 'Unassigned',
    status: newStatus
  });

  res.json({
    message: `Asset status updated to ${newStatus}`,
    asset: updated
  });
});

// @route   DELETE /api/assets/:id
// @desc    Delete an asset record
router.delete('/assets/:id', (req, res) => {
  const success = storage.delete(req.params.id);
  if (!success) {
    return res.status(404).json({ error: 'Asset not found' });
  }
  res.json({ message: 'Asset successfully removed from inventory' });
});

// @route   POST /api/assets/seed
// @desc    Reset inventory to initial demo dataset
router.post('/assets/seed', (req, res) => {
  const seeded = storage.seed();
  res.json({
    message: 'Inventory successfully reset to demo dataset',
    count: seeded.length,
    assets: seeded
  });
});

module.exports = router;
