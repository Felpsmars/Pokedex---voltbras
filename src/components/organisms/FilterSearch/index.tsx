import React, { useEffect, useState, useMemo, useContext } from 'react';

import { MultiRangeSlider, SideMenu } from '../../molecules';
import { PokemonContainer, TypeSelection } from '../../atoms';
import { Context, IPokemon, firstVariables } from '../../../context';
import style from './styles.module.scss';

function FilterSearch() {
  const { pokemonData } = useContext(Context);
  const { minValue, setMinValue } = useContext(Context);
  const { maxValue, setMaxValue } = useContext(Context);
  const { rangeSliderMax, setRangeSliderMax } = useContext(Context);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredPokemons = useMemo(() => {
    return pokemonData?.pokemons.reduce((acc, pokemon) => {
      if (pokemon.maxCP > minValue && pokemon.maxCP < maxValue) {
        acc.push(pokemon);
      }

      return acc.filter((pokemon) => {
        if (selectedTypes.length) {
          return pokemon.types.some((type) => selectedTypes.includes(type));
        }
        return true;
      });
    }, [] as IPokemon[]);
  }, [pokemonData, selectedTypes, minValue, maxValue]);

  function maxCpPokemon(pokemonData: IPokemon[]) {
    let maxCPPokemons: any = [];
    if (pokemonData) {
      pokemonData.map((pokemon) => maxCPPokemons.push(pokemon.maxCP));
      setRangeSliderMax(Math.max.apply(null, maxCPPokemons));
    }
  }

  function unique(value: any, index: any, self: any) {
    return self.indexOf(value) === index;
  }

  function typesPokemon(pokemonData: IPokemon[]) {
    let pokemonTypes: any = [];
    pokemonData?.map((pokemon) =>
      pokemon.types.map((type) => pokemonTypes.push(type))
    );

    let uniqueTypes = pokemonTypes.filter(unique).sort();

    return uniqueTypes;
  }

  function isAlreadyOnArray(eachPokemonType: any) {
    let alreadyOnArray = selectedTypes.some((type) => type === eachPokemonType);
    console.log(alreadyOnArray);

    if (!alreadyOnArray) {
      setSelectedTypes([...selectedTypes, eachPokemonType]);
      return;
    }
    setSelectedTypes((prevState) => {
      const newState = [...prevState];
      const index = newState.indexOf(eachPokemonType);
      newState.splice(index, 1);
      return newState;
    });
  }

  useEffect(() => {
    maxCpPokemon(pokemonData?.pokemons);
  }, [pokemonData]);

  return (
    <div className={style.overOverOverContainer}>
      <div>
        <SideMenu />
      </div>
      <div className={style.overOverContainer}>
        <div className={style.contentContainer}>
          <PokemonContainer
            totalVisible={firstVariables.first}
            pokemons={filteredPokemons}
          />
          <div className={style.filterContainer}>
            <h1 className={style.titlePokemon}>Filtro</h1>
            <p className={style.textsPokemon}>maxCP</p>
            <MultiRangeSlider
              rangeSlider={{ min: 0, max: rangeSliderMax }}
              onChange={async ({ min, max }) => {
                setMinValue(min);
                setMaxValue(max);
              }}
            />
            <p className={style.textsPokemon}>Types</p>
            <TypeSelection
              onChange={(event) => {
                const eachPokemonType = event.target.value;
                isAlreadyOnArray(eachPokemonType);
              }}
              selectedTypes={selectedTypes}
              types={typesPokemon(pokemonData?.pokemons)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { FilterSearch };
