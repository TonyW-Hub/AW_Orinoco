let total = 0;
//Panier en localStorage
let products = localStorage.getItem("products")
products = JSON.parse(products);
if (!products || products == "") {
    products = []

    localStorage.setItem("products", JSON.stringify(products))
}

// Tableau du nombre de produits en localStorage
let productQuantities = localStorage.getItem("productQuantities")
productQuantities = JSON.parse(productQuantities);
if (!productQuantities || productQuantities == "") {
    productQuantities = []

    localStorage.setItem("productQuantities", JSON.stringify(productQuantities))
}

// Met à jour le tableau Products en localStorage
function updateProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

// Met à jour le tableau ProductQuantity en localStorage
function updateProductQuantity(productId, quantity, color) {
    let productIndex = productQuantities.findIndex(product => product.id == teddy._id);
    if(productIndex > -1) {
        productQuantities[productIndex].quantity = quantity;
    } else {
        let object = {
            id: teddy._id,
            quantity: quantity,
            color: color,
        }

        productQuantities.push(object);
    }
    localStorage.setItem("productQuantities", JSON.stringify(productQuantities));
}

// Récupère le contenu des produits depuis l'API via leurs ID
function fetchProduct(productId) {
    return fetch("http://localhost:3000/api/teddies/"+productId)
        .then(function(response) {
            let res = response.json();
            return res;
        }).catch(function(error) {
            alert(error)
            return null;
        });
}

// Met à jour le total en €
function updateTotal(method, amount) {
    if(method == "add") {
        total += amount;
    } else {
        total -= amount;
    }
    document.getElementById("total").innerText = "Prix total : " + total + " €";
}

// Créer dynamiquement le contenu HTML des articles dans le Panier
let panierContainer = async (productId) => {
    let container = document.getElementById("panierContainer");
    if(!container) return;

    let response = await fetchProduct(productId);

    let productIndex = productQuantities.findIndex(product => product.id == productId);
    let quantity;
    let color;

    if(productIndex > -1) {
        quantity = productQuantities[productIndex].quantity;
        color = productQuantities[productIndex].color;
    }

    container.innerHTML += `
        <div class="row card-panier" data-containerId="${response._id}">
            <div class="card col-lg-12 articlePanier shadow">
                <img src="${response.imageUrl}" alt="${response.name} photo" class="img-fluid card-img">
                <div class="card-body text-white articleContent">
                    <p class="card-name">${response.name}</p>
                    <p class="card-color">${color}</p>
                    <div class="card-quantity">
                        <button class="btn less-btn stretched-link" data-lessid="${response._id}"><i class="fas fa-minus"></i></button>
                            Quantité: <span class="articleQuantity" id="quantity${response._id}">${quantity}</span>
                        <button class="btn add-btn stretched-link" data-addid="${response._id}"><i class="fas fa-plus"></i></button>
                    </div>
                    <p id="teddy${response._id}" class="card-price" data-price="${(parseInt(response.price)/100)}">Prix: ${(parseInt(response.price)/100) * parseInt(quantity) + " €"}</p>
                </div>
                <div class="card-delete">
                    <span class="btn btn-danger bg-danger text-white font-weight-bold delete" data-id="${response._id}">Supprimer</span>
                </div>
            </div>
        </div>
        `
        updateTotal("add", (parseInt(response.price)/100) * parseInt(quantity));
        updateDeleteButton();
        updateLessBtn();
        updateAddBtn();
}

// Parcours le panier en localStorage
function loadPanier() {
    for (let productId of products) {
        panierContainer(productId)
    }
}
loadPanier();

// Button "supprimer" et update l'affichage de la page
function updateDeleteButton() {
    let deleteSpans = document.querySelectorAll('.delete');
    if(deleteSpans.length > 0) {
        deleteSpans.forEach(span => {
            span.addEventListener("click", (e)=> {
                if (confirm("Voulez-vous supprimer l'article ?")) {
                    let teddyId = e.target.dataset.id;
                    let teddyPrice = parseInt(document.getElementById("teddy"+teddyId).dataset.price);
                    let quantity = parseInt(document.getElementById("quantity"+teddyId).innerHTML);
    
                    // Met à jour les products
                    let index = products.findIndex(id => id == teddyId);
                    if(index > -1) {
                        products.splice(index, 1);
                        
                        updateTotal("minus", teddyPrice * quantity);
    
                        // Met à jour les productQuantities
                        let productIndex = productQuantities.findIndex(produit => produit.id == teddyId);
    
                        if(productIndex > -1) productQuantities.splice(productIndex, 1);
    
                        localStorage.setItem("products", JSON.stringify(products));
                        localStorage.setItem("productQuantities", JSON.stringify(productQuantities));
    
                        document.querySelector("div[data-containerId='" + teddyId + "']").remove();
                    }
                }
            })
        })
    }
}

// Bouton moins sur les articles du panier
// Adapte dynamique la quantité et le prix des produits
function updateLessBtn() {
    let lessBtnArray = document.querySelectorAll(".less-btn");
    if (lessBtnArray.length > 0) {
        lessBtnArray.forEach(lessBtn => {
            lessBtn.addEventListener("click", (e) => {
                let button = e.target;
                let teddyId = button.dataset.lessid;
                let index = products.findIndex(id => id == teddyId);
                let teddyPrice = parseInt(document.getElementById("teddy"+teddyId).dataset.price);
                let quantity = parseInt(document.getElementById("quantity"+teddyId).innerHTML);
            
                if (index > -1) {
                    quantity--;
                    button.parentElement.querySelector(".articleQuantity").innerText = quantity;
        
                    let container = button.parentElement.parentElement.parentElement;
                    container.querySelector(".card-price").innerText = "Prix: " + teddyPrice * quantity + " €";

                    if (quantity == 0) {
                        products.splice(index, 1)
                        container.remove()
                    }

                    updateTotal("minus", teddyPrice);

                    let productIndex = productQuantities.findIndex(produit => produit.id == teddyId);
                    if(productIndex > -1) productQuantities[productIndex].quantity = quantity;

                    updateArticleQuantityInBasket();
                    
                    localStorage.setItem("products", JSON.stringify(products));
                    localStorage.setItem("productQuantities", JSON.stringify(productQuantities));
                } else {
                    console.log("Quantity not found");
                }
            })
        })
    }
}

// Bouton plus sur les articles du panier
// Adapte dynamique la quantité et le prix des produits
function updateAddBtn() {
    let addBtnArray = document.querySelectorAll(".add-btn");
    if (addBtnArray.length > 0) {
        addBtnArray.forEach(addBtn => {
            addBtn.addEventListener("click", (e) => {
                let button = e.target;
                let teddyId = button.dataset.addid;
                let index = products.findIndex(id => id == teddyId);
                let teddyPrice = parseInt(document.getElementById("teddy"+teddyId).dataset.price);
                let quantity = parseInt(document.getElementById("quantity"+teddyId).innerHTML);
            
                if (index > -1) {
                    quantity++;
                    button.parentElement.querySelector(".articleQuantity").innerText = quantity;
        
                    let container = button.parentElement.parentElement.parentElement;
                    container.querySelector(".card-price").innerText = "Prix: " + teddyPrice * quantity + " €";

                    if (quantity == 0) {
                        products.splice(index, 1)
                        container.remove()
                    }

                    updateTotal("add", teddyPrice);

                    let productIndex = productQuantities.findIndex(produit => produit.id == teddyId);
                    if(productIndex > -1) productQuantities[productIndex].quantity = quantity;

                    updateArticleQuantityInBasket();
                    
                    localStorage.setItem("products", JSON.stringify(products));
                    localStorage.setItem("productQuantities", JSON.stringify(productQuantities));
                } else {
                    console.log("Quantity not found");
                }
            })
        })
    }
}

// Met à jour le nombre d'article qu'il y a dans le panier
function updateArticleQuantityInBasket() {
    let totalProducts = 0;
    for(let product of productQuantities) {
        totalProducts += parseInt(product.quantity);
    }
    document.getElementById("quantityInPanier").innerText = totalProducts;
}
updateArticleQuantityInBasket();

//supprimer tout les articles dans le panier
let deleteAllArticle = document.getElementById("deleteAll");
if (deleteAllArticle) {
    deleteAllArticle.addEventListener("click", (e) => {
        if (confirm("Voulez-vous supprimer tous les articles ?")) { 
            localStorage.removeItem("products")
            localStorage.removeItem("productQuantities")
            document.getElementById("quantityInPanier").innerText = 0;
            document.getElementById("panierContainer").innerHTML = "Vous n'avez pas d'articles dans le panier"
        } else {
            console.log("Impossible à supprimer")
        }
    })
}


/* ----- FORMULAIRE ----- */
// Envoi le formulaire lors du click sur le bouton commande
let btnSendForm = document.getElementById('btnForm');
if (btnSendForm) {
    btnSendForm.addEventListener("click", (e) => {    
        e.preventDefault();
        let contact = {
            lastName: document.getElementById("nomForm").value,
            firstName: document.getElementById("prenomForm").value,
            address: document.getElementById("adresseForm").value,
            city: document.getElementById("villeForm").value,
            email: document.getElementById("emailForm").value,
        };
        envoiFormulaire({contact, products}, "http://localhost:3000/api/teddies/order")   
    })
}

// Envoi POST du formulaire sur l'API
// Supprime le localStorage du panier, et créer un localStorage avec les informations de la commande
const envoiFormulaire = (info, url) => {
    return new Promise((resolve) => {
      let request = new XMLHttpRequest();
      request.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            localStorage.setItem('order', this.responseText);

            localStorage.removeItem('products');
            localStorage.removeItem('productQuantities');
            localStorage.removeItem('id');

            window.location.href = "confirmation.html"
        } else {
            alert("Vérifiez que vous avez bien rempli tous les champs.")
        }
      };
      request.open("POST", url);
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(info));
    });
  };