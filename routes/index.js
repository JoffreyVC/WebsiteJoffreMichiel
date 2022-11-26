var express = require('express');
//maakt een router object
var router = express.Router();

// GET home page.
router.get("/", function (req, res) {
  res.redirect("/catalog");
});

module.exports = router;

