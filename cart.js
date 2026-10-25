// All product details
const PRODUCT_DATA = [
    {id:1, name:"Broom", price:120, image:"broom.jpg"},
    {id:2, name:"Bucket", price:180, image:"bucket.jpg"},
    {id:3, name:"Toilet Cleaner Brush", price:80, image:"toilet_brush.jpg"},
    {id:4, name:"Floor Cleaner", price:120, image:"floor_cleaner.jpg"},
    {id:5, name:"Scotch Brite", price:40, image:"scotch_brite.jpg"},
    {id:6, name:"Cleaning Cloth", price:60, image:"cleaning_cloth.jpg"},
    {id:7, name:"Dustpan", price:70, image:"dustpan.jpg"},
    {id:8, name:"Floor Mop", price:150, image:"floor_mop.jpg"},
    {id:9, name:"Harpic", price:110, image:"harpic.jpg"},
    {id:10, name:"Naphthalene Balls", price:60, image:"naphthalene_balls.jpg"},
    {id:11, name:"Room Freshener", price:100, image:"room_freshener.jpg"},
    {id:12, name:"Hand Gloves", price:80, image:"hand_gloves.jpg"}
];

// Read cart from this browser
function getCart() {
    try {
        return JSON.parse(localStorage.getItem("gkCart")) || {};
    } catch (error) {
        return {};
    }
}

// Save cart in this browser
function saveCart(cart) {
    localStorage.setItem("gkCart", JSON.stringify(cart));
    updateCartCount();
}

// Add product to cart
function addToCart(productId, quantity) {
    const cart = getCart();
    const key = String(productId);
    const currentQuantity = Number(cart[key]) || 0;

    cart[key] = Math.min(99, currentQuantity + quantity);
    saveCart(cart);
}

// Increase or decrease quantity
function changeCartQuantity(productId, change) {
    const cart = getCart();
    const key = String(productId);
    const quantity = (Number(cart[key]) || 0) + change;

    if (quantity <= 0) {
        delete cart[key];
    } else {
        cart[key] = Math.min(99, quantity);
    }

    saveCart(cart);
}

// Remove a product completely
function removeFromCart(productId) {
    const cart = getCart();
    delete cart[String(productId)];
    saveCart(cart);
}

// Show the total number of items in the navigation
function updateCartCount() {
    const countElement = document.getElementById("cart-count");
    if (!countElement) return;

    const cart = getCart();
    const count = Object.values(cart).reduce(
        (total, quantity) => total + (Number(quantity) || 0), 0
    );

    countElement.textContent = count > 0 ? "(" + count + ")" : "";
}

document.addEventListener("DOMContentLoaded", updateCartCount);