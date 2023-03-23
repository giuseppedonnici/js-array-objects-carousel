/*
Consegna:
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.
Milestone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del 
markup statico: costruiamo il container e inseriamo l'immagine grande in modo da 
poter stilare lo slider.
Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per 
popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva 
diventerà visibile e dovremo aggiungervi titolo e testo.
Milestone 2:
Aggiungere il **ciclo infinito** del carosello. Ovvero se la miniatura attiva è 
la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi 
sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia 
verso sinistra.
BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine 
corrispondente.
BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) 
l’immagine attiva dovrà cambiare alla successiva.
BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/

const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

const itemsContainer = document.querySelector(".slider-items");


for (let i = 0; i < images.length; i++) {
    const currentImage = images[i];

    const sliderItem = `
        <div class="item">
        <div class="img-container">
            <img src="${currentImage.image}" alt="">
            <div class="description">
                <h1>${currentImage.title}</h1>
                <p>${currentImage.text}</p>
            </div>
        </div>
        <div class="thumb-container">
                        <div class="thumb">
                            <img src="img/01.webp" alt="">
                        </div>
                        <div class="thumb">
                            <img src="img/02.webp" alt="">
                        </div>
                        <div class="thumb">
                            <img src="img/03.webp" alt="">
                        </div>
                        <div class="thumb">
                            <img src="img/04.webp" alt="">
                        </div>
                        <div class="thumb">
                            <img src="img/05.webp" alt="">
                        </div>
                    </div>

        </div>`;
    itemsContainer.innerHTML += sliderItem;

}

// Ora ho tutti gli items inseriti nella pagina tramite JS ma in display none
// Metto tutti gli items all'interno di un array e al primo assegno la classe active

const itemsArray = document.getElementsByClassName("item");
const thumbsArray = document.getElementsByClassName("thumb");

let activeItemIndex = 0;
itemsArray[activeItemIndex].classList.add("active");
let activeThumbIndex = 0;
thumbsArray[activeThumbIndex].classList.add("active");
const delay = 3000;
activeDelay(delay);


const imgContainer = document.querySelector(".img-container");
imgContainer.addEventListener("mouseenter", function () {
    clearInterval(autoplay);
});
imgContainer.addEventListener("mouseleave", function () {
    activeDelay(delay);
});

// Prelevo i due bottoni
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// Cosa succede quando clicco sul bottone next?
nextBtn.addEventListener("click", function () {
    clearInterval(autoplay);
    activeDelay(delay);

    if (activeItemIndex === itemsArray.length - 1) {
        removeClass();
        activeItemIndex = 0;
        activeThumbIndex = 0;
        addClass();
        clearInterval(autoplay);
        activeDelay(delay);
    } else if (activeItemIndex < (itemsArray.length - 1)) {
        // Se l'indice dell'item attuale è minore della lunghezza dell'array 
        removeClass();
        activeItemIndex++;
        activeThumbIndex = activeThumbIndex + 6;
        addClass();
        clearInterval(autoplay);
        activeDelay(delay);
    }
});

// Cosa succede quando clicco sul bottone prev?
prevBtn.addEventListener("click", function () {
    clearInterval(autoplay);
    activeDelay(delay);

    // Se ti trovi alla prima immagine
    if (activeItemIndex === 0) {
        removeClass();
        activeItemIndex = itemsArray.length - 1;
        activeThumbIndex = thumbsArray.length - 1;
        addClass();
        clearInterval(autoplay);
        activeDelay(delay);
    } else {
        removeClass();
        activeItemIndex--;
        activeThumbIndex = activeThumbIndex - 6;
        addClass();
        clearInterval(autoplay);
        activeDelay(delay);
    }
})


// FUNCTIONS
/**
 * Descrizione: questa funzione scandisce l'intervallo di tempo dell'item attivo
 * @param {number} delay numero in millisecondi
 */
function activeDelay(delay) {
    autoplay = setInterval(function () {
        if (activeItemIndex === itemsArray.length - 1) {
            removeClass();
            activeItemIndex = 0;
            activeThumbIndex = 0;
            addClass();
        } else {
            removeClass();
            activeItemIndex++;
            activeThumbIndex = activeThumbIndex + 6;
            addClass();
        }
    }, delay);
}

/**
 * Descrizione: rimuove la classe "active" sia dall'item che dal thumb attivi
 */
function removeClass() {
    itemsArray[activeItemIndex].classList.remove("active");
    thumbsArray[activeThumbIndex].classList.remove("active");
}

/**
 * Descrizione: aggiunge la classe "active" sia all'item che al thumb attivi
 */
function addClass() {
    itemsArray[activeItemIndex].classList.add("active");
    thumbsArray[activeThumbIndex].classList.add("active");
}