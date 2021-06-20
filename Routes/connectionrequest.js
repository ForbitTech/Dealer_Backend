const express = require("express");
const mongoose = require("mongoose");
const Connection = require("../Models/connectionrequest");
const router = express.Router();

router.get("/:id", (req, res) => {
  Connection.find({ dealer_id: req.params.id })
    .populate("dealer_id")
    .then((connetion) => res.status(200).json(connetion));
});

router.post("/", (req, res) => {
  Connection.findOne({ device_id: req.body.device_id })
    .exec()
    .then((connected) => {
      if (connected) {
        return res.status(200).json(connected);
      } else {
        const conObj = {
          dealer_id: req.body.dealer_id,
          device_id: req.body.device_id,
          vehicle_reg: req.body.vehicle_reg,
          device_sim: req.body.device_sim,
          customer_phone: req.body.customer_phone,
          vehical_model: req.body.vehical_model,
          monthly_charge: req.body.monthly_charge,
          vehicle_type: req.body.vehicle_type,
          customer_email: req.body.customer_email,
          approve: req.body.approve,
        };
        const connected = new Connection(conObj);
        connected
          .save()
          .then((connected) => res.status(200).json(connected))
          .catch((err) => res.status(500).json(err));
      }
    });
});

router.put("/:device_id", (req, res) => {
  const {
    device_id,
    registration_number,
    device_number,
    center_number,
    vehical_model,
    service,
    vehicle_type,
    customer_gmail,
    is_approve,
  } = req.body;
  Connection.findOne({ device_id: req.params.device_id })
    .then((connection) => {
      if (device_id) {
        connection.device_id = device_id;
      }
      if (registration_number) {
        connection.registration_number = registration_number;
      }
      if (device_number) {
        connection.device_number = device_number;
      }
      if (center_number) {
        connection.center_number = center_number;
      }
      if (vehical_model) {
        connection.vehical_model = vehical_model;
      }
      if (service) {
        connection.service = service;
      }
      if (vehicle_type) {
        connection.vehicle_type = vehicle_type;
      }
      if (customer_gmail) {
        connection.customer_gmail = customer_gmail;
      }
      connection.is_approve = is_approve;

      connection
        .save()
        .then((connection) => res.status(200).json(connection))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/:id/", (req, res) => {
  Connection.find({ dealer_id: req.params.id })
    .populate("dealer")
    .then((connection) => res.status(200).json(connection))
    .catch((err) => console.log(err));
});

router.get("/:id/connected", (req, res) => {
  Connection.find({
    dealer_id: req.params.id,
    is_approve: true,
  })
    .populate("dealer_id")
    .then((connected) => {
      return res.status(200).json(connected);
    })
    .catch((error) => res.status(500).json(error));
});

router.get("/:id/pending", (req, res) => {
  Connection.find({ dealer_id: req.params.id, is_approve: false })
    .populate("dealer_id")
    .then((pending) => res.status(200).json(pending))
    .catch((err) => res.status(500).json(err));
});

router.delete("/:device_id", (req, res) => {
  Connection.deleteOne({ device_id: req.params.device_id })
    .then((connection) => res.status(200).json(connection))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;
