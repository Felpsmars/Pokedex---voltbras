import React from 'react';
import { IPokemon, IPokemonArray } from '../../../context';
import styles from './styles.module.scss';

function PokemonContainer({ pokemons, totalVisible }: IPokemonArray) {
  const getColor = (maxCP: number) => {
    if (maxCP <= 500) {
      return '#F87060';
    }
    if (maxCP <= 1000) {
      return '#662C91';
    }
    if (maxCP <= 1500) {
      return '#F5B700';
    }
    return '#00C1FD';
  };

  console.log(totalVisible);

  return (
    <div className={styles.container}>
      <h1>Lista de pokémons</h1>
      <h3>{`Total visíveis: ${totalVisible}`}</h3>
      <div className={styles.scrolableContainer}>
        {pokemons &&
          pokemons.map((pokemon: IPokemon) => (
            <div
              className={styles.pokemonCard}
              key={pokemon.id}
              id={pokemon.id}
            >
              <div className={styles.content}>
                <div className={styles.pokemonImg}>
                  <img alt={pokemon.name} src={pokemon.image} />
                </div>
                <div className={styles.subContent}>
                  <p className={styles.pokemonName}>{pokemon.name}</p>
                  <ul>
                    {pokemon.types.map((type, index) => (
                      <li className={styles.pokemonType} key={index}>
                        {type}
                      </li>
                    ))}
                  </ul>
                  <p
                    style={{ backgroundColor: getColor(pokemon.maxCP) }}
                    className={styles.pokemonMaxCp}
                  >
                    {pokemon.maxCP}
                  </p>
                </div>
              </div>
              <p className={styles.pokemonNumber}>{pokemon.number}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export { PokemonContainer };
