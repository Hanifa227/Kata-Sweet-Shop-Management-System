class Sweets {
  constructor() {
    this.sweets = [];
  }

  addSweet(sweet) {
    if (this.sweets.some(s => s.id === sweet.id)) {
      throw new Error('Sweet with this ID already exists.');
    }
    this.sweets.push(sweet);
  }

  deleteSweet(id) {
    const index = this.sweets.findIndex(s => s.id === id);
    if (index === -1) throw new Error('Sweet not found.');
    this.sweets.splice(index, 1);
  }

  viewSweets() {
    return this.sweets;
  }

  purchaseSweet(id, qty) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) throw new Error("Sweet not found.");
    if (sweet.quantity < qty) throw new Error("Not enough stock.");
    sweet.quantity -= qty;
  }

  restockSweet(id, qty) {
    const sweet = this.sweets.find(s => s.id === id);
    if (!sweet) throw new Error("Sweet not found.");
    sweet.quantity += qty;
  }
}

module.exports = Sweets;
