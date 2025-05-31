const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { 
    // Fix: Changed from i <= cartItems.length to i < cartItems.length 
    // because the last index is cartItems.length - 1. 
    total += cartItems[i].price;
  }
  return total;
}

function applyDiscount(total, discountRate) {
  // Fix: Validate that discountRate is a number between 0 and 1
  if (typeof discountRate !== "number" || discountRate < 0 || discountRate > 1) {
    console.warn("Invalid discount rate. No discount applied.");
    return total;
  }
  return total - total * discountRate;
}

function generateReceipt(cartItems, total) {
  // Fix: Validate total is a number to avoid NaN
  if (typeof total !== "number" || isNaN(total)) {
    console.error("Invalid total amount");
    total = 0;
  }

  let receipt = "Items:\n";
  cartItems.forEach(item => {
    receipt += `${item.name}: $${item.price}\n`;
  });
  receipt += `Total: $${total.toFixed(2)}`;
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

// Ensure DOM elements exist before accessing them
const totalElement = document.getElementById("total");
const receiptElement = document.getElementById("receipt");

if (totalElement) {
  totalElement.textContent = `Total: $${discountedTotal.toFixed(2)}`;
} else {
  console.warn("Element with ID 'total' not found.");
}

if (receiptElement) {
  receiptElement.textContent = receipt;
} else {
  console.warn("Element with ID 'receipt' not found.");
}