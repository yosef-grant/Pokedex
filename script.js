// DOM Elements
const pokeDiv = document.getElementById('pokemon-container'),
  userInput = document.getElementById('search-bar'),
  searchBtn = document.getElementById('submit-btn'),
  randomBtn = document.getElementById('ran'),
  nextBtn = document.getElementById('next'),
  prevBtn = document.getElementById('prev');


let searchQuery, dataId;

/* *** EVENT LISTENERS *** */

userInput.addEventListener('focus', e => {
  const target = e.target;
  console.log('focussed');
  target.style.border="1px solid dodgerblue";
  target.style.marginTop="200px"
})

userInput.addEventListener('blur', () => {
  userInput.style.border="none";
  userInput.style.marginTop="0";
})


// Previous button

prevBtn.addEventListener('click', () => {
  if (dataId <= 2) {
    prevReset();
  }
  if (dataId <= 1) {
    nextReset();
    dataId = 0;
    pokeDiv.innerHTML = `
          <img src="./assets/pokeball_bg_animated.jpg" id="bg"/>
          <h2 class="message">Welcome!</h2>`;
  } else getData((dataId -= 1));
  console.log(dataId);
});

// Next button

nextBtn.addEventListener('click', () => {
  if (dataId >= 721) {
    dataId = 722;
    prevReset();
    pokeDiv.innerHTML = `
        <img src="./assets/pokeball_bg_animated.jpg" id="bg"/>
        <h2 class="message">End of Pokedex.</h2>`;
  } else if (dataId === undefined) {
    getData((dataId = 1));
  } else {
    getData((dataId += 1));
  }
  console.log(dataId);
});

// Random button

randomBtn.addEventListener('click', () => {
  let randomId = Math.floor(Math.random() * (721 + 1) + 1);
  getData(randomId);
});

// Search button

searchBtn.addEventListener('click', () => {
  getData(userInput.value.toLowerCase());
});





// Search bar 'enter'

userInput.addEventListener('keyup', (e) => {

  if (e.key !== 'Enter') {
    searchQuery = userInput.value.toLowerCase();
    console.log(searchQuery);
    
  } else if (searchQuery <= 1) {
    prevReset();
    getData(searchQuery);
  } else getData(searchQuery);
}
)
;


// API search + Primary Functionality

async function getData(query) {
  let URL = `https://pokeapi.co/api/v2/pokemon/${query}`;

  try {
    console.log(URL);
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);

    dataId = data.id;

    getNextData(dataId + 1);

    if (dataId >= 2) {
      getPrevData(dataId - 1);
    }

    const HTML = `
    <div class="name">${data.name}</div>
    <img class="image" src=${data.sprites.other['official-artwork'].front_default} /> 
    <div id="details">
    <p class="height">Height: ${data.height}</p>
    <p class="weight">Weight: ${data.weight}</p>
    </div>
    </div>   
    `;

    pokeDiv.innerHTML = HTML;
    userInput.value = '';
  } catch {
    pokeDiv.innerHTML = `
        <h3 class="error-message">No matches found.<br><br> Please try another search!</h3>
        `;
  }
}

async function getNextData(nextID) {
  let URL = `https://pokeapi.co/api/v2/pokemon/${nextID}`;
  const res = await fetch(URL);
  const data = await res.json();
  if (dataId == 0 || dataId >= 721) {
    nextBtn.innerHTML = `<img src="./assets/next.png"/>`;
  } else {
    nextBtn.innerHTML = ` 
    <img class="next-prev next-img" src=${data.sprites.other['official-artwork'].front_default} />
    `;
  }
}

async function getPrevData(nextID) {
  let URL = `https://pokeapi.co/api/v2/pokemon/${nextID}`;
  const res = await fetch(URL);
  const data = await res.json();

  if (dataId >= 2) {
    prevBtn.innerHTML = ` 
    <img class="next-prev next-img" src=${data.sprites.other['official-artwork'].front_default} />
    `;
  }
}

const nextReset = () => {
  nextBtn.innerHTML = `<img src="./assets/next.png"/>`;
};
const prevReset = () => {
  prevBtn.innerHTML = `<img src="./assets/prev.png"/>`;
};
