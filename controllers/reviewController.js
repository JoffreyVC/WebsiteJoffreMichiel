const Review = require("../models/review");
const { body, validationResult } = require("express-validator");


exports.review_list = function (req, res, next) {
  Review.find().exec(function (err, list_reviews) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("review_list", {
        title: "All reviews",
        review_list: list_reviews,
      });
    });
};


exports.review_detail = (req, res, next) => {
  Review.findById(req.params.id)
    .populate("titel")
    .exec((err, review) => {
      if (err) {
        return next(err);
      }
      if (review == null) {
        // No results.
        const err = new Error("review not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("review_detail", {
        title: `${review.name}`,
        review,
      });
    });
};

exports.review_create_get = (req, res, next) => {
    res.render("review_form", {
      title: "Create review"
    });

};

exports.review_create_post = [
  // Validate and sanitize fields.
  body("titel")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("titel kan niet leeg zijn.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  body("rating")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),
  body("tekst")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("titel kan niet leeg zijn.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),

  body("auteur")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("titel kan niet leeg zijn.")
    .isAlphanumeric()
    .withMessage("First name has non-alphanumeric characters."),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("review_form", {
        title: "Create review",
        errors: errors.array(),
      });
      return;
    }
    // Data from form is valid.

    // Create an Author object with escaped and trimmed data.
    const review = new Review({
      titel: req.body.titel,
      rating: req.body.rating,
      tekst: req.body.tekst,
      auteur: req.body.auteur,
    });
    review.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful - redirect to new author record.
      res.redirect(review.url);
    });
  },
];

