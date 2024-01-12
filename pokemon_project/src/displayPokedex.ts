async function displayPokedex() {
    const pokedex = await getPokedex()
    const pokedexDetails = await Promise.all(pokedex.results.map(async pokemon => {
        return `<li id="${pokemon.entry_number}">${pokemon.pokemon_species.name}</li>`
    }))
    const app = document.querySelector<HTMLDivElement>('#app')!
    app.innerHTML += `
        <h2>Pokédex</h2>
        <ul>${pokedexDetails.join('')}</ul>
    `
    pokedex.results.forEach(pokemon => {
        document.getElementById(pokemon.entry_number.toString())!.addEventListener('click', async () => {
            const detail = await getPokemonDetails(pokemon.pokemon_species.name)
            displayPokemonDetails(detail)
        })
    })
}

async function loadPokedex() {
    displayPokedex()
}

loadPokedex()

