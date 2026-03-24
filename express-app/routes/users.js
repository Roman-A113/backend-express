const express = require('express');
const router = express.Router();

users = [
  {
    "id": 0,
    "name": "Roma"
  },
  {
    "id": 1,
    "name": "Sonya"
  },
  {
    "id": 2,
    "name": "Igor"
  }];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({
    items: users
  })
});
router.get('/:id', function (req, res, next) {
  id = Number(req.params.id);
  if (id >= users.length)
    return res.status(404).send('not found');
  res.send(users[id]);
});

router.post('/', function (req, res, next) {
  user = { "id": users[users.length - 1].id + 1, "name": req.body.name }
  users.push(user);
  res.status(201).json(user);
});

module.exports = router;

