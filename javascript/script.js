// Récupération des données sur le serveur via l'API
function getTeddies() {
    return fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
        let res = response.json();
        return res
    })
    .catch(function(error){
        alert(error)
    })
}

// Création dynamique du HTML des teddies sur la page d'accueil
function displayTeddies(produit) {
    document.getElementById("card-row-container").innerHTML += `
    <div class="col-lg-6">
        <div class="card shadow">
            <img src="${produit.imageUrl}" alt="ourson en peluche" class="card-img-top img-fluid">
            <div class="card-body text-center">
                <p class="card-name font-weight-bold">${produit.name}</p>
                <p class="card-description">${produit.description}</p>
                <p class="card-price">${produit.price/100+" €"}</p>
                <button class="btn btn-info stretched-link" onclick="setArticleInLocalStorage('${produit._id}')">En savoir plus !</button>
            </div>
        </div>
    </div>
    `
}

// boucle de récupération et de création pour chaque teddies
(async function() {
    const produits = await getTeddies()
    for (let produit of produits) {
        displayTeddies(produit)
    }
})()

// Envoie une promesse des élements en localStorage sur la page Produit via leur ID
function setArticleInLocalStorage(id) {
    const waitArticle = new Promise((resolve) => {
        localStorage.setItem("id", id);
        resolve();
    });

    waitArticle
        .then(() => window.location.href = "html/produits.html")
        .catch(error => console.log(error));
}