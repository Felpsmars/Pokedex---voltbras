import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_POKEMONS } from '../graphql/get-pokemons';

export interface IPokemon {
  id: string;
  number: string;
  name: string;
  types: string[];
  maxCP: number;
  maxHP: number;
  image: string;
  evolutions: [
    {
      id: string;
    }
  ];
}

export interface IPokemonArray {
  pokemons: IPokemon[];
  totalVisible?: number;
}

interface IDataContext {
  pokemonData: IPokemonArray;
  rangeSliderMax: number;
  minValue: number;
  maxValue: number;

  setRangeSliderMax: Dispatch<SetStateAction<number>>;
  setMinValue: Dispatch<SetStateAction<number>>;
  setMaxValue: Dispatch<SetStateAction<number>>;
}

type ContextProviderProps = {
  children: ReactNode;
};

export const firstVariables = { first: 154 };

export const Context = createContext({} as IDataContext);

export function ContextProvider({ children }: ContextProviderProps) {
  const {
    data: pokemonData,
    loading,
    error,
  } = useQuery(GET_POKEMONS, {
    variables: firstVariables,
  });

  const [rangeSliderMax, setRangeSliderMax] = useState<number>(2500);
  const [minValue, setMinValue] = useState<number>(500);
  const [maxValue, setMaxValue] = useState<number>(2000);

  return (
    <Context.Provider
      value={{
        pokemonData,
        rangeSliderMax,
        setRangeSliderMax,
        minValue,
        setMinValue,
        maxValue,
        setMaxValue,
      }}
    >
      {children}
    </Context.Provider>
  );
}
