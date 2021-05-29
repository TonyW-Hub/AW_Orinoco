let teddy = null;

// Récupère les produits via leurs ID
function loadProduct() {
    return fetch("http://localhost:3000/api/teddies/"+localStorage.getItem("id"))
        .then(function(response) {
            let res = response.json();
            return res;
        })
        .catch(function(error) {
            alert(error)
            return null;
        });
};

// Récupère de manière dynamique l'élément sélectionné par l'utilisateur
// Et insert les informations correspondant dans les éléments HTML
(async function() {
    // récupère la promesse du produit sélectionné
    teddy = await loadProduct();
    if(!teddy) return alert("Could not fetch article")

    document.getElementById("name").innerText = teddy.name;
    document.getElementById("description").innerHTML = teddy.description;
    document.getElementById("price").innerHTML = teddy.price/100 + " €";
    const colorsContainer = document.getElementById("colorsItems");
    for(let color of teddy.colors) {
        let dropDownItem = document.createElement("button");
        dropDownItem.classList.add("dropdown-item")
        dropDownItem.innerHTML = color;
        colorsContainer.appendChild(dropDownItem);
    }
    let monImg = document.getElementById("productImg");
    monImg.src = teddy.imageUrl;
    monImg.alt = teddy.name;

    // Permet à l'utilisateur de voir la couleur sélectionné
    let colorButtons = document.querySelectorAll('.dropdown-item');
    console.log(colorButtons);
    colorButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            let value = event.target.innerHTML;
            document.getElementById("selectorColor").innerHTML = value
        })
    });

})();


// Met à jour le localStorage du Panier, via les élements sélectionner sur la page Produit
function updatePanier() {
    if(!teddy) return alert("Could not find teddy");
    
    let quantity = document.getElementById("numberOfTeddies").value;
    let color = document.getElementById("selectorColor").innerHTML;
    if(!products.includes(teddy._id)) products.push(teddy._id);

    updateProductQuantity(teddy._id, quantity, color)

    updateProducts(products); 

    window.location.href = "panier.html"
}