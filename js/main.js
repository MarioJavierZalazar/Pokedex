const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeType = document.querySelector('[data-poke-type]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');
const buscarPokemon = document.querySelector('#buscarPokemon');
const abilitiesCard = document.querySelector('.abilitiesCard');

let pokeColor;

const typeColors = {
    electric: '#fffa24',
    normal: '#ccc9aa',
    fire: '#f67f0b',
    water: '#0a7abc',
    ice: '#1995a1',
    rock: '#776a3e',
    flying: '#5eb9b2',
    grass: '#3e9709',
    psychic: '#ec0e63',
    dark: '#5f4632',
    ghost: '#8e55a4',
    bug: '#bddd6e',
    poison: '#a819d7',
    ground: '#e1d158',
    dragon: '#8a55fd',
    steel: '#7b8e8a',
    fighting: '#e81319',
    fairy: '#ffa0c2',
    default: '#2A1A1F',
};


const findPokemon = (e) => {
    e.preventDefault();
    const { value } = e.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`).then(data => data.json()).then(response => obtenerPokeData(response)).catch(err => pokeNotFind(err));
}

const obtenerPokeData = (data) => {
    const img = data.sprites.front_default;
    const { types, stats, abilities} = data;

    pokeName.textContent = `Pokemon: ${data.name}`;
    pokeId.textContent = `N° ${data.id}`;
    pokeImg.setAttribute('src', img);
    setBackgroud(types);
    setType(types);
    setStats(stats);
    setAbilities(abilities);
    setHeightWeight(data.height, data.weight);

};

const setBackgroud = (types) => {
    const colorPrimario = typeColors[types[0].type.name];
    pokeImg.style.background = colorPrimario;
    pokeColor = colorPrimario;
};

const setType = (types) => {
    pokeType.innerHTML = '';
    types.forEach(type => {
        const typeBox = document.createElement('div');
        typeBox.classList.add('typeBox'); 
        typeBox.style.color = '#fff';
        typeBox.style.backgroundColor = typeColors[type.type.name];
        typeBox.textContent = type.type.name;
        pokeType.appendChild(typeBox);
    });
};

const setStats = (stats) => {
    pokeStats.innerHTML = ''
    stats.forEach(stat => {
        const statsbox = document.createElement('div');
        const statsName = document.createElement('div');
        const statsValue = document.createElement('div');
        statsbox.classList.add('statsBox')
        statsName.classList.add('statsName')
        statsValue.classList.add('statsValue')
        statsName.textContent = stat.stat.name;
        statsValue.textContent = stat.base_stat;
        statsbox.appendChild(statsName);
        statsbox.appendChild(statsValue);
        pokeStats.appendChild(statsbox);
    })
};

const setAbilities = (abilities) => {
    abilitiesCard.style.display = 'block';
    pokeAbilities.innerHTML = ''
    abilities.forEach(abilitie => {
        getAbilitieEffect(abilitie.ability.url);
    })
};

const getAbilitieEffect = (effectUrl) => {
    fetch(effectUrl).then(efectData => efectData.json()).then(response => obtenerEfecto(response));
}

const obtenerEfecto = (efects) => {
    efects.effect_entries.forEach(efecto => {
        if (efecto.language.name == 'en'){
            const abilitiesBox = document.createElement('div');
            abilitiesBox.classList.add('abilitieCard');
            const abilitieValue = document.createElement('p');
            const abilitieName = document.createElement('h3');
            abilitieName.classList.add('abilitieTitle');
            abilitieName.style.background = pokeColor;
            abilitieName.innerHTML = efects.name;
            abilitieValue.innerHTML = efecto.effect;
            pokeAbilities.appendChild(abilitiesBox);
            abilitiesBox.appendChild(abilitieName);
            abilitiesBox.appendChild(abilitieValue);
        }
    })
};

const convertidor = (value) => {
    return value / 10;
}; 

const setHeightWeight = (height, weight) => {
    const boxH = document.createElement('div');
    const boxNameH = document.createElement('div');
    const boxValueH = document.createElement('div');
    const boxW = document.createElement('div');
    const boxNameW = document.createElement('div');
    const boxValueW = document.createElement('div');
    boxH.classList.add('statsBox');
    boxNameH.classList.add('statsName');
    boxValueH.classList.add('statsValue');
    boxW.classList.add('statsBox');
    boxNameW.classList.add('statsName');
    boxValueW.classList.add('statsValue');
    boxNameH.textContent = 'height';
    boxValueH.textContent = `${convertidor(height)} mts`;
    boxNameW.textContent = 'weight';
    boxValueW.textContent = `${convertidor(weight)} kg`;
    boxH.appendChild(boxNameH);
    boxH .appendChild(boxValueH);
    pokeStats.appendChild(boxH);
    boxW.appendChild(boxNameW);
    boxW .appendChild(boxValueW);
    pokeStats.appendChild(boxW);
};


const pokeNotFind = (err) =>{
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './img/pngwing.com.png');
    pokeImg.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    pokeImg.style.display = 'block';
    pokeType.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    console.log(err);
}


buscarPokemon.addEventListener('submit', findPokemon)