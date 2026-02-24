let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = 0;
let selectedProduct = null;
let userPhone = "573227067516";

document.addEventListener("DOMContentLoaded", function(){

    const productsContainer = document.getElementById("products");

    // GENERAR 68 PRODUCTOS
    for (let i = 1; i <= 68; i++) {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img loading="lazy" src="images/producto-${i}.jpg.JPG" alt="Producto ${i}">
            <h3>Producto ${i}</h3>
            <p>$120000</p>
            <button class="btn-comprar">Comprar</button>
        `;

        productsContainer.appendChild(card);
    }

    // Adjuntar manejadores a los botones "Comprar"
    attachBuyButtons();

    calculateTotal();
    updateCart();
});


// ===============================
// MODAL
// ===============================

function openModal(productNumber){

    selectedProduct = {
        name: `Producto ${productNumber}`,
        price: 120000
    };

    document.getElementById("modalTitle").innerText = selectedProduct.name;
    document.getElementById("sizeSelect").value = "";
    document.getElementById("modal").style.display = "flex";
}

function closeModal(){
    document.getElementById("modal").style.display = "none";
}

function confirmAdd(){

    const size = document.getElementById("sizeSelect").value;

    if(size === ""){
        alert("Debes seleccionar una talla");
        return;
    }

    cart.push({
        name: selectedProduct.name,
        price: selectedProduct.price,
        size: size
    });

    saveCart();
    calculateTotal();
    updateCart();
    closeModal();
}

/* ===============================
   VISTA DE COMPRA (dinámica)
   - Abre una vista centrada con imagen, nombre, precio, cantidad
   - Permite confirmar compra mostrando mensaje de éxito
   - No usa frameworks externos
   =============================== */

function openPurchase(productNumber){

    // Definir producto seleccionado (podría provenir de un dataset o API)
    selectedProduct = {
        id: productNumber,
        name: `Producto ${productNumber}`,
        price: 120000,
        image: `images/producto-${productNumber}.jpg.JPG`
    };

    // Rellenar la vista con los datos del producto
    document.getElementById('purchaseImage').src = selectedProduct.image;
    document.getElementById('purchaseImage').alt = selectedProduct.name;
    document.getElementById('purchaseName').innerText = selectedProduct.name;
    document.getElementById('purchasePrice').innerText = selectedProduct.price;
    document.getElementById('purchaseQuantity').value = 1;
    document.getElementById('purchaseMessage').style.display = 'none';
    document.getElementById('purchaseMessage').innerText = '';

    // Mostrar overlay
    const overlay = document.getElementById('purchaseView');
    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden','false');

    // Event listeners para botones (se registran cada vez para mantener el comportamiento aislado)
    document.getElementById('purchaseBackBtn').onclick = closePurchase;
    document.getElementById('confirmPurchaseBtn').onclick = confirmPurchase;
}

function closePurchase(){
    const overlay = document.getElementById('purchaseView');
    overlay.style.display = 'none';
    overlay.setAttribute('aria-hidden','true');
}

function confirmPurchase(){
    // Leer cantidad y calcular total (si hace falta mostrarlo)
    const qty = parseInt(document.getElementById('purchaseQuantity').value, 10) || 1;

    // Mensaje de confirmación (requisito 5)
    const msgEl = document.getElementById('purchaseMessage');
    msgEl.innerText = 'Compra realizada con éxito';
    msgEl.style.display = 'block';

    // Opcional: desactivar botón por brevedad para evitar doble envío
    const btn = document.getElementById('confirmPurchaseBtn');
    btn.disabled = true;
    btn.style.opacity = 0.8;

    // Después de 1.8s cerramos la vista (ej: para simular confirmación)
    setTimeout(()=>{
        btn.disabled = false;
        btn.style.opacity = 1;
        closePurchase();
    }, 1800);
}


// ===============================
// CARRITO
// ===============================

function toggleCart(){
    document.getElementById("cart").classList.toggle("active");
}

function updateCart(){

    const cartItems = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    const cartCount = document.getElementById("cartCount");

    cartItems.innerHTML = "";

    cart.forEach((item, index)=>{

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                Talla: ${item.size}<br>
                $${item.price}
            </div>
            <button onclick="removeItem(${index})">✕</button>
        `;

        cartItems.appendChild(div);
    });

    totalElement.innerText = total;
    cartCount.innerText = cart.length;
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
    calculateTotal();
    updateCart();
}

function calculateTotal(){
    total = cart.reduce((sum, item) => sum + item.price, 0);
}

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===============================
// BOTONES "Comprar" - requisito: usar querySelectorAll(".btn-comprar")
// ===============================
function attachBuyButtons(){
    const buttons = document.querySelectorAll('.btn-comprar');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(){
            const card = btn.closest('.card');
            if(!card) return;

            const imgEl = card.querySelector('img');
            const nameEl = card.querySelector('h3');
            const priceEl = card.querySelector('p');

            const image = imgEl ? imgEl.src : '';
            const name = nameEl ? nameEl.innerText.trim() : '';
            const priceText = priceEl ? priceEl.innerText : '';
            const price = parseInt(priceText.replace(/\D/g, ''), 10) || 0;

            const product = { image, name, price };

            localStorage.setItem('selectedProduct', JSON.stringify(product));

            window.location.href = 'compra.html';
        });
    });
}


// ===============================
// WHATSAPP
// ===============================

function sendOrder(){

    if(cart.length === 0){
        alert("Tu carrito está vacío");
        return;
    }

    let message = "Nuevo Pedido:%0A%0A";

    cart.forEach(item=>{
        message += `• ${item.name} - Talla ${item.size} - $${item.price}%0A`;
    });

    message += `%0ATotal: $${total}`;

    window.open(`https://wa.me/${userPhone}?text=${message}`, "_blank");
}
