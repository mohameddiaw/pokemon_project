// Import the necessary modules
import { getPokemonList, getPokemonDetails } from './pokeapi';

// Define your Pokemon interface
interface Pokemon {
  id: number;
  name: string;
  description: string;
  type: string[];
  attack: number;
  defense: number;
}

// Define your application state
let state = {
  pokemonList: [] as Pokemon[],
  selectedPokemon: null as Pokemon | null,
};

// Fetch all Pokemon when the application starts
getPokemonList().then(pokemon => {
  state.pokemonList = pokemon;
  render();
});

// Render your application
function render() {
  // Render the list of all Pokemon
  const pokemonListElement = document.getElementById('pokemon-list');
  pokemonListElement.innerHTML = state.pokemonList.map(pokemon => `
    <li>
      <button onclick="selectPokemon(${pokemon.id})">${pokemon.name}</button>
    </li>
  `).join('');

  // Render the selected Pokemon's details
  const pokemonDetailsElement = document.getElementById('pokemon-details');
  if (state.selectedPokemon) {
    pokemonDetailsElement.innerHTML = `
      <h2>${state.selectedPokemon.name}</h2>
      <p>${state.selectedPokemon.description}</p>
      // Add more details here...
    `;
  } else {
    pokemonDetailsElement.innerHTML = '';
  }
}

// Select a Pokemon and fetch its details
window.selectPokemon = async function(id: number) {
  const pokemon = await getPokemonDetails(id);
  state.selectedPokemon = pokemon;
  render();
};

