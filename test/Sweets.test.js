const Sweets = require('../src/Sweets');

describe("Sweets Management System", () => {
  let shop;

  beforeEach(() => {
    shop = new Sweets();
  });

  test("Add sweet", () => {
    shop.addSweet({ id: 1, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 10 });
    expect(shop.viewSweets().length).toBe(1);
  });

  test("Prevent duplicate ID", () => {
    shop.addSweet({ id: 1, name: "Kaju Katli", category: "Nut-Based", price: 50, quantity: 10 });
    expect(() =>
      shop.addSweet({ id: 1, name: "Gulab Jamun", category: "Milk-Based", price: 20, quantity: 5 })
    ).toThrow("Sweet with this ID already exists.");
  });

  test("Purchase sweet", () => {
    shop.addSweet({ id: 1, name: "Ladoo", category: "Milk", price: 10, quantity: 5 });
    shop.purchaseSweet(1, 2);
    expect(shop.viewSweets()[0].quantity).toBe(3);
  });

  test("Reject over-purchase", () => {
    shop.addSweet({ id: 1, name: "Ladoo", category: "Milk", price: 10, quantity: 5 });
    expect(() => shop.purchaseSweet(1, 10)).toThrow("Not enough stock.");
  });

  test("Restock sweet", () => {
    shop.addSweet({ id: 1, name: "Ladoo", category: "Milk", price: 10, quantity: 5 });
    shop.restockSweet(1, 5);
    expect(shop.viewSweets()[0].quantity).toBe(10);
  });

  test("Delete sweet", () => {
    shop.addSweet({ id: 1, name: "Barfi", category: "Milk", price: 15, quantity: 10 });
    shop.deleteSweet(1);
    expect(shop.viewSweets().length).toBe(0);
  });
});
