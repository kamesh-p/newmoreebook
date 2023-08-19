let mongoose = require("mongoose"),
  express = require("express"),
  orderRouter = express.Router();

let orderSchema = require("../Models/order_Schema");

orderRouter.route("/create-user").post((req, res, next) => {
  orderSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
});

orderRouter.route("/").get((req, res) => {
  orderSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

orderRouter.route("/get-user/:id").get((req, res) => {
  orderSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

orderRouter.route("/update-user/:id").put((req, res, next) => {
  orderSchema.findByIdAndUpdate(
    req.params.id,

    {
      $set: req.body,
    },

    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);

        console.log("user updated successfully !");
      }
    }
  );
});

orderRouter.route("/delete-user/:id").delete((req, res, next) => {
  orderSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = orderRouter;
