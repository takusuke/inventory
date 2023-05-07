const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('coffeeInventory.db');

class CoffeeBeanInventory {
  constructor() {
    this.setupDatabase();
  }

  setupDatabase() {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS inventory (
        variety TEXT PRIMARY KEY,
        entry_date TEXT,
        price REAL,
        used_amount INTEGER,
        remaining_amount INTEGER,
        previous_month_carry_over_amount INTEGER,
        total_used_amount INTEGER
      )`);
    });
  }

  addBeans(variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount) {
    db.serialize(() => {
      db.run(`INSERT OR IGNORE INTO inventory (
        variety,
        entry_date,
        price,
        used_amount,
        remaining_amount,
        previous_month_carry_over_amount,
        total_used_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount]);
    });
  }

  getAllBeans(callback) {
    db.serialize(() => {
      db.all('SELECT * FROM inventory', (err, rows) => {
        if (err) {
          console.error(err.message);
        } else {
          callback(rows);
        }
      });
    });
  }

  // その他のメソッドは必要に応じて追加してください。
}

module.exports = CoffeeBeanInventory;
