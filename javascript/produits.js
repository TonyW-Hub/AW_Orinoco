//ajout des données des Produits depuis le local Storage
document.getElementById("name").innerText = localStorage.getItem("name");
document.getElementById("description").innerHTML = localStorage.getItem("description");
document.getElementById("price").innerHTML = localStorage.getItem("price");


//ajout des images sur la page Produit
let monImg = document.createElement("img");
monImg.src = localStorage.getItem("imageUrl");
let tedImgContainer = document.getElementById("teddies-img");
tedImgContainer.appendChild(monImg);


//ajout des différentes couleurs des ours en peluche
let colors = localStorage.getItem("colors")
colors = JSON.parse(colors) 
const colorsContainer = document.getElementById("colorsItems")
for(let color of colors) {
    let dropDownItem = document.createElement("button");
    dropDownItem.classList.add("dropdown-item")
    dropDownItem.innerHTML = color;
    colorsContainer.appendChild(dropDownItem);
}


//montre la couleur selectionné par l'utilisateur
let colorButtons = document.querySelectorAll('.dropdown-item');
colorButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        let value = event.target.innerHTML;
        document.getElementById("selectorColor").innerHTML = value
    })
});


//ajout de manière dynamique de la quantité des oursons en local storage
document.getElementById("numberOfTeddies").addEventListener('change', () => {
    let quantity = document.getElementById("numberOfTeddies").value;
    localStorage.setItem("quantity", quantity);
});


// ajout et update du panier en localStorage
function updatePanier() {
    let currentPanier = localStorage.getItem("panier");
    currentPanier = JSON.parse(currentPanier);

    // Crée une variable pour vérifier si le teddy est déjà dans les articles
    let currentTeddy = currentPanier.articles.find(article => article.name == localStorage.getItem("name"));
    if (!currentTeddy) {
        let article = {
            name: localStorage.getItem("name"),
            color: document.getElementById("selectorColor").innerText,
            quantity: localStorage.getItem("quantity"),
            price: localStorage.getItem("price"),
            img: localStorage.getItem("imageUrl")
        };
        
        currentPanier.articles.push(article)
        localStorage.setItem("panier", JSON.stringify(currentPanier))
    };

    window.location.href = "html/panier.html";
};
