const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,

      required: true,
    },

    items: {
      type: [],

      required: true,
    },

    name: {
      type: String,

      required: true,
    },

    paymentType: {
      type: String,
    },

    totalPrice: {
      type: Number,
    },

    // user: {
    //   type: {},

    //   required: true,
    // },
  },
  { collection: "Details" }
);

module.exports = mongoose.model("details", orderSchema);
