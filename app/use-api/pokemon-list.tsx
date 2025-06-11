import { use } from "react";

const PokemonList = ({
  pokemonPromise,
}: {
  pokemonPromise: Promise<unknown>;
}) => {
  const data = use(pokemonPromise);

  return <pre>{JSON.stringify(data, null, 4)}</pre>;
};

export default PokemonList;
