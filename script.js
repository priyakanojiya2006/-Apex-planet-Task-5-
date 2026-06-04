const products = [
  { id: 1, name: "Laptop", price: 50000, category: "electronics", img: "images/lap.jpg" },
  { id: 2, name: "Phone", price: 20000, category: "electronics", img: "images/phon.jpg" },
  { id: 3, name: "Perfume", price: 500, category: "fashion", img: "images/per.jpg" },
  { id: 4, name: "Sunglass", price: 2000, category: "fashion", img: "images/sun.jpg" },
  { id: 5, name: "Watch", price: 3000, category: "accessories", img: "images/wat.jpg" },
  { id: 6, name: "Bag", price: 1500, category:"Fashion", img: "images/bag.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProducts = [...products];

// SHOW PRODUCTS
function displayProducts(list) {
  const container = document.getElementById("product-list");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <small>${p.category}</small>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

displayProducts(products);

// FILTER CATEGORY
function filterCategory(category) {
  if (category === "all") {
    currentProducts = products;
  } else {
    currentProducts = products.filter(p => p.category === category);
  }
  displayProducts(currentProducts);
}

// ADD TO CART
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// CART COUNT
function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}
updateCartCount();

// SHOW CART
function showCart() {
  document.getElementById("cart-modal").style.display = "block";
  renderCart();
}

// CLOSE CART
function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

// RENDER CART
function renderCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    container.innerHTML += `
      <div>
        <p>${item.name} - ₹${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = "Total: ₹" + total;
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// SEARCH
document.getElementById("search").addEventListener("input", function(e) {
  const value = e.target.value.toLowerCase();

  const filtered = currentProducts.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  displayProducts(filtered);
});