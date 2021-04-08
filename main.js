function glazeOptions() {
    document.getElementById("choose-glazing").classList.toggle("show");
}

function quantityOptions() {
    document.getElementById("choose-quantity").classList.toggle("show");
}

function changeDetails(image, title, price) {
    localStorage.setItem("image", image);
    localStorage.setItem("title", title);
    localStorage.setItem("price", price);
}

function onLoad() {

    var i = localStorage.getItem("image");
    let img = document.getElementById("details-image");
    img.setAttribute("src", i);

    var t = localStorage.getItem("title");
    let title = document.getElementById("details-title");
    title.innerHTML = t;

    var p = localStorage.getItem("price");
    let price = document.getElementById("details-price");
    price.innerHTML = p;

    if (parseInt( sessionStorage.getItem( "cartQty" )) == 0) {
        document.getElementById("cart-display").innerHTML = "Cart";
    } else {
        document.getElementById("cart-display").innerHTML = "Cart("+parseInt(sessionStorage.getItem("cartQty"))+")";
    }
}

function updateGlazing(glazing) {
    sessionStorage.setItem("option", glazing);
    var o = sessionStorage.getItem("option");
    let option = document.getElementById("glaze-dropdown");
    option.innerHTML = o;
}

function updateQuantity(qty) {
    sessionStorage.setItem("option1", qty);
    var q = sessionStorage.getItem("option1");
    let option = document.getElementById("qty-dropdown");
    option.innerHTML = q;
}

function addToCart() {
    alert("Successfully Added to Cart!");
    
    var qty = 0;
    if (parseInt( sessionStorage.getItem( "cartQty" ))) {
        qty = parseInt( sessionStorage.getItem( "cartQty" ));
    }
    sessionStorage.setItem( "cartQty", qty+1 );
}
  
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}