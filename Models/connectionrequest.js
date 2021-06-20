const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConnectionSchema = new Schema({
  device_id: {
    type: Number,
  },
  vehicle_reg: {
    type: String,
  },
  device_sim: {
    type: Number,
  },
  customer_phone: {
    type: Number,
  },
  vehical_model: {
    type: String,
  },
  monthly_charge: {
    type: Number,
  },
  vehicle_type: {
    type: String,
  },
  customer_email: {
    type: String,
  },
  is_approve: {
    type: Boolean,
    default: false,
  },
  dealer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dealer",
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

const Connection = mongoose.model("Connection", ConnectionSchema);
module.exports = Connection;
