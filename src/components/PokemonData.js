import React from 'react';

const PokemonData = ({ data }) => {
  // Format height and weight correctly
  const height = (data.height / 10).toFixed(1); // e.g., 0.6
  const weight = (data.weight / 10).toFixed(1); // e.g., 8.5

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h1 className="text-2xl font-bold mb-4 capitalize">{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} className="w-32 h-32 mx-auto mb-4" />
      
      <p><span className="font-semibold">Height:</span> {height} m</p>
      <p><span className="font-semibold">Weight:</span> {weight} kg</p>
      <p><span className="font-semibold">Type:</span> {data.types.map(type => type.type.name).join(', ')}</p>
      <p><span className="font-semibold">Abilities:</span> {data.abilities.map(ability => ability.ability.name).join(', ')}</p>

      {/* Displaying Base Stats */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Base Stats</h2>
        <ul>
          {data.stats.map(stat => (
            <li key={stat.stat.name}>
              <span className="font-semibold capitalize">{stat.stat.name}:</span> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonData;
