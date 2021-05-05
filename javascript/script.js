// PAGE D'ACCUEIL
// récupération des données sur le serveur
function getTeddies() {
    return fetch("http://localhost:3000/api/teddies")
    .then(function(response) {
        return response.json()
    })
    .catch(function(error){
        alert(error)
    })
}

// création dynamique du HTML des teddies sur la page d'accueil
function displayTeddies(produit) {
    document.getElementById("card-row-container").innerHTML += `
    <div class="col-lg-6">
        <div class="card shadow">
            <img src="${produit.imageUrl}" alt="ourson en peluche" class="card-img-top img-fluid">
            <div class="card-body text-center">
                <p class="card-name font-weight-bold">${produit.name}</p>
                <p class="card-description">${produit.description}</p>
                <p class="card-price">${produit.price/100+" €"}</p>
                <button class="btn btn-info stretched-link" onclick="setArticleInLocalStorage('${produit.name}','${produit.description}','${produit.price/100+" €"}','${produit.imageUrl}','${produit.colors}')">En savoir plus !</button>
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


//PAGE PRODUITS
//ajout des elements en local storage
function setArticleInLocalStorage(name, description, price, imageUrl, colors) {
    localStorage.setItem("name", name)
    localStorage.setItem("description", description)
    localStorage.setItem("price", price)
    localStorage.setItem("imageUrl", imageUrl)

    let colorsArray = colors.split(",");
    let jsonColors = JSON.stringify(colorsArray)
    localStorage.setItem("colors", jsonColors)

    window.location.href = "html/produits.html";

}


