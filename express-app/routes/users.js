const express = require('express');
const router = express.Router();


const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);


function getUserById(id) {
  return new Promise((resolve, reject) => {
    if (!id || typeof id !== 'number' || id <= 0) {
      resolve(null);
    }

    db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) resolve(null);
      else resolve(row);
    });
  });
}

// Then in route:
router.get('/:id', async function (req, res, next) {
  const id = Number(req.params.id);
  const user = await getUserById(id);
  if (!user) return res.status(404).send('not found');
  return res.json(user);
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  db.all("SELECT id, name FROM users", [], (err, rows) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

router.post('/', function (req, res, next) {
  const insert = "INSERT INTO users (name) VALUES (?)";

  db.run(insert, [req.body.name], function (err) {
    if (err)
      return res.status(500).send("internal server error");
    db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, user) => {
      if (err) 
        return res.status(500).send("internal server error");
      res.status(201).json(user);
    });
  });
});

module.exports = router;

