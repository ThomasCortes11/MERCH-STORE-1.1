/* =========================
   CONTADOR MUNDIAL 2026
   Apertura: 11 junio 2026
========================= */
(function startCountdown() {
    const target = new Date('2026-06-11T18:00:00-05:00'); // hora Colombia

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
        const now  = new Date();
        const diff = target - now;

        if (diff <= 0) {
            document.getElementById('cd-days').textContent  = '00';
            document.getElementById('cd-hours').textContent = '00';
            document.getElementById('cd-mins').textContent  = '00';
            document.getElementById('cd-secs').textContent  = '00';
            return;
        }

        const days  = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins  = Math.floor((diff % 3600000)  / 60000);
        const secs  = Math.floor((diff % 60000)    / 1000);

        const dEl = document.getElementById('cd-days');
        const hEl = document.getElementById('cd-hours');
        const mEl = document.getElementById('cd-mins');
        const sEl = document.getElementById('cd-secs');

        if (dEl) dEl.textContent  = pad(days);
        if (hEl) hEl.textContent  = pad(hours);
        if (mEl) mEl.textContent  = pad(mins);
        if (sEl) sEl.textContent  = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
})();

let cart = [];
let userPhone = "573227067516";

/* =========================
   HAMBURGER MENU
========================= */
document.addEventListener("DOMContentLoaded", function () {

    const hamburger = document.getElementById("hamburger");
    const mainNav   = document.getElementById("mainNav");

    if (hamburger && mainNav) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("open");
            mainNav.classList.toggle("open");
        });

        // Cierra el nav al hacer click en un enlace
        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                mainNav.classList.remove("open");
            });
        });
    }

    /* =========================
       CARGA DE PRODUCTOS
    ========================= */
    const seleccionContainer = document.getElementById("seleccionContainer");
    const calzadoContainer   = document.getElementById("calzadoContainer");

    // IDs que van en "Selección Colombia"
    const seleccionIDs = [46, 54, 66, 4];

    for (let i = 1; i <= 68; i++) {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/producto-${i}.jpg.JPG" alt="Producto ${i}" loading="lazy">
            <h3>Producto ${i}</h3>
            <p class="price">$140.000</p>
            <select id="size-${i}">
                <option value="">Seleccionar talla</option>
                ${[35,36,37,38,39,40,41,42,43]
                    .map(t => `<option value="${t}">Talla ${t}</option>`).join("")}
            </select>
            <button onclick="addToCart(${i})">🛒 Agregar al carrito</button>
        `;

        if (seleccionIDs.includes(i)) {
            seleccionContainer.appendChild(card);
        } else {
            calzadoContainer.appendChild(card);
        }
    }
});


/* =========================
   AGREGAR AL CARRITO
========================= */
function addToCart(id) {
    const sizeEl = document.getElementById(`size-${id}`);
    const size   = sizeEl ? sizeEl.value : "";

    if (!size) {
        alert("Por favor selecciona una talla antes de agregar.");
        return;
    }

    cart.push({
        name:  `Producto ${id}`,
        price: 140000,
        size:  size,
        img:   `images/producto-${id}.jpg.JPG`
    });

    updateCart();
    showToast();
}


/* =========================
   ACTUALIZAR CARRITO
========================= */
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = `<p style="text-align:center;color:#aaa;margin-top:40px;font-size:14px;">Tu carrito está vacío</p>`;
    }

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-info">
                <strong>${item.name}</strong><br>
                👟 Talla: ${item.size}<br>
                💰 $${item.price.toLocaleString()}<br>
                <button onclick="removeItem(${index})">Eliminar</button>
            </div>
        `;
        cartItems.appendChild(div);
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = total.toLocaleString();
}


/* =========================
   ELIMINAR PRODUCTO
========================= */
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}


/* =========================
   TOGGLE CARRITO
========================= */
function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("active");
}


/* =========================
   MODAL COMPRA
========================= */
function openCheckout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos primero.");
        return;
    }
    toggleCart();
    const modal = document.getElementById("purchaseModal");
    modal.style.display = "flex";
}

function closePurchase() {
    document.getElementById("purchaseModal").style.display = "none";
}


/* =========================
   TOAST
========================= */
function showToast() {
    const toast    = document.getElementById("toast");
    const cartIcon = document.querySelector(".cart-icon");

    toast.classList.add("show");
    if (cartIcon) {
        cartIcon.style.transform = "scale(1.2)";
    }

    setTimeout(() => {
        toast.classList.remove("show");
        if (cartIcon) cartIcon.style.transform = "scale(1)";
    }, 2200);
}


/* =========================
   ENVIAR POR WHATSAPP
========================= */
function sendWhatsAppOrder() {
    const name    = document.getElementById("customerName").value.trim();
    const city    = document.getElementById("customerCity").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const phone   = document.getElementById("customerPhone").value.trim();

    if (!name || !city || !address || !phone) {
        alert("Por favor completa todos los datos antes de confirmar.");
        return;
    }

    const total = document.getElementById("cartTotal").innerText;

    let message = "🛍️ *NUEVO PEDIDO — MERCH STORE* 🛍️\n\n";
    message += "━━━━━━━━━━━━━━━━━━\n";
    message += `👤 *Cliente:* ${name}\n`;
    message += `📍 *Ciudad:* ${city}\n`;
    message += `🏠 *Dirección:* ${address}\n`;
    message += `📱 *WhatsApp:* ${phone}\n`;
    message += "━━━━━━━━━━━━━━━━━━\n\n";
    message += "🛒 *Productos seleccionados:*\n\n";

    cart.forEach(item => {
        message += `• 👟 ${item.name} | Talla: ${item.size} | $${item.price.toLocaleString()}\n`;
    });

    message += `\n━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *Total:* $${total}\n`;
    message += `🔥 Edición Limitada Mundial 2026 🇨🇴\n`;
    message += `✨ ¡Gracias por comprar con nosotros!`;

    window.open(`https://wa.me/${userPhone}?text=${encodeURIComponent(message)}`, "_blank");

    cart = [];
    updateCart();
    closePurchase();
}
