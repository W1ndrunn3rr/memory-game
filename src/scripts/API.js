async function makeRequest(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return await response.json();
}

export default async function getPokemon(name) {
    const json = await makeRequest(name);
    return json.sprites.front_default

}