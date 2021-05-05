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
