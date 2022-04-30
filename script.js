// endpoint per la ricerca degli sports
const sports_endpoint = 'https://sports.api.decathlon.com/sports/search/';
//longitudini,latitudini per la ricerca dello sport
berlinlong = -73.5833;
berlinlat = 45.5;
parislong = 2.3333;
parislat = 48.8667;
Vancouverlong = -123.110213;
Vancouverlat = 49.263262;

//key per la ricerca delle stazioni
const key_bike = 'a191d709c59804bb610c3c8c8d8e097b5f890b3e';
const bike_endpoint = 'https://api.jcdecaux.com/vls/v3/stations?contract=';

//Key and secret OAuth2.0  di spotify
const Spotify_clientId = "9ddcd935f5474aff812a760237ad8980";
const Spotify_ClientSecret = "85837259b88b4b76a158dd2a7f42c1c6";
const Spotify_token = "https://accounts.spotify.com/api/token";
Spotify_request_endpoint_album = 'https://api.spotify.com/v1/playlists/37i9dQZF1DX73EtbU4jEcn';



function onJson_sports(json) {
  // Stampo il JSON per capire quali attributi prendere
  console.log(json);
  console.log('JSON Img ricevuto');
  const bookcase = document.querySelector('#album');
  bookcase.innerHTML = '';
  const results = json;
  // Leggi il numero di risultati e memorizzo dentro una variabile
  let num_results = results.length;

  if (num_results == 0 || !num_results) {
    console.log('nessun risultato');
    const error = document.createElement("h1");
    const messaggio = document.createTextNode("Nessun risultato!");
    error.appendChild(messaggio);
    bookcase.appendChild(error);
    error.classList.add('flex-item2');
  }
  //nel caso in cui la ricerca abbia trovato elementi o non sia stato digitato sbagliato 
  else {
    let j = 0;
    //nel caso in cui gli elementi trovati siano inferiori a 6
    if (num_results < 6) {
      console.log('diminuisci valore');
      j = num_results;
    }
    else {
      //nel caso gli elementi siano superiori a 6
      console.log('entra qui');
      j = 6;
    }
    //visualizzo risultati fino ad un massimo di 6 che vengono ristituiti dal json
    for (let i = 0; i < j; i++) {
      console.log('visualizza risultati');
      if (results[i].relationships.images.data[0]) {
        const immagine = results[i].relationships.images.data[0].url;
        console.log(immagine);
        const shelf = document.createElement('div');
        shelf.classList.add('flex-item5');
        const img = document.createElement('img');
        img.src = immagine;
        img.addEventListener('click', apriModale);
        const description = document.createElement('p');
        description.textContent = results[i].attributes.description;
        shelf.appendChild(img);
        shelf.appendChild(description);
        bookcase.appendChild(shelf);
      }
    }
  }
}

//funzione che serve a visualizzare le informzioni riguardante la stazione ricercata
function onJson_bike(json) {
  // Stampo il JSON per capire quali attributi prendere
  console.log(json);
  const bookcase = document.querySelector('#album');
  bookcase.innerHTML = '';
  const results = json;
  // Leggi il numero di risultati e memorizzo dentro una variabile
  let num_results = results.length;
  if (num_results == 0 || !num_results) {
    console.log('nessun risultato');
    const error = document.createElement("h1");
    const messaggio = document.createTextNode("Nessun risultato!");
    error.appendChild(messaggio);
    bookcase.appendChild(error);
    error.classList.add('flex-item6');
  }
  //nel caso in cui la ricerca abbia trovato elementi o non sia stato digitato sbagliato 
  else {
    let j = 0;
    //nel caso in cui gli elementi trovati siano inferiori a 6
    if (num_results < 6) {
      console.log('diminuisci valore');
      j = num_results;
    }
    else {
      //nel caso gli elementi siano superiori a 6
      console.log('entra qui');
      j = 6;
    }
    //visualizzo risultati fino ad un massimo di 6 che vengono ristituiti dal json
    for (let i = 0; i < j; i++) {
      const shelf = document.createElement('div');
      shelf.classList.add('flex-item4');
      const name = document.createElement('h1');
      name.textContent = 'Name : ' + results[i].name;
      shelf.appendChild(name);
      const description = document.createElement('h2');
      description.textContent = 'Address : ' + results[i].address;
      shelf.appendChild(description);
      const Status = document.createElement('h2');
      Status.textContent = 'Status : ' + results[i].status;
      shelf.appendChild(Status);
      bookcase.appendChild(shelf);
      availabilities = results[i].mainStands.availabilities;

      for (ps in availabilities) {
        const p = document.createElement('p');
        p.textContent = p.textContent + ps + ' : ' + availabilities[ps];
        shelf.appendChild(p);
      }
    }
  }
}

