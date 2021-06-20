const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqid = require("uniqid");

const DealerSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  organization_name: {
    type: String,
  },
  image: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  promo_code: {
    type: String,
  },
  fcm_token: {
    type: String,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

DealerSchema.pre("save", function (next) {
  if (this.promo_code == null) {
    this.promo_code = uniqid();
    next();
  } else {
    return next();
  }
});

const Dealer = mongoose.model("Dealer", DealerSchema);
module.exports = Dealer;
