class Sweets {
  constructor() {
    this.sweets = JSON.parse(localStorage.getItem("sweets") || "[]");
  }

  save() {
    localStorage.setItem("sweets", JSON.stringify(this.sweets));
  }

  addSweet(sweet) {
    if (this.sweets.some(s => s.id === sweet.id)) {
      alert('Sweet with this ID already exists.');
      return;
    }
    this.sweets.push(sweet);
    this.save();
  }

  deleteSweet(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) return alert("Sweet not found");
    this.sweets.splice(index, 1);
    this.save();
  }

  purchaseSweet(id) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) return alert("Sweet not found");
    const qty = parseInt(prompt("Enter quantity to purchase:"));
    if (qty > sweet.quantity) return alert("Not enough stock.");
    sweet.quantity -= qty;
    this.save();
  }

  restockSweet(id) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) return alert("Sweet not found");
    const qty = parseInt(prompt("Enter quantity to restock:"));
    sweet.quantity += qty;
    this.save();
  }

  viewSweets() {
    return this.sweets;
  }
}

const shop = new Sweets();
let currentSort = { field: null, asc: true };

function addSweet() {
  const sweet = {
    id: parseInt(document.getElementById("id").value),
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: parseFloat(document.getElementById("price").value),
    quantity: parseInt(document.getElementById("quantity").value)
  };
  shop.addSweet(sweet);
  renderTable();
}

function renderTable() {
  const table = document.querySelector("#sweetTable tbody");
  table.innerHTML = "";

  let sweets = shop.viewSweets();

  // 🔍 Search filter
  const query = document.getElementById("searchBox")?.value.toLowerCase();
  if (query) {
    sweets = sweets.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query)
    );
  }

  // 🔃 Sorting
  if (currentSort.field) {
    sweets.sort((a, b) => {
      const valA = a[currentSort.field];
      const valB = b[currentSort.field];
      if (typeof valA === "number") {
        return currentSort.asc ? valA - valB : valB - valA;
      }
      return currentSort.asc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }

  // Render rows
  sweets.forEach(s => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.category}</td>
      <td>${s.price}</td>
      <td>${s.quantity}</td>
      <td>
        <button onclick="shop.purchaseSweet(${s.id}); renderTable()">Buy</button>
        <button onclick="shop.restockSweet(${s.id}); renderTable()">Restock</button>
        <button onclick="shop.deleteSweet(${s.id}); renderTable()">Delete</button>
      </td>`;
    table.appendChild(row);
  });
}


function sortTable(field) {
  if (currentSort.field === field) {
    currentSort.asc = !currentSort.asc; // toggle order
  } else {
    currentSort = { field, asc: true };
  }
  renderTable();
}


renderTable();
