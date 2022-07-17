'use strict';

/* PUNTO 1 --> Hecho
1. [X]Realizar estructura basica html (h1, input te tipo texto, boton "buscar" y un boton "reset", listado de resultados donde tenemos el cartel de la serie osea foto y el titulo)

PUNTO 2
1. [X]Escuchar un evento sobre el boton de busqueda para conectarse al API para ver que datos necesitamos
2.[X] Para la URL hay que recoger el texto del input de la usuaria y concatenarlo en link
3. Para cada serie del resultado del input hay que pintar el cartel y el titulo de la serie
4. Algunas series no tiene foto, hay que detectar cuales son y asignarle una foto (https://via.placeholder.com/210x295/ﬀﬀﬀ/666666/?text=TV)
5.Para pintar en el html utilizamos el InnerHTML

PUNTO 3
1. Una vez que se vean los resultados de la busqueda, la usuario puede elegir los favoritos y hay que hacer click en una serie y tendra que pasar lo siguiente:
--> color de fondo y de fuente se intercambian
--> listado de favoritos en la izquierda (recomendable array para almacenar favoritos)
--> eries favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda

PUNTO 4
1.Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse

PUNTO 5 BONUS
1. Borrar favoritos del localStorage y otras cosas mas. Mirar el enunciado

PUNTO 6
1. Afinar la maquetacion
*/

const buttonSearch = document.querySelector('.js-button-search');
const inputSearch = document.querySelector('.js-input');
let listAnime = document.querySelector('.js-list-anime');

// Images/Placeholder
const noImage = "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";
const newImage = "https://via.placeholder.com/210x295/ﬀﬀﬀ/666666/?text=TV";

function renderAnime(animeSeriesList) {
    let html = "";
    for (const eachTitlePhoto of animeSeriesList) {
    if(eachTitlePhoto.images.jpg.image_url === noImage || eachTitlePhoto.images.jpg.image_url === null) {
        html += `<img src="${newImage}" alt="new-image" /><h3 class="title-anime">${eachTitlePhoto.title}</h3>`;
    } else {
        html += `<img src="${eachTitlePhoto.images.jpg.image_url}" alt="serie-anime" />
        <h3 class="title-anime">${eachTitlePhoto.title}</h3>`;
    }
    }
    listAnime.innerHTML = html;
}

function handleClickSearch(ev) {
    ev.preventDefault();
    const inputValue = inputSearch.value.toLowerCase();
    fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => renderAnime(data.data))
    // .catch((error) => renderError(error.message))
}

buttonSearch.addEventListener("click" , handleClickSearch);

