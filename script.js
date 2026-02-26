let cart = [];
let userPhone = "573227067516";

/* =========================
   CARGA DE PRODUCTOS
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const seleccionContainer = document.getElementById("seleccionContainer");
    const calzadoContainer = document.getElementById("calzadoContainer");

    const seleccionIDs = [46, 54, 66, 4];

    for (let i = 1; i <= 68; i++) {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/producto-${i}.jpg.JPG">
            <h3>Producto ${i}</h3>
            <p>$140.000</p>

            <select id="size-${i}">
                <option value="">Seleccionar talla</option>
                ${[35,36,37,38,39,40,41,42,43]
                .map(t => `<option value="${t}">${t}</option>`).join("")}
            </select>

            <button onclick="addToCart(${i})">Agregar al carrito</button>
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

function addToCart(id){

    const size = document.getElementById(`size-${id}`).value;

    if(!size){ 
        alert("Selecciona talla"); 
        return; 
    }

    cart.push({
        name:`Producto ${id}`,
        price:140000,
        size:size,
        img:`images/producto-${id}.jpg.JPG`
    });

    updateCart();
    showToast();
}


/* =========================
   ACTUALIZAR CARRITO
========================= */

function updateCart(){

    const cartItems=document.getElementById("cartItems");
    const cartCount=document.getElementById("cartCount");
    const cartTotal=document.getElementById("cartTotal");

    cartItems.innerHTML="";
    let total=0;

    cart.forEach((item,index)=>{

        total+=item.price;

        cartItems.innerHTML+=`
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <strong>${item.name}</strong><br>
                    👟 Talla: ${item.size}<br>
                    💰 $${item.price.toLocaleString()}<br>
                    <button onclick="removeItem(${index})">Eliminar</button>
                </div>
            </div>`;
    });

    cartCount.innerText=cart.length;
    cartTotal.innerText=total.toLocaleString();
}


/* =========================
   ELIMINAR PRODUCTO
========================= */

function removeItem(index){
    cart.splice(index,1);
    updateCart();
}


/* =========================
   TOGGLE CARRITO
========================= */

function toggleCart(){
    const sidebar = document.getElementById("cartSidebar");
    sidebar.classList.toggle("active");
}


/* =========================
   MODAL COMPRA
========================= */

function openCheckout(){
    if(cart.length===0){ 
        alert("Carrito vacío"); 
        return;
    }
    document.getElementById("purchaseModal").style.display="flex";
}

function closePurchase(){
    document.getElementById("purchaseModal").style.display="none";
}


/* =========================
   TOAST + ANIMACIÓN ICONO
========================= */

function showToast(){

    const toast=document.getElementById("toast");
    const cartIcon=document.querySelector(".cart-icon");

    toast.classList.add("show");

    if(cartIcon){
        cartIcon.style.transform="scale(1.15)";
        cartIcon.style.transition="0.3s ease";
    }

    setTimeout(()=>{
        toast.classList.remove("show");
        if(cartIcon){
            cartIcon.style.transform="scale(1)";
        }
    },2000);
}


/* =========================
   WHATSAPP PREMIUM FINAL
========================= */

function sendWhatsAppOrder(){

    let name = document.getElementById("customerName").value;
    let city = document.getElementById("customerCity").value;
    let address = document.getElementById("customerAddress").value;
    let phone = document.getElementById("customerPhone").value;

    if(!name || !city || !address || !phone){
        alert("Completa todos los datos");
        return;
    }

    let total = document.getElementById("cartTotal").innerText;

    let message = "🛍️ *NUEVO PEDIDO - MERCH STORE* 🛍️\n\n";

    message += "━━━━━━━━━━━━━━━━━━\n";
    message += "👤 *Cliente:* " + name + "\n";
    message += "📍 *Ciudad:* " + city + "\n";
    message += "🏠 *Dirección:* " + address + "\n";
    message += "📱 *WhatsApp:* " + phone + "\n";
    message += "━━━━━━━━━━━━━━━━━━\n\n";

    message += "🛒 *Productos seleccionados:*\n\n";

    cart.forEach((item)=>{
        message += "• 👟 " + item.name + 
                   " | Talla: " + item.size + 
                   " | $"+ item.price.toLocaleString() + "\n";
    });

    message += "\n━━━━━━━━━━━━━━━━━━\n";
    message += "💰 *Total:* $" + total + "\n";
    message += "🔥 Edición Limitada Mundial 2026 🇨🇴\n";
    message += "✨ Gracias por comprar con nosotros";

    let encodedMessage = encodeURIComponent(message);

    window.open(`https://wa.me/${userPhone}?text=${encodedMessage}`,"_blank");

    /* Reset después de enviar */
    cart = [];
    updateCart();
    closePurchase();
}