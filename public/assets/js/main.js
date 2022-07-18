'use strict';
/*
PUNTO 5 BONUS
1. Borrar favoritos del localStorage y otras cosas mas. Mirar el enunciado

PUNTO 6 BONUS
1. Afinar la maquetacion
Tareas :
1. boton X para poder cancelar los favoritos y los datos del local storage
2. añadir o quitar series desde la derecha haciendo click sobre ellas y si buscamos series que son favoritas deberian estar resaltadas
3.[X] boton al final de favoritos para borrarlos todos
*/

const buttonSearch = document.querySelector('.js-button-search');
const inputSearch = document.querySelector('.js-input');
let listAnime = document.querySelector('.js-list-anime');
const listAnimeFavorite = document.querySelector('.js-list-anime-favorite');
const buttonReset = document.querySelector('.js-button-reset');
let animeSeriesList = [];
let animeFavouriteList; // Animefavoritelist no habria que igualarlo a array vacio
// Local storage
/* Al cargar la pagina vemos el local storage y si hay algo, animeFavoriteList seria igual a lo que haya despues del hacer el get del local  (localStorage.getItem('animeFavList');)*/
if(localStorage.getItem("animeFavouriteList")) {
    animeFavouriteList = JSON.parse(localStorage.getItem("animeFavouriteList"))
    renderFavoriteAnime(animeFavouriteList);
} else {
    animeFavouriteList = [];
}

// Images/Placeholder
const noImage = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
const newImage = "https://via.placeholder.com/210x295/ﬀﬀﬀ/666666/?text=TV";

function addListenerToAnimeListItem() {
    const singleElement = document.querySelectorAll('.js-single-element');
    for (const element of singleElement) {
        element.addEventListener("click" , handleClickFavourite);
    }
}

// Shows the anime list afer input user
function renderAnime(list) {
    let html = "";
    for (const eachTitlePhoto of list) {
    if(eachTitlePhoto.images.jpg.image_url === noImage || eachTitlePhoto.images.jpg.image_url === null) {
        html += `<li class="js-single-element" id="${eachTitlePhoto.mal_id}"><img src="${newImage}" alt="new-image" /><h3 class="title-anime">${eachTitlePhoto.title}</h3></li>`;
    } else {
        html += `<li class="js-single-element" id="${eachTitlePhoto.mal_id}"><img src="${eachTitlePhoto.images.jpg.image_url}" alt="serie-anime" />
        <h3 class="title-anime">${eachTitlePhoto.title}</h3></li>`;
    }
    }
    listAnime.innerHTML = html;
    addListenerToAnimeListItem();
}

// Show favourite anime list
function renderFavoriteAnime(list) {
    let html = "";
    if(list.length > 0) {
        for (const listFavorite of list) {
        html += `<li class="js-single-element" id="${listFavorite.mal_id}">
        <img src="${listFavorite.images.jpg.image_url}" alt="new-image" /><h3 class="title-anime list-favorite">${listFavorite.title}</h3><button class="js-remove-item-button">X</button>
        </li>`;
    }
    } 
    listAnimeFavorite.innerHTML = html;
}

// Show favorite after user click (left side) and list anime (right side)
function handleClickFavourite(ev) {
    let currentLiElement = ev.target.parentElement
    const idSelected = parseInt(currentLiElement.id);
    const animeFound = animeSeriesList.find((anime) => anime.mal_id === idSelected);
    const animeFavourite = animeFavouriteList.findIndex((fav) => fav.mal_id === idSelected);
    if (animeFavourite === -1) {
        currentLiElement.classList.add("favorite");
        animeFavouriteList.push(animeFound);
    } else {
        animeFavouriteList.splice(animeFavouriteList, 1)
        currentLiElement.classList.remove("favorite");
    }
    renderFavoriteAnime(animeFavouriteList);
    localStorage.setItem("animeFavouriteList", JSON.stringify(animeFavouriteList));
}

// Reset function to delete search and list anime
function handleClickReset(ev){
    ev.preventDefault();
    inputSearch.value = "";
    listAnime.innerHTML = "";
}

// Click reset anime fav list
const buttonRemoveItemFavList = document.querySelector('js-remove-item-button');
if(buttonRemoveItemFavList) {
    buttonRemoveItemFavList.addEventListener("click", handleRemoveFavoriteItem);
    function handleRemoveFavoriteItem(ev) {
        ev.preventDefault();
        console.log("soy la X");
    }
}

// Fetch to anime api after user button search click
function handleClickSearch(ev) {
    ev.preventDefault();
    const inputValue = inputSearch.value.toLowerCase();
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
        animeSeriesList = data.data;
        console.log(animeSeriesList);
        renderAnime(animeSeriesList);
    })
    // .catch((error) => renderError(error.message))
}

buttonSearch.addEventListener("click" , handleClickSearch);
buttonReset.addEventListener("click", handleClickReset);
//# sourceMappingURL=main.js.map
