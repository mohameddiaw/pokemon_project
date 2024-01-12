export async function getPokemonList() {
const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
const response = await fetch(url)
const data = await response.json()
return data
}
export async function getPokemonDetails(pokemonName: string) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
