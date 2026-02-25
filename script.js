let cart = [];
let userPhone = "573227067516";

document.addEventListener("DOMContentLoaded", function () {
    const productsContainer = document.getElementById("products");

    for (let i = 1; i <= 68; i++) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/producto-${i}.jpg.JPG" alt="Producto ${i}">
            <h3>Producto ${i}</h3>
            <p>$140.000</p>

            <select id="size-${i}">
                <option value="">Seleccionar talla</option>
                ${[35,36,37,38,39,40,41,42,43]
                    .map(t => `<option value="${t}">${t}</option>`)
                    .join("")}
            </select>

            <button onclick="addToCart(${i})">
                Agregar al carrito
            </button>
        `;

        productsContainer.appendChild(card);
    }
});

function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

function addToCart(id) {
    const size = document.getElementById(`size-${id}`).value;

    if (!size) {
        alert("Selecciona una talla");
        return;
    }

    cart.push({
        name: `Producto ${id}`,
        price: 140000,
        size: size,
        img: `images/producto-${id}.jpg.JPG`
    });

    updateCart();
    showToast();
}

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div>
                    <strong>${item.name}</strong><br>
                    Talla: ${item.size}<br>
                    $140.000<br>
                    <button onclick="removeItem(${index})">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("active");
}

function openCheckout() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    document.getElementById("purchaseModal").style.display = "flex";
}

function closePurchase() {
    document.getElementById("purchaseModal").style.display = "none";
}

function sendWhatsAppOrder() {
    const name = document.getElementById("customerName").value.trim();
    const city = document.getElementById("customerCity").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();

    if (!name || !city || !address || !phone) {
        alert("Completa todos los campos");
        return;
    }

    let message = "Hola, quiero realizar el siguiente pedido:%0A%0A";

    cart.forEach((item, index) => {
        message += `Producto ${index + 1}: ${item.name}%0A`;
        message += `Talla: ${item.size}%0A`;
        message += `Precio: $140.000%0A%0A`;
    });

    message += `Nombre: ${name}%0A`;
    message += `Ciudad: ${city}%0A`;
    message += `Dirección: ${address}%0A`;
    message += `Teléfono: ${phone}%0A`;
    message += `Pago: Efectivo contra entrega`;

    window.open(`https://wa.me/${userPhone}?text=${message}`, "_blank");

    cart = [];
    updateCart();
    closePurchase();
}