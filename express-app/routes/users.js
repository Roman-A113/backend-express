const express = require('express');
const router = express.Router();

users = [
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
  }];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({
    items: users
  })
});
router.post('/', function (req, res, next) {
  user = { "id": users[users.length - 1].id + 1, "name": req.body.name }
  users.push(user);
  res.status(201).json(user);
});

module.exports = router;

