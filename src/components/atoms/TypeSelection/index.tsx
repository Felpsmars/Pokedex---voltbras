import React from 'react';
import style from './styles.module.scss';

interface ITypes {
  types: string[];
  onChange: (event: any) => void;
  selectedTypes: String[];
}

function TypeSelection({ types, onChange, selectedTypes }: ITypes) {
  return (
    <div className={style.overContainer}>
      {types.map((type, index) => (
        <label className={style.labelContainer} key={index} htmlFor={type}>
          <input
            className={style.checkbox}
            value={type}
            onChange={onChange}
            id={type}
            type='checkbox'
            checked={selectedTypes.includes(type)}
          />
          <div className={style.contentPokemon}>
            <p className={style.text}>{type}</p>
            <span className={style.checkmark} />
          </div>
        </label>
      ))}
    </div>
  );
}

export { TypeSelection };
