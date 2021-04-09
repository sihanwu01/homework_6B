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

function onLoadPage() {
    var cart = sessionStorage.getItem( "cartQty" );
    if (cart == null || parseInt(cart)==0) {
        document.getElementById("cart-display").innerHTML = "Cart";
    } else {
        document.getElementById("cart-display").innerHTML = "Cart("+parseInt(sessionStorage.getItem("cartQty"))+")";
    }
}

function onLoadDetails() {
    var i = localStorage.getItem("image");
    let img = document.getElementById("details-image");
    img.setAttribute("src", i);

    var t = localStorage.getItem("title");
    let title = document.getElementById("details-title");
    title.innerHTML = t;

    var p = localStorage.getItem("price");
    let price = document.getElementById("details-price");
    price.innerHTML = p;

    onLoadPage();
}

function updateGlazing(glazing) {
    sessionStorage.setItem("glazing", glazing);
    var o = sessionStorage.getItem("glazing");
    let option = document.getElementById("glaze-dropdown");
    option.innerHTML = o;
}

function updateQuantity(qty) {
    sessionStorage.setItem("quantity", qty);
    var q = sessionStorage.getItem("quantity");
    let option = document.getElementById("qty-dropdown");
    option.innerHTML = q;
}

function addToCart() {  
    var qty = 0;
    if (parseInt( sessionStorage.getItem( "cartQty" ))) {
        qty = parseInt( sessionStorage.getItem( "cartQty" ));
    }
    sessionStorage.setItem( "cartQty", qty+1 );

    sessionStorage.setItem("image", localStorage.getItem("image"));
    sessionStorage.setItem("title", localStorage.getItem("title"));
    sessionStorage.setItem("price", localStorage.getItem("price"));
    sessionStorage.setItem("quantity", document.getElementById("qty-dropdown").innerHTML);
    sessionStorage.setItem("glazing", document.getElementById("glaze-dropdown").innerHTML);

    var id = (sessionStorage.getItem("shopping-cart") == null? 0:JSON.parse(sessionStorage.getItem("shopping-cart")).length);
    var item = {id: id, image: sessionStorage.getItem("image"), title: sessionStorage.getItem("title"),
                price: sessionStorage.getItem("price"), glazing: sessionStorage.getItem("glazing"),
                quantity: sessionStorage.getItem("quantity")};
    
    if(sessionStorage.getItem("shopping-cart") == null) {
        sessionStorage.setItem("shopping-cart", JSON.stringify([item]));
    } else {
        var cart = sessionStorage.getItem("shopping-cart");
        var cartArr = JSON.parse(cart);
        cartArr.push(item);
        sessionStorage.setItem("shopping-cart", JSON.stringify(cartArr));
    }

    alert("Successfully Added to Cart!");
    onLoadPage();
}

function onLoadCart() {
    onLoadPage();
    loadCart();
}

function loadCart() {
    var cartString = sessionStorage.getItem("shopping-cart");
    var cartArr = JSON.parse(cartString);

    for (i = 0; i < cartArr.length; i++) {
        var cart = document.getElementById("shopping-cart");

        //create new item
        var item = document.createElement("div");
        item.className = "item";
        item.id = "item"+i;

        //set image
        var imageDiv = document.createElement("div");
        imageDiv.className = "cart-image";
        var productImage = document.createElement("img");
        productImage.src = cartArr[i].image;
        productImage.alt = cartArr[i].title;
        imageDiv.appendChild(productImage);
        item.appendChild(imageDiv);

        //set description
        var descDiv = document.createElement("div");
        descDiv.className = "description";
        var titleSpan = document.createElement("span");
        titleSpan.innerHTML = cartArr[i].title;
        descDiv.appendChild(titleSpan);
        var glazeSpan = document.createElement("span");
        var glaze = cartArr[i].glazing;
        glazeSpan.innerHTML = (glaze == "None"? "No Glazing":glaze+" Glazing");
        descDiv.appendChild(glazeSpan);
        item.appendChild(descDiv);

        //set quantity
        var qtyDiv = document.createElement("div");
        qtyDiv.className = "quantity";
        //minus button
        var minus = createButton("minus-btn", "images/minus.png", "Minus");
        qtyDiv.appendChild(minus);
        //quantity
        var qty = document.createElement("input");
        qty.type = "text";
        qty.name = "name";
        qty.value = cartArr[i].quantity
        qtyDiv.appendChild(qty);
        //add button
        var add = createButton("add-btn", "images/add.png", "Add");
        qtyDiv.appendChild(add);
        item.appendChild(qtyDiv);

        //set price
        var priceDiv = document.createElement("div");
        priceDiv.className = "price";
        var sign = document.createElement("p");
        sign.className = "price";
        sign.innerHTML = "$";
        priceDiv.appendChild(sign);
        priceDiv.innerHTML = cartArr[i].quantity * cartArr[i].price * 1.00;
        item.appendChild(priceDiv);

        //delete button;
        var deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            deleteItem(i-1);
        };
        item.appendChild(deleteBtn);

        cart.appendChild(item);
    }
}

function deleteItem(id) {
    confirm("Are you sure you want to remove this item from your cart?");
    var item = document.getElementById("item"+id.toString());
    item == null? alert("null"): item.remove();

    var cart = sessionStorage.getItem("shopping-cart");
    var cartArr = JSON.parse(cart);
    var newCart = cartArr.filter(function( obj ) {
        return obj.id !== id;
    });
    sessionStorage.setItem("shopping-cart", JSON.stringify(newCart));
    var qty = sessionStorage.getItem("cartQty");
    sessionStorage.setItem( "cartQty", qty - 1);
    onLoadPage();
}

function createButton(className, image, alt) {
    var btn = document.createElement("button");
    btn.className = className;
    btn.type = "button";
    btn.name= "button";
    var img = document.createElement("img");
    img.src = image;
    img.alt = alt;
    btn.appendChild(img);
    return btn;
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