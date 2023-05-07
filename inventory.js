const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const db = new sqlite3.Database('coffeeInventory.db');

app.set('view engine', 'ejs');

class CoffeeBeanInventory {
  constructor() {
    this.setupDatabase();
  }

  setupDatabase() {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS inventory (variety TEXT PRIMARY KEY, amount INTEGER)');
    });
  }

  // その他のメソッドは変更なし
}

const inventory = new CoffeeBeanInventory();

// すべての在庫を取得するメソッドを追加
CoffeeBeanInventory.prototype.getAllBeans = function(callback) {
  db.serialize(() => {
    db.all('SELECT * FROM inventory', (err, rows) => {
      if (err) {
        console.error(err.message);
      } else {
        callback(rows);
      }
    });
  });
};

// Webサーバーのエンドポイントを設定
app.get('/', (req, res) => {
  inventory.getAllBeans((data) => {
    res.render('index', { inventory: data });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
