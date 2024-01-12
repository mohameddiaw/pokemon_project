import {getPokemonList, getPokemonDetails } from "./pokeapi"

let allPokemon = []

async function displayPokemonList(pokemonList) {
    const pokemonDetails = await Promise.all(pokemonList.map(async pokemon => {
        return `<option value="${pokemon.name}">${pokemon.name}</option>`
    }))
    const pokemonListItems = pokemonList.map(pokemon => `<li id="${pokemon.name}">${pokemon.name}</li>`).join('')
    const app = document.querySelector<HTMLDivElement>('#app')!
    app.innerHTML = `
        <div>test</div>
        <form id="searchForm">
            <input id="search" type="text" placeholder="Search..."/>
        </form>
        <select id="pokemonDropdown">${pokemonDetails.join('')}</select>
        <ul id="pokemonList">${pokemonListItems}</ul>
    `
    pokemonList.forEach(pokemon => {
        document.getElementById(pokemon.name)!.addEventListener('click', async () => {
            const detail = await getPokemonDetails(pokemon.name)
            displayPokemonDetails(detail)
        })
    })
    document.getElementById('search')!.addEventListener('input', (event) => {
        const searchValue = (event.target as HTMLInputElement).value
        const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(searchValue))
        displayPokemonList(filteredPokemon)
    })
}

function displayPokemonDetails(detail) {
    const types = detail.types ? detail.types.map(typeInfo => typeInfo.type.name).join(', ') : 'N/A'
    const attackStat = detail.stats ? detail.stats.find(stat => stat.stat.name === 'attack') : undefined
    const attack = attackStat ? attackStat.base_stat : 'N/A'
    const defenseStat = detail.stats ? detail.stats.find(stat => stat.stat.name === 'defense') : undefined
    const defense = defenseStat ? defenseStat.base_stat : 'N/A'
    const flavorTextEntry = detail.flavor_text_entries ? detail.flavor_text_entries.find(entry => entry.language.name === 'fr') : undefined
    const description = flavorTextEntry ? flavorTextEntry.flavor_text : 'N/A'
    const app = document.querySelector<HTMLDivElement>('#app')!
    app.innerHTML += `
        <div>
            <h1>${detail.name}</h1>
            <p>Height: ${detail.height}</p>
            <p>Weight: ${detail.weight}</p>
            <p>Type: ${types}</p>
            <p>Attack: ${attack}</p>
            <p>Defense: ${defense}</p>
            <p>Description: ${description}</p>
        </div>
    `
}

async function loadPokemon() {
    const pokemonList =  await getPokemonList()
    allPokemon = pokemonList.results
    displayPokemonList(allPokemon)
}

loadPokemon()

