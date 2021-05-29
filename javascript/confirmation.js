//Récupération des données de la commande en LocalStorage
let order = localStorage.getItem("order");
orderParse = JSON.parse(order);

//Récupération des informations de l'utilisateur
contact = orderParse.contact;
document.getElementById("lastName").innerHTML = contact.lastName;
document.getElementById("firstName").innerHTML = contact.firstName;
document.getElementById("email").innerHTML = contact.email;
document.getElementById("address").innerHTML = contact.address;
document.getElementById("city").innerHTML = contact.city;

//Réupération de l'ID de la commande
let orderId = orderParse.orderId;
document.getElementById("orderId").innerHTML = orderId;

//Récupération des Produits de la commande
let products = orderParse.products;
if (products.length < 3) {
    document.getElementById("footer").classList.add("fixed-bottom");
}

for (let product of products) {
    displayProductContent(product);
};

//Créer un élément html pour chaque Produit dans la commande
function displayProductContent(product) {
    document.getElementById("showProductContent").innerHTML += `
    <div class="row bg-secondary text-white p-2" id="teddiesContainer">
    <div class="col-lg-6">
        <div class="justify-content-md-start teddieImg">
            <img src="${product.imageUrl}" alt="${product.name}" id="productImg">
        </div>
    </div>
    <div class="col-lg-6" id="teddiesContent">
        <div id="name">${product.name}</div>
    </div>
    `
};