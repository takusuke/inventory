const express = require('express');
const app = express();
const port = 3000;

const CoffeeBeanInventory = require('./inventory');
const inventory = new CoffeeBeanInventory();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/inventory', (req, res) => {
  inventory.getAllBeans((beans) => {
    res.json(beans);
  });
});

app.post('/api/inventory', (req, res) => {
  const { variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount } = req.body;
  inventory.addBeans(variety, entryDate, parseFloat(price), parseInt(usedAmount, 10), parseInt(remainingAmount, 10), parseInt(previousMonthCarryOverAmount, 10), parseInt(totalUsedAmount, 10));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Inventory app listening at http://localhost:${port}`);
});
