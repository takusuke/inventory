const API_URL = "/api/beans";

async function getInventory() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

async function loadInventory() {
  const inventory = await getInventory();
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "";
  inventory.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = `${item.variety} - 入庫日: ${item.entryDate} - 価格: ${item.price} - 使用量: ${item.usedAmount} - 残り: ${item.stockAmount} - 前月からの繰越量: ${item.previousMonthCarryOverAmount} - その月最も使用されている豆: ${item.totalUsedAmount}`;
  
    // 削除ボタンの追加
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "float-end");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", () => {
      deleteBean(item.id);
    });
  
    listItem.appendChild(deleteButton);
    inventoryList.appendChild(listItem);
  });
  
}

async function addBean(variety, entryDate, price, usedAmount, stockAmount, previousMonthCarryOverAmount, totalUsedAmount) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ variety, entryDate, price, usedAmount, stockAmount, previousMonthCarryOverAmount, totalUsedAmount }),
  });

  loadInventory();
}

async function deleteBean(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  loadInventory();
}


const inventoryList = document.getElementById("inventory-list");
if (inventoryList) {
  loadInventory();
}

const addBeanForm = document.getElementById("add-bean-form");
if (addBeanForm) {
  addBeanForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const variety = document.getElementById("variety").value;
    const entryDate = document.getElementById("entry-date").value;
    const price = document.getElementById("price").value;
    const usedAmount = document.getElementById("used-amount").value;
    const stockAmount = document.getElementById("stock-amount").value;
    const previousMonthCarryOverAmount = document.getElementById("previous-month-carry-over-amount").value;
    const totalUsedAmount = document.getElementById("total-used-amount").value;

    addBean(variety, entryDate, price, usedAmount, stockAmount, previousMonthCarryOverAmount, totalUsedAmount);

    // フォームをリセットする
    event.target.reset();
  });
}
