//Panier en localStorage
let panier = localStorage.getItem("panier")
panier = JSON.parse(panier);
if (!panier || panier == "") {
    panier = {
        articles: [],
    } 

    localStorage.setItem("panier", JSON.stringify(panier))
}

//ajout des élements HTML pour chaque article dans le panier
let panierContainer = (article) => {
    let container = document.getElementById("panierContainer");
    if(!container) return;
    container.innerHTML += `
    <div class="row card-panier" data-containerName="${article.name}">
        <div class="card col-lg-12 articlePanier shadow">
            <img src="${article.img}" alt="ourson en peluche" class="img-fluid card-img">
            <div class="card-body text-white articleContent">
                <p class="card-name">${article.name}</p>
                <p class="card-color">Couleur: ${article.color}</p>
                <div class="card-quantity">
                    <button class="btn less-btn stretched-link" data-name="${article.name}"><i class="fas fa-minus"></i></button>
                        Quantité: <span class="articleQuantity">${article.quantity}</span>
                    <button class="btn add-btn stretched-link" data-name="${article.name}"><i class="fas fa-plus"></i></button>
                </div>
                <p class="card-price">Prix: ${parseInt(article.price) * parseInt(article.quantity) + " €"}</p>
            </div>
            <div class="card-delete">
                <span id="delete" class="btn btn-danger bg-danger text-white font-weight-bold delete" data-name="${article.name}">Supprimer</span>
            </div>
        </div>
    </div>
    `
}

//boucle qui parcour le nombre d'article dans le panier
for (let article of panier.articles) {
    panierContainer(article)
}

//Affiche le prix total au chargement de la page
let total = 0;
for(let article of panier.articles) {
    total += parseInt(article.price) * parseInt(article.quantity);
}

let totalContainer = document.getElementById("total");
if(totalContainer) {
    totalContainer.innerText = "Prix total : " + total + " €";
}

//Supprime un article du panier et affiche de manière dynamique le prix total des articles
let deleteSpans = document.querySelectorAll('.delete');
deleteSpans.forEach(span => {
    span.addEventListener("click", (e)=> {
    if (confirm("Voulez-vous supprimer l'article ?")) {
        panier = JSON.parse(localStorage.getItem("panier"));

        let teddiesHtml = e.target;
        let name = teddiesHtml.dataset.name;
        let index = panier.articles.findIndex(article => article.name == name);

        if (index > -1) {
            let articles = panier.articles;
            articles.splice(index, 1);
            panier.articles = articles;

            localStorage.setItem("panier", JSON.stringify(panier));
            document.querySelector("div[data-containerName='" + name + "']").remove();
            updateTotal();
            updateArticleQuantityInBasket();
        } else {
            console.log("Could not delete")
        }
    }
    })
})

//supprimer tout les articles dans le panier
let deleteAllArticle = document.getElementById("deleteAll");
if (deleteAllArticle) {
    deleteAllArticle.addEventListener("click", (e) => {
        if (confirm("Voulez-vous supprimer tous les articles ?")) { 
            localStorage.removeItem("panier")
            document.getElementById("quantityInPanier").innerText = 0;
            document.getElementById("panierContainer").innerHTML = "Vous n'avez d'article dans le panier"
        } else {
            console.log("Impossible à supprimer")
        }
    })
}

//bouton moins sur les articles du panier
let lessBtnArray = document.querySelectorAll(".less-btn");
if (lessBtnArray.length > 0) {
    lessBtnArray.forEach(lessBtn => {
        lessBtn.addEventListener("click", (e) => {
            panier = JSON.parse(localStorage.getItem("panier"));
            let button = e.target;
            let name = button.dataset.name;
            let index = panier.articles.findIndex(article => article.name == name);
           
            if (index > -1) {
               let quantityParse = parseInt(panier.articles[index].quantity)
                quantityParse--;
                panier.articles[index].quantity = quantityParse
                button.parentElement.querySelector(".articleQuantity").innerText = quantityParse
    
                let container = button.parentElement.parentElement.parentElement;
                updatePrice(container, index);

                if (quantityParse == 0) {
                    panier.articles.splice(index, 1)
                    container.remove()
                }

                updateTotal();
                updateArticleQuantityInBasket();
                localStorage.setItem("panier", JSON.stringify(panier));
            } else {
                console.log("Quantity not found");
            }
        })
    })
}

//bouton plus sur les articles du panier,
let addBtnArray = document.querySelectorAll(".add-btn");
if (addBtnArray.length > 0) {
    addBtnArray.forEach(addBtn => {
        addBtn.addEventListener("click", (e) => {
            panier = JSON.parse(localStorage.getItem("panier"));
            let button = e.target;
            let name = button.dataset.name;
            let index = panier.articles.findIndex(article => article.name == name);

            if (index > -1) {
                let quantityParse = parseInt(panier.articles[index].quantity);
                quantityParse++;
                panier.articles[index].quantity = quantityParse;
                button.parentElement.querySelector(".articleQuantity").innerText = quantityParse;

                let container = button.parentElement.parentElement.parentElement;
                updatePrice(container, index);

                if (quantityParse == 0) {
                    panier.articles.splice(index, 1)
                    container.remove()
                }

                updateTotal();
                updateArticleQuantityInBasket();
                localStorage.setItem("panier", JSON.stringify(panier));
            } else {
                console.log("Quantity not found");
            }
        })
    })
}

//fonction qui met à jour le prix de l'article sélectionner
function updatePrice(element, index) {
    let article = panier.articles[index];
    let quantity = article.quantity;
    let total = quantity * article.price;
    element.querySelector(".card-price").innerText = total + " €";
}

//fonction qui met à jour le prix total du panier
function updateTotal() {
    let newTotal = 0;
    for (let priceArticle of panier.articles) {
        newTotal += parseInt(priceArticle.price) * parseInt(priceArticle.quantity);
    }
    totalContainer.innerText = "Prix total : " + newTotal + " €"; 
}

//indication du nombre d'article dans le panier
function updateArticleQuantityInBasket() {
    let allQuantity = 0;
    for (article of panier.articles) {
        allQuantity += parseInt(article.quantity)
    }
    document.getElementById("quantityInPanier").innerText = allQuantity;
}
updateArticleQuantityInBasket()
