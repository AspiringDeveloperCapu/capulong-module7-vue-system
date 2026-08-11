const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: [true, 'Asset name is required'],
      trim: true,
    },
    assetType: {
      type: String,
      required: [true, 'Asset type is required'],
      enum: ['Laptop', 'Desktop', 'Printer', 'Monitor', 'Smartphone', 'Server', 'Networking', 'Peripheral', 'Software License'],
      default: 'Laptop',
    },
    serialNumber: {
      type: String,
      required: [true, 'Serial number is required'],
      unique: true,
      trim: true,
    },
    assignedTo: {
      type: String,
      default: 'Unassigned',
      trim: true,
    },
    status: {
      type: String,
      enum: ['Available', 'Assigned', 'Under Maintenance', 'Retired'],
      default: 'Available',
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    cost: {
      type: Number,
      default: 0,
    },
    department: {
      type: String,
      default: 'IT Operations',
    },
    location: {
      type: String,
      default: 'Headquarters',
    },
    notes: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

// Virtual for formatted status or helper methods
assetSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

module.exports = mongoose.model('Asset', assetSchema);
