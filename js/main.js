const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeType = document.querySelector('[data-poke-type]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');
const buscarPokemon = document.querySelector('#buscarPokemon');

let pokeColor;

const typeColors = {
    electric: '#f7ff85',
    normal: '#eaeade',
    fire: '#f8b80e',
    water: '#36aff6',
    ice: '#66d1e5',
    rock: '#b4a270',
    flying: '#dce5ea',
    grass: '#67f70a',
    psychic: '#fcb6d0',
    dark: '#ccc',
    ghost: '#bd98cb',
    bug: '#d9fe9e',
    poison: '#ca72ec',
    ground: '#ede293',
    dragon: '#d6b1fe',
    steel: '#edefee',
    fighting: '#ffaeaa',
    fairy: '#fdd1e0',
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
        typeBox.style.color = '#000';
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