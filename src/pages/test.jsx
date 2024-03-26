import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const URL = "https://pokeapi.co/api/v2/pokemon";

function OnePokePage() {
  const [pokemon, setPokemon] = useState(null);
  const params = useParams();

  async function fetchOnePokemon() {
    try {
      const response = await axios.get(`${URL}/${params.pokeId}`);
      console.log(response);
      setPokemon(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOnePokemon();
  }, [params.pokeId]);

  if (!pokemon) {
    return <p>No poke</p>;
  }
  return (
    <div>
      <pre>{JSON.stringify(params, null, 2)}</pre>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprites.front_shiny} alt="" />
      <img src={pokemon.sprites.back_shiny} alt="" />
      <audio src={pokemon.cries.latest} controls></audio>
    </div>
  );
}

export default OnePokePage;
