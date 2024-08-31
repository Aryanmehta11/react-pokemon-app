import { useState, useEffect } from "react";
import PokemonData from "./components/PokemonData";

function App() {
  const [pokemon, setPokemon] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [debouncedPokemon, setDebouncedPokemon] = useState(pokemon);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPokemon(pokemon);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [pokemon]);

  useEffect(() => {
    if (debouncedPokemon.trim() === "") {
      setData(null);
      setError("Please enter a Pokémon name.");
      return;
    }

    async function fetchPokemon() {
      setLoading(true);
      setError(null);
      const url = `https://pokeapi.co/api/v2/pokemon/${debouncedPokemon.toLowerCase()}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        setError("Pokémon not found. Please try again.");
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [debouncedPokemon]);

  const getBackgroundColor = (types) => {
    if (!types || types.length === 0) return "bg-gray-100";
    const type = types[0].type.name;

    switch (type) {
      case "grass":
        return "bg-green-200";
      case "fire":
        return "bg-red-200";
      case "water":
        return "bg-blue-200";
      case "electric":
        return "bg-yellow-200";
      case "psychic":
        return "bg-pink-200";
      case "ice":
        return "bg-blue-100";
      case "dragon":
        return "bg-indigo-200";
      case "dark":
        return "bg-gray-800 text-white";
      case "fairy":
        return "bg-pink-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className={`min-h-screen p-4 ${getBackgroundColor(data?.types)} flex flex-col items-center justify-center`}>
      <input 
        type="text"
        placeholder="Enter the Pokémon"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
        className="p-2 rounded border-2 border-gray-300 mb-4"
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <PokemonData data={data} />
      )}
    </div>
  );
}

export default App;
