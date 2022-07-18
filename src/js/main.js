'use strict';

/* PUNTO 1 --> Hecho
1. [X]Realizar estructura basica html (h1, input te tipo texto, boton "buscar" y un boton "reset", listado de resultados donde tenemos el cartel de la serie osea foto y el titulo)

PUNTO 2
1. [X]Escuchar un evento sobre el boton de busqueda para conectarse al API para ver que datos necesitamos
2.[X] Para la URL hay que recoger el texto del input de la usuaria y concatenarlo en link
3.[X] Para cada serie del resultado del input hay que pintar el cartel y el titulo de la serie
4.[X] Algunas series no tiene foto, hay que detectar cuales son y asignarle una foto (https://via.placeholder.com/210x295/ﬀﬀﬀ/666666/?text=TV)
5.[X] Para pintar en el html utilizamos el InnerHTML

PUNTO 3
1. Una vez que se vean los resultados de la busqueda, la usuario puede elegir los favoritos y hay que hacer click en una serie y tendra que pasar lo siguiente:
-->[X] color de fondo y de fuente se intercambian
-->[X] listado de favoritos en la izquierda (recomendable array para almacenar favoritos)
-->[X] series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda

PUNTO 4
1.[X] Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse

PUNTO 5 BONUS
1. Borrar favoritos del localStorage y otras cosas mas. Mirar el enunciado

PUNTO 6
1.[X] Afinar la maquetacion
*/

const buttonSearch = document.querySelector('.js-button-search');
const inputSearch = document.querySelector('.js-input');
let listAnime = document.querySelector('.js-list-anime');
const listAnimeFavorite = document.querySelector('.js-list-anime-favorite');
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

function renderFavoriteAnime(list) {
    let html = "";
    if(list.length > 0) {
        for (const listFavorite of list) {
        html += `<li class="js-single-element " id="${listFavorite.mal_id}">
        <i class="fa-solid fa-circle-xmark"></i><img src="${listFavorite.images.jpg.image_url}" alt="new-image" /><h3 class="title-anime list-favorite">${listFavorite.title}</h3></li>`;
    }
    }
    
    listAnimeFavorite.innerHTML = html;
}

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


