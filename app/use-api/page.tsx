import { Suspense } from "react";
import PokemonList from "./pokemon-list";

const PokemonPage = () => {
  const pokemonPromise = fetch("https://pokeapi.co/api/v2/pokemon").then(
    (data) => data.json()
  );
  return (
    <Suspense fallback="loading...">
      <PokemonList pokemonPromise={pokemonPromise} />
    </Suspense>
  );
};

export default PokemonPage;
