const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.json());
app.use(express.static('public'));

db.serialize(() => {
  db.run('CREATE TABLE inventory (id INTEGER PRIMARY KEY, variety TEXT, entry_date TEXT, price REAL, used_amount REAL, remaining_amount REAL, previous_month_carry_over_amount REAL, total_used_amount REAL, stock_amount REAL)');

  db.run('INSERT INTO inventory (variety, entry_date, price, used_amount, remaining_amount, previous_month_carry_over_amount, total_used_amount, stock_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', ['コロンビア', '2023-01-01', 1000, 50, 150, 200, 100, 100]);
});

app.get('/api/inventory', (req, res) => {
  db.all('SELECT * FROM inventory', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/inventory', (req, res) => {
  const { variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount, stockAmount } = req.body;

  db.run('INSERT INTO inventory (variety, entry_date, price, used_amount, remaining_amount, previous_month_carry_over_amount, total_used_amount, stock_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount, stockAmount], function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
