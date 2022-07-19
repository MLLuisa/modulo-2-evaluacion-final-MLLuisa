'use strict';

const buttonSearch = document.querySelector('.js-button-search');
const inputSearch = document.querySelector('.js-input');
let listAnime = document.querySelector('.js-list-anime');
const listAnimeFavorite = document.querySelector('.js-list-anime-favorite');
const buttonReset = document.querySelector('.js-button-reset');
let animeSeriesList = [];
let animeFavouriteList; 

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
        html += `<li class="js-single-element" data-id="${eachTitlePhoto.mal_id}"><img src="${newImage}" alt="new-image" /><h3 class="title-anime">${eachTitlePhoto.title}</h3></li>`;
    } else {
        html += `<li class="js-single-element" data-id="${eachTitlePhoto.mal_id}"><img src="${eachTitlePhoto.images.jpg.image_url}" alt="serie-anime" />
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
        html += `<li class="js-single-element" data-id="${listFavorite.mal_id}">
        <img src="${listFavorite.images.jpg.image_url}" alt="new-image" /><h3 class="title-anime list-favorite">${listFavorite.title}</h3><button class="js-remove-item-button">X</button>
        </li>`;
    }
    } 
    listAnimeFavorite.innerHTML = html;
}

// Show favorite after user click (left side) and list anime (right side)
function handleClickFavourite(ev) {
    if(ev.target.nodeName === "LI") {
        return
    }
    let currentLiElement = ev.target.parentElement
    const idSelected = parseInt(currentLiElement.dataset.id);
    const animeFound = animeSeriesList.find((anime) => anime.mal_id === idSelected);
    const animeFavourite = animeFavouriteList.findIndex((fav) => fav.mal_id === idSelected);
    if (animeFavourite === -1) {
        currentLiElement.classList.add("favorite");
        animeFavouriteList.push(animeFound);
    } else {
        animeFavouriteList.splice(animeFavourite, 1)
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
function handleClickResetAnime(event) {
    if(event.target.nodeName === "BUTTON") {
        let currentLiElement = event.target.parentElement
        const idSelected = parseInt(currentLiElement.dataset.id);
        const animeFavourite = animeFavouriteList.findIndex((fav) => fav.mal_id === idSelected);
        animeFavouriteList.splice(animeFavourite, 1) // remove favorite from favorite list
        renderFavoriteAnime(animeFavouriteList); // re paint favorite list
        document.querySelector(`[data-id='${idSelected}']`).classList.remove("favorite"); // remove class to anime favorite results list
        localStorage.setItem("animeFavouriteList", JSON.stringify(animeFavouriteList)); // safe favorite list in local storage
    }
}
listAnimeFavorite.addEventListener("click", handleClickResetAnime)


// Fetch to anime api after user button search click
function handleClickSearch(ev) {
    ev.preventDefault();
    const inputValue = inputSearch.value.toLowerCase();
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
        animeSeriesList = data.data;
        renderAnime(animeSeriesList);
    })
}

buttonSearch.addEventListener("click" , handleClickSearch);
buttonReset.addEventListener("click", handleClickReset);