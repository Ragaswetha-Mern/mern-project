const apiUrl = "https://68b6c49373b3ec66cec2a157.mockapi.io/trasactions";
async function dataSubmit(event) {
  if (event) event.preventDefault();
  var itemDate = document.getElementById("date").value;
  var itemType = document.getElementById("type").value;
  var itemDescription = document.getElementById("description").value;
  var itemAmount = document.getElementById("amount").value;
  var itemlist = {
    date: itemDate,
    type: itemType,
    description: itemDescription,
    amount: itemAmount,
  };
  try {
    if (window.editId) {
      await fetch(`${apiUrl}/${window.editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemlist),
      });
      window.editId = null;
    } else {
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemlist),
      });
    }
    getData();
  } catch (error) {
    console.log("error", error);
  }
  getValuebyType("Income", "income");
  getValuebyType("Expenses", "expenses");
  setTimeout(getBalance, 500);
  resetData();
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
  document.getElementById("type").value = "--SELECT TYPE OF EXPENSE--";
  document.getElementById("description").value = "";
  return false;
}
async function getData() {
  try {
    var data = await fetch(apiUrl, {
      method: "GET",
    });
    var result = await data.json();
    let tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    result.forEach((element) => {
      let row = document.createElement("tr");
      row.className = "hover:bg-indigo-100 transition-colors rounded";

      let dateTd = document.createElement("td");
      dateTd.className = "py-3 px-5 border-b text-gray-700 font-medium";
      dateTd.innerHTML = `<span class="block">${element.date}</span>`;

      let typeTd = document.createElement("td");
      typeTd.className = "py-3 px-5 border-b text-indigo-600 font-semibold";
      typeTd.innerHTML = `<span class="block">${element.type}</span>`;

      let descriptionTd = document.createElement("td");
      descriptionTd.className = "py-3 px-5 border-b text-gray-600";
      descriptionTd.innerHTML = `<span class="block">${element.description}</span>`;

      let amountTd = document.createElement("td");
      amountTd.className = "py-3 px-5 border-b text-green-600 font-bold";
      amountTd.innerHTML = `<span class="block">₹${element.amount}</span>`;

      let actionTd = document.createElement("td");
      actionTd.className = "py-3 px-5 border-b flex gap-2";
      actionTd.innerHTML = `
    <button class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-2 rounded shadow transition-colors" title="Edit" onclick="updateData('${element.id}')">
      <i class="fas fa-pen"></i>
    </button>
    <button class="bg-red-400 hover:bg-red-500 text-white font-bold py-1 px-2 rounded shadow transition-colors" title="Delete" onclick="deleteData('${element.id}')">
      <i class="fas fa-trash"></i>
    </button>
  `;

      row.appendChild(dateTd);
      row.appendChild(typeTd);
      row.appendChild(descriptionTd);
      row.appendChild(amountTd);
      row.appendChild(actionTd);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log("error", error);
  }
}

async function updateData(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const item = await response.json();
    document.getElementById("date").value = item.date;
    document.getElementById("type").value = item.type;
    document.getElementById("description").value = item.description;
    document.getElementById("amount").value = item.amount;
    window.editId = id;
  } catch (error) {
    console.log("error", error);
  }
}

async function deleteData(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
    getData();
  } catch (error) {
    console.log("error", error);
  }
  getValuebyType("Income", "income");
  getValuebyType("Expenses", "expenses");
  setTimeout(getBalance, 500);
  resetData();
}

async function getValuebyType(type, elementName) {
  try {
    var data = await fetch(apiUrl, {
      method: "GET",
    });
    var result = await data.json();
    var expenses = result.filter((item) => item.type === type);
    var totalExpenses = 0;
    if (expenses.length > 0) {
      totalExpenses = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );
      document.getElementById(elementName).value = `₹${totalExpenses}`;
    }
  } catch (error) {
    console.log("error", error);
    document.getElementById(elementName).value = "₹0";
  }
}

function getBalance() {
  var income = document.getElementById("income").value.replace("₹", "");
  var expenses = document.getElementById("expenses").value.replace("₹", "");
  var balance = Number(income) - Number(expenses);
  document.getElementById("balance").value = `₹${balance}`;
  resetData();
}
async function resetData() {
  var bodyValue = document.getElementById("tableBody").innerHTML;
  if (!bodyValue) {
    document.getElementById("income").value = "";
    document.getElementById("expenses").value = "";
    document.getElementById("balance").value = "";
  } else {
    var data = await fetch(apiUrl, {
      method: "GET",
    });
    var result = await data.json();
    var expenses = result.filter((item) => item.type === "Income");
    if (expenses.length == 0) {
      document.getElementById("income").value = "";
    }
    var expenses = result.filter((item) => item.type === "Expenses");
    if (expenses.length == 0) {
      document.getElementById("expenses").value = "";
    }
    var income = document.getElementById("income").value.replace("₹", "");
    var expenses = document.getElementById("expenses").value.replace("₹", "");
    if (income == "" && expenses == "") {
      document.getElementById("balance").value = "";
    }
  }
}
getData();
getValuebyType("Income", "income");
getValuebyType("Expenses", "expenses");
setTimeout(getBalance, 500);