function onJson_Spotify(json) {
  console.log('JSON ricevuto');
  // Stampo il JSON per capire quali attributi prendere
  console.log(json);
  const bookcase = document.querySelector('#album')
  bookcase.innerHTML = '';
  let limit = json.tracks.limit;
  //Viene generato un numero casuale a partire del quale vengono visualizzati le successive canzoni
  let random_number = Math.floor(Math.random() * (limit));
  console.log(random_number)
  //nel caso il numero generato sia maggiore di 94 viene impostato a 94 così da permettere la visualizzazione delle succissive 6 canzoni
  if (random_number > 94) {
    random_number = 94;
    console.log('dopo aver diminuito il numero avrò : ' + random_number);
  }

  for (let i = 0; i < 6; i++) {
    const music = json.tracks.items[random_number++];
    console.log(music);
    const immagine = music.track.album.images[1].url;
    const shelf = document.createElement('div');
    shelf.classList.add('flex-item3');
    const img = document.createElement('img');
    img.src = immagine;
    const artists_name = document.createElement('h1');
    artists_name.textContent = 'Artist : ' + music.track.artists[0].name;
    const name_music = document.createElement('h2');
    name_music.textContent = 'Song : ' + music.track.album.name;
    shelf.appendChild(img);
    shelf.appendChild(artists_name);
    shelf.appendChild(name_music);
    bookcase.appendChild(shelf);
    img.addEventListener('click', apriModale);
  }

}

function onResponse(response) {
  console.log('Risposta ricevuta');
  return response.json();
}
function OnError(error) {
  console.log('Errore: ' + error);
}


function onTokenResponse(response) {
  console.log('Recepita risposta');
  return response.json();
}

let token;

// All'apertura della pagina, richiedo il token
fetch(Spotify_token,
  {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(Spotify_clientId + ':' + Spotify_ClientSecret)
    }
  }).then(onTokenResponse).then(onJson_Token);

function onJson_Token(json) {
  token = json.access_token;
  console.log(json);
  console.log(token);
}

//fetch per la ricerca dell'album su spotify
function Music() {
  console.log(Spotify_request_endpoint_album)
  fetch(Spotify_request_endpoint_album,
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }
  ).then(onResponse, OnError).then(onJson_Spotify);
}

//fetch per la ricerca sport
function search(event) {
  event.preventDefault();
  const contents = document.querySelector('#content').value;
  if (contents) {
    const text = encodeURIComponent(contents);
    console.log(text);
    const tipo = document.querySelector('#tipo').value;
    console.log(tipo);
    const location = document.querySelector('#location').value;

    //inserendo la tipologia dello sport da ricercare mostrerà foto e descrizione
    if (tipo === "sports") {

      //in base alla città seleziona mostrerà la tipologia di sports ricercati
      if (location === "Paris") {
        console.log(location)
        sports_request = sports_endpoint + text + '?source=' + 'popular' + '&coordinates=' + parislong + ',' + parislat;
        fetch(sports_request).then(onResponse, OnError).then(onJson_sports);
      }

      if (location === 'Vancouver') {
        console.log(location);
        sports_request = sports_endpoint + text + '?source=' + 'popular' + '&coordinates=' + Vancouverlong + ',' + Vancouverlat;
        fetch(sports_request).then(onResponse, OnError).then(onJson_sports);
      }

      if (location === 'Berlin') {
        console.log(location);
        sports_request = sports_endpoint + text + '?source=' + 'popular' + '&coordinates=' + berlinlong + ',' + berlinlat;
        fetch(sports_request).then(onResponse, OnError).then(onJson_sports);
      }
    }
    if (tipo === 'bike') {
      //inserendo il nome della stazione ricercata fornirà alcune dati in tempo reale quali nome,indirizzo,status e i veicoli disponibili.
      const request_bike = bike_endpoint + text + '&apiKey=' + key_bike;
      fetch(request_bike).then(onResponse, OnError).then(onJson_bike);
    }
  }
}

//al click di uno dei contenuti trovati
function apriModale(event) {
  const modale = document.querySelector('#modale');
  const image = document.createElement('img');
  image.src = event.currentTarget.src;
  modale.appendChild(image);
  //blocco lo scroll della pagina
  document.body.classList.add('no-scroll');
  //rendo la modale visibile
  modale.classList.remove('hidden');
  modale.addEventListener('click', chiudiModale);
}
//al click chiude l'mmagine selezionata
function chiudiModale(event) {
  const modale = document.querySelector('#modale');
  //aggiungo la classe hidden 
  modale.classList.add('hidden');
  //riabilito lo scroll
  document.body.classList.remove('no-scroll')
  //rimuovo le foto selezionate
  modale.innerHTML = ' ';
}

// Aggiungo event listener al form per la ricerca
const form = document.querySelector('#search');
form.addEventListener('submit', search);

// Aggiungo event listener al button per la generazione casuale delle canzioni presenti all'interno dell'album
const button_music = document.querySelector('button')
button_music.addEventListener('click', Music);

