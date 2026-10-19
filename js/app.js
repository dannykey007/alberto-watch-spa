// Initial fallback local database in case Django is offline
let watchDatabase = {
  luxury: [
    {
      name: "Rolex Submariner Date",
      price: "$14,500",
      category: "men",
      desc: "Iconic professional diving watch with Cerachrom bezel and automatic movement.",
      image: "assets/rolex-submariner.jpg"
    },
    {
      name: "Rolex Lady-Datejust",
      price: "$11,200",
      category: "women",
      desc: "Exquisite 28mm timepiece featuring a diamond-set dial and Jubilee bracelet.",
      image: "assets/rolex-lady-datejust.jpg"
    }
  ],
  vintage: [
    {
      name: "Bulova Vintage 1970s Automatic",
      price: "$1,850",
      category: "men",
      desc: "Classic retro styling featuring mechanical self-winding heritage movement.",
      image: "assets/bulova-vintage.jpg"
    }
  ],
  smart: [
    {
      name: "Michael Kors Gen 6 Smartwatch",
      price: "$350",
      category: "unisex",
      desc: "Connected luxury touchscreen smartwatch featuring health tracking and custom dials.",
      image: "assets/michael-kors.jpg"
    }
  ],
  pricelist: [
    { name: "Rolex Submariner Date", price: "$14,500", desc: "Professional luxury diving timepiece.", image: "assets/rolex-submariner.jpg" },
    { name: "Rolex Lady-Datejust", price: "$11,200", desc: "Classic women's luxury diamond timepiece.", image: "assets/rolex-lady-datejust.jpg" }
  ]
};

// Smooth Scroll Section Switcher Function
function switchSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const navLinks = document.querySelectorAll('.nav-menu a, .sitemap-link');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + sectionId) {
      link.classList.add('active');
    }
  });
}

// Scroll back to Home/Top of Page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dynamic Line-up Filter & Renderer by Category Tab
function filterLineup(category, buttonElement) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (buttonElement) {
    const buttons = document.querySelectorAll('.lineup-tabs button');
    buttons.forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');
  }

  const items = watchDatabase[category] || [];

  if (items.length === 0) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 2rem;">No timepieces found in this collection.</p>`;
    return;
  }

  items.forEach(watch => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openWatchModal(watch.name, watch.price, watch.desc);

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${watch.image}" alt="${watch.name}" class="product-card-img" onerror="this.src='https://via.placeholder.com/200x200?text=Luxury+Watch'">
      </div>
      <h4>${watch.name}</h4>
      <p class="price">${watch.price}</p>
      <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">Click for details</p>
    `;
    grid.appendChild(card);
  });
}

// Dedicated Gender Filter Handler for Showcase Banners
function filterByGender(gender) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const buttons = document.querySelectorAll('.lineup-tabs button');
  buttons.forEach(btn => btn.classList.remove('active'));

  let filteredItems = [];

  Object.keys(watchDatabase).forEach(key => {
    if (key !== 'pricelist') {
      watchDatabase[key].forEach(watch => {
        if (watch.category === gender || watch.category === 'unisex') {
          if (!filteredItems.some(item => item.name === watch.name)) {
            filteredItems.push(watch);
          }
        }
      });
    }
  });

  filteredItems.forEach(watch => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openWatchModal(watch.name, watch.price, watch.desc);

    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${watch.image}" alt="${watch.name}" class="product-card-img" onerror="this.src='https://via.placeholder.com/200x200?text=Luxury+Watch'">
      </div>
      <h4>${watch.name}</h4>
      <p class="price">${watch.price}</p>
      <p style="font-size: 0.85rem; color: #666; margin-top: 0.5rem;">Click for details</p>
    `;
    grid.appendChild(card);
  });

  grid.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Modal Popup Window Handlers
function openWatchModal(title, price, desc) {
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('modalPrice').innerText = price;
  document.getElementById('watchModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('watchModal').style.display = 'none';
}

// --- Advanced Slide-Out Shopping Cart Engine ---
let cart = [];

function addToCart() {
  const title = document.getElementById('modalTitle').innerText;
  const price = document.getElementById('modalPrice').innerText;

  if (!title) return;

  cart.push({ name: title, price: price });
  updateCartUI();

  alert(`Added "${title}" to your cart!`);
  closeModal();
}

function updateCartUI() {
  const cartSpan = document.getElementById('cartCount');
  if (cartSpan) {
    cartSpan.innerText = cart.length;
  }

  const container = document.getElementById('cartItemsContainer');
  const totalPriceSpan = document.getElementById('cartTotalPrice');
  if (!container || !totalPriceSpan) return;

  container.innerHTML = '';
  let grandTotal = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #666; margin-top: 2rem;">Your cart is currently empty.</p>`;
    totalPriceSpan.innerText = "$0.00";
    return;
  }

  cart.forEach((item, index) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    grandTotal += numericPrice;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item-card';
    itemEl.innerHTML = `
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(itemEl);
  });

  totalPriceSpan.innerText = `$${grandTotal.toLocaleString()}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;

  if (drawer.style.display === 'none' || drawer.style.display === '') {
    updateCartUI();
    drawer.style.display = 'flex';
  } else {
    drawer.style.display = 'none';
  }
}

function checkoutCart() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let grandTotal = 0;
  cart.forEach(item => {
    grandTotal += parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
  });

  const amountInKobo = grandTotal * 100 * 1500;

  let handler = PaystackPop.setup({
    key: 'pk_live_768f10f9bca5804c5458e7b307d8630412948e4c',
    email: 'customer@albertowatch.com',
    amount: amountInKobo,
    currency: "NGN",
    ref: 'ALBERTO_CART_' + Math.floor((Math.random() * 1000000000) + 1),
    callback: function (response) {
      alert("Payment successful! Reference: " + response.reference);
      cart = [];
      updateCartUI();
      toggleCartDrawer();
    },
    onClose: function () {
      alert("Transaction window closed.");
    }
  });

  handler.openIframe();
}

function buyNow() {
  addToCart();
  toggleCartDrawer();
}

// HTML5 Geolocation & Bottom Continuous Ticker Engine
function initTickerAndLocation() {
  const ticker = document.getElementById('bottomTicker');
  if (!ticker) return;

  const updateTickerText = (locationStr) => {
    const now = new Date();
    const dateTimeString = now.toLocaleTimeString();
    ticker.innerText = `Alberto Watch Company | ${locationStr} | Live Time: ${dateTimeString} | Welcome to our Luxury Timepiece Gallery`;
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        const locationStr = `Coordinates: Lat ${lat}, Lon ${lon}`;
        updateTickerText(locationStr);
        setInterval(() => updateTickerText(locationStr), 1000);
      },
      () => {
        const locationStr = "Location: Restricted / Unavailable";
        updateTickerText(locationStr);
        setInterval(() => updateTickerText(locationStr), 1000);
      }
    );
  } else {
    const locationStr = "Geolocation not supported";
    updateTickerText(locationStr);
    setInterval(() => updateTickerText(locationStr), 1000);
  }
}

// Dynamic Visitor Counter using browser localStorage
function initVisitorCounter() {
  let count = localStorage.getItem('albertoVisitorCount');
  if (!count) {
    count = 1245;
  } else {
    count = parseInt(count) + 1;
  }
  localStorage.setItem('albertoVisitorCount', count);

  const visitorSpan = document.getElementById('visitorCount');
  if (visitorSpan) {
    visitorSpan.innerText = count.toLocaleString();
  }
}

// Fetch live watches from Django backend with local fallback
async function loadWatchesFromDjango() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/watches/');
    if (!response.ok) throw new Error("Server response failed");
    
    const data = await response.json();

    if (data.watches && data.watches.length > 0) {
      watchDatabase = { luxury: [], vintage: [], smart: [], pricelist: [] };

      data.watches.forEach(watch => {
        watchDatabase.pricelist.push(watch);
        
        // Map your Django categories ('luxury', 'vintage', 'smart') directly
        if (watch.category === 'luxury') watchDatabase.luxury.push(watch);
        else if (watch.category === 'vintage') watchDatabase.vintage.push(watch);
        else if (watch.category === 'smart') watchDatabase.smart.push(watch);
        else {
          // Fallback catch-all if category doesn't match standard tabs
          watchDatabase.luxury.push(watch);
        }
      });
    }
  } catch (error) {
    console.warn("Django backend offline or CORS restricted. Using local catalog fallback.", error);
  } finally {
    filterLineup('luxury');
  }
}

// Single Consolidated Window Onload Handler
window.onload = function () {
  initTickerAndLocation();
  initVisitorCounter();
  loadWatchesFromDjango();
};