const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeType = document.querySelector('[data-poke-type]');
const pokeStats = document.querySelector('[data-poke-stats]');
const buscarPokemon = document.querySelector('#buscarPokemon');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const findPokemon = (e) => {
    e.preventDefault();
    const { value } = e.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`).then(data => data.json()).then(response => obtenerPokeData(response)).catch(err => pokeNotFind(err));
}

const obtenerPokeData = (data) => {
    const img = data.sprites.front_default;
    const { types, stats} = data;

    pokeName.textContent = `Pokemon: ${data.name}`;
    pokeId.textContent = `N° ${data.id}`;
    pokeImg.setAttribute('src', img);
    setBackgroud(types);
    setType(types);
    setStats(stats);

};

const setBackgroud = (types) => {
    const colorPrimario = typeColors[types[0].type.name];
    pokeImg.style.background = colorPrimario;
};

const setType = (types) => {
    pokeType.innerHTML = '';
    types.forEach(type => {
        const typeBox = document.createElement('div');
        typeBox.classList.add('typeBox'); 
        if (type.type.name == 'water' ||
            type.type.name == 'grass' || 
            type.type.name == 'ghost' ||
            type.type.name == 'poison' ||
            type.type.name == 'dragon' ||
            type.type.name == 'steel' ||
            type.type.name == 'fighting' ||
            type.type.name == 'normal' ||
            type.type.name == 'default'){
                typeBox.style.color = '#fff'
            } else {
                typeBox.style.color = '#000'
            }
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

const pokeNotFind = (err) =>{
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './img/pngwing.com.png');
    pokeImg.style.background =  '#fff';
    pokeType.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    console.log(err);
}


buscarPokemon.addEventListener('submit', findPokemon)