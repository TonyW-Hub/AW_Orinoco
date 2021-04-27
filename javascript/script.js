(async function() {
    const produits = await getArticles()
    for (let produit of produits) {
        displayArticles(produit)
    }
})()

function getArticles() {
    return fetch("http://localhost:3000/api/teddies")
        .then(function(response) {
            return response.json()
        })
        .catch(function(error){
            alert(error)
        })
}

function displayArticles(produit) {
    console.log(produit)
    document.getElementById("card-row-container").innerHTML += `
    <div class="col-lg-6">
        <div class="card shadow">
            <div class="card-body text-center">
                <img src="${produit.imageUrl}" alt="ourson en peluche" class="card-img-top img-fluid">
                <p class="card-name font-weight-bold">${produit.name}</p>
                <p class="card-description">${produit.description}</p>
                <p class="card-price">${produit.price/100} €</p>
                <a href="html/produits.html" class="btn btn-info stretched-link">Je le veux !</a>
            </div>
        </div>
    </div>
    `
}