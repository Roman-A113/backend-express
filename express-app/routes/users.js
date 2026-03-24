const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({
    items: [
    {
      "id": 1,
      "name": "Roma"
    },
    {
      "id": 2,
      "name": "Sonya"
    },
    {
      "id": 3,
      "name": "Igor"
    }]
  })
});

module.exports = router;
