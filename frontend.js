document.getElementById('add-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const variety = document.getElementById('variety').value;
    const entryDate = document.getElementById('entry-date').value;
    const price = parseFloat(document.getElementById('price').value);
    const usedAmount = parseInt(document.getElementById('used-amount').value, 10);
    const remainingAmount = parseInt(document.getElementById('remaining-amount').value, 10);
    const previousMonthCarryOverAmount = parseInt(document.getElementById('previous-month-carry-over-amount').value, 10);
    const totalUsedAmount = parseInt(document.getElementById('total-used-amount').value, 10);
  
    if (variety && entryDate && !isNaN(price) && !isNaN(usedAmount) && !isNaN(remainingAmount) && !isNaN(previousMonthCarryOverAmount) && !isNaN(totalUsedAmount)) {
      addBeans(variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount);
    }
  });
  
  function addBeans(variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount) {
    fetch('/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({ variety, entryDate, price, usedAmount, remainingAmount, previousMonthCarryOverAmount, totalUsedAmount })
    })
    .then(() => {
      updateInventoryList();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  function updateInventoryList() {
    fetch('/api/inventory')
      .then((response) => response.json())
      .then((data) => {
        const inventoryList = document.getElementById('inventory-list');
        inventoryList.innerHTML = '';
  
        data.forEach((bean) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${bean.variety} - 入庫日: ${bean.entry_date}, 価格: ${bean.price}, 使用量: ${bean.used_amount}, 残り: ${bean.remaining_amount}, 前月からの繰り越し量: ${bean.previous_month_carry_over_amount}, 全体の使用量: ${bean.total_used_amount}`;
          inventoryList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  updateInventoryList();
  