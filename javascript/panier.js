//Panier en localStorage
let panier = localStorage.getItem("panier")
panier = JSON.parse(panier);
if (!panier || panier == "") {
    panier = {
        articles: [],
        total: 0,
    } 

    localStorage.setItem("panier", JSON.stringify(panier))
}

//ajout des élements HTML pour chaque article dans le panier
let panierContainer = (article) => {
    document.getElementById("panierContainer").innerHTML += `
    <div class="row card-panier" data-containerName="${article.name}">
        <div class="card col-lg-12 articlePanier shadow">
            <img src="${article.img}" alt="ourson en peluche" class="img-fluid card-img">
            <div class="card-body text-white articleContent">
                <p class="card-name">${article.name}</p>
                <p class="card-color">Couleur: ${article.color}</p>
                <p class="card-quantity">Quantité: ${parseInt(article.quantity)}</p>
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

let deleteSpans = document.querySelectorAll('.delete');

//Affiche le prix total au chargement de la page
let total = 0;
for(let article of panier.articles) {
    total += parseInt(article.price) * parseInt(article.quantity);
}

let totalContainer = document.getElementById("total");
totalContainer.innerText = "Prix total : " + total + " €";

//Supprime un article du panier et affiche de manière dynamique le prix total des articles
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

            let newTotal = 0;
            for (let priceArticle of articles) {
                newTotal += parseInt(priceArticle.price) * parseInt(priceArticle.quantity);
            }
            totalContainer.innerText = "Prix total : " + newTotal + " €"; 
            
        } else {
            console.log("Could not delete")
        }
    }
    })
})


// document.querySelectorAll(".card-panier").forEach(element => {
//     let total = panier.length * parseInt(panier.articles[0].price) * parseInt(panier.articles[0].quantity) + " €";
//     console.log(panier.articles[0].price);
//     document.querySelector(".total").innerHTML = total;
// })

// let total = document.getElementsByClassName("total")
// total.forEach(price => {
//     price.addEventListener("change", function(event) {
//         let value = event.target.innerHTML;
//         document.getElementsByClassName("total").innerHTML = value
//     })
// });
//supprime l'aricle du panier
// let deleteArticle = document.getElementById("delete");
// deleteArticle.addEventListener("click", ()=> {
//     if (confirm("Voulez-vous supprimer l'article ?")) {
//         for (let article of articleOnPanier.articles) {
//             let articleOnBasket = localStorage.getItem("panier");
//             articleOnBasket = JSON.parse(articleOnBasket);
//             article.splice(0)
//         }
//     } else {
//         document.getElementById("delete").className = "text-warning";
//     }
// })

