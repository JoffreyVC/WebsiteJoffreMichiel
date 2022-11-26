const Gerecht = require("../models/gerecht");
const WinkelMand = require("../models/winkelmand");
const WinkelMandItem = require("../models/winkelmandItem");
const { body, validationResult } = require("express-validator");


exports.winkelmand_detail = (req, res, next) => {  
  WinkelMand.findById(req.params.id).exec((err, winkelmand) => {
      if (err) {
        return next(err);
      }
      if (winkelmand == null) {
        // No results.
        const err = new Error("winkelmand not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("winkelmand_detail", {
        winkelmand
      });
    });
};

exports.winkelmand_list = function (req, res, next) {
  WinkelMand.find({}, "_id")
    .exec(function (err, list_winkelmand) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("winkelmand_list", { title: "Winkelmand", winkelmand: list_winkelmand });
    });
};