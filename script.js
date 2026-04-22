let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list = products) {
  const container = document.getElementById("productsContainer");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">

        <div class="badge">
          -${Math.round(((p.oldPrice - p.price)/p.oldPrice)*100)}%
        </div>

        <img src="${p.img}" alt="${p.name}">

        <h3>${p.name}</h3>

        <div class="rating">⭐ ${p.rating}</div>

        <p class="price">
          <span class="old">₹${p.oldPrice}</span>
          <span class="new"> ₹${p.price}</span>
        </p>

        <button onclick="addToCart(${p.id})">
          Add to Cart
        </button>

      </div>
    `;
  });
}

displayProducts();

function addToCart(id) {
  let item = products.find(p => p.id === id);
  let existing = cart.find(p => p.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCart();
  showToast("✅ Added to cart");
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartBox = document.getElementById("cartItems");
  const totalBox = document.getElementById("total");

  cartBox.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    cartBox.innerHTML += `
      <div style="margin-bottom:10px;">
        <b>${item.name}</b><br>
        ₹${item.price} × ${item.qty}

        <div>
          <button onclick="changeQty(${item.id}, -1)">➖</button>
          <button onclick="changeQty(${item.id}, 1)">➕</button>
          <button onclick="removeItem(${item.id})">❌</button>
        </div>
      </div>
    `;
  });

  totalBox.innerText = total;
}

renderCart();

function changeQty(id, change) {
  let item = cart.find(p => p.id === id);
  if (!item) return;

  item.qty += change;

  if (item.qty <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

const searchInput = document.getElementById("search");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    let value = searchInput.value.toLowerCase();

    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
  });
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  let text = "🛍️ Order Details:\n\n";

  cart.forEach(item => {
    text += `${item.name} (x${item.qty}) - ₹${item.price * item.qty}\n`;
  });

  let total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  text += `\nTotal: ₹${total}`;

  window.location.href =
    "https://wa.me/?text=" + encodeURIComponent(text);
}

function showToast(msg) {
  let toast = document.createElement("div");
  toast.innerText = msg;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#00ffae";
  toast.style.color = "#000";
  toast.style.padding = "10px 15px";
  toast.style.borderRadius = "10px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "999";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
}