import { toPascalCase } from "@/Utils/utils";
import axios from "axios";

interface PokemonDetails {
  error: any;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    }
  }[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      },
      version_group: {
        name: string;
        url: string;
      }
    }
  }[];
  name: string;
  order: number;
  past_types: string;
  species: Record<string, any>;
  sprites: Record<string, any>;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    }
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    }
  }[];
  weight: number;
}

const getPokemon = async (pokemonID: string): Promise<PokemonDetails> => {
  try {
    const { data: pokemon } = await axios.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
    return { ...pokemon, error: null };
  } catch (error: any) {
    return {
      error: error.message
    } as PokemonDetails;
  }
}

export default async function PokemonDetails(props: { params: { pokemonID: string } }) {
  const pokemonID = (await props.params).pokemonID;
  const pokemon: PokemonDetails = await getPokemon(pokemonID);
  console.log(pokemon.stats);
  if (pokemon.error) {
    return (
      <div className="p-10">
        <div className="flex justify-center">
          <h1 className="text-3xl text-red-500">Error: {pokemon.error}</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="p-10">
      <div className="flex justify-center">

        <div className="flex flex-col justify-center items-center rounded-xl w-fit " style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
          <div className="grid grid-cols-2 h-fit " >
            <img draggable={false} src={pokemon.sprites.front_default} alt="" />
            <img draggable={false} src={pokemon.sprites.back_default} alt="" />
            <img draggable={false} src={pokemon.sprites.front_shiny} alt="" />
            <img draggable={false} src={pokemon.sprites.back_shiny} alt="" />
          </div>

          <div>
            <h1 className="flex flex-col gap-4 p-2 rounded-md text-4xl text-orange-600">
              {toPascalCase(pokemon.name)}
            </h1>
          </div>

        </div>

      </div>

      <div className="grid grid-cols-3 gap-4 mt-5">

        <div className="flex flex-col gap-4 p-2 rounded-xl" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
          <div>
            <h2 className="flex justify-center text-lg underline text-orange-600">Types</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {
              pokemon.types.map((type, index) => (
                <div key={index} className="p-2 bg-orange-100 border-orange-600 border rounded-xl">
                  <p>{toPascalCase(type.type.name)}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="flex flex-col gap-4 p-2 rounded-xl" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
          <div>
            <h2 className="flex justify-center text-lg underline text-orange-600">Abilities</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {
              pokemon.abilities.map((ability, index) => (
                <div key={index} className="p-2 bg-orange-100 border-orange-600 border rounded-xl">
                  <p>{toPascalCase(ability.ability.name)}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="flex flex-col gap-4 p-2 rounded-xl" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
          <div>
            <h2 className="flex justify-center text-lg underline text-orange-600">Stats</h2>
          </div>
          <div className="flex flex-col gap-4">
            {
              pokemon.stats.map((stat, index) => (
                <div key={index} className="p-2 bg-orange-100 border-orange-600 border rounded-xl">
                  <p className="w-[40%]">{toPascalCase(stat.stat.name)}: {stat.base_stat}</p>
                  <div className="flex justify-center bg-red-600 h-2 rounded-2xl " style={{ width: `${Math.min(stat.base_stat, 100)}%` }}></div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="flex flex-col gap-4 p-2 col-span-3 rounded-xl " style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
          <div>
            <h2 className="flex justify-center text-lg underline text-orange-600 ">Moves</h2>
          </div>
          <div className="grid grid-cols-8 gap-4">
            {
              pokemon.moves.map((move, index) => (
                <div key={index} className="p-2 bg-orange-100 border-orange-600 border rounded-xl">
                  <p>{toPascalCase(move.move.name)}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  );
}
