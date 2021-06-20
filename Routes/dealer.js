const express = require("express");
const mongoose = require("mongoose");
const Dealer = require("../Models/dealer");
const Connection = require("../Models/connectionrequest");
const router = express.Router();

router.get("/", (req, res) => {
  Dealer.find().then((dealer) => res.status(200).json(dealer));
});

router.post("/", (req, res) => {
  Dealer.findOne({ email: req.body.email })
    .exec()
    .then((dealer) => {
      if (dealer) {
        return res.status(200).json(dealer);
      } else {
        const dealerObj = {
          email: req.body.email,
          name: req.body.name,
          mobile: req.body.mobile,
          address: req.body.address,
          image: req.body.image,
          fcm_token: req.body.fcm_token,
        };
        const dealer = new Dealer(dealerObj);

        dealer
          .save()
          .then((dlr) => res.status(200).json(dlr))
          .catch((err) => res.status(500).json(err));
      }
    });
});

router.put("/:email", (req, res) => {
  const email = req.params.email;

  const {
    name,
    image,
    address,
    organization_name,
    mobile,
    is_active,
    fcm_token,
  } = req.body;
  Dealer.findOne({ email: email })
    .then((dealer) => {
      if (name) {
        dealer.name = name;
      }
      if (image) {
        dealer.image = image;
      }
      if (address) {
        dealer.address = address;
      }
      if (organization_name) {
        dealer.organization_name = organization_name;
      }
      if (mobile) {
        dealer.mobile = mobile;
      }
      if (fcm_token) {
        dealer.fcm_token = fcm_token;
      }

      dealer.is_active = is_active;

      dealer
        .save()
        .then((dealer) => res.status(200).json(dealer))
        .catch((err) => res.status(500).json(err));
    })

    .catch((err) => res.status(500).json(err));
});

module.exports = router;
