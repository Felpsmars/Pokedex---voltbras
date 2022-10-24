import React, { useCallback, useEffect, useState, useRef } from 'react';
import style from './styles.module.scss';
import {
  voltbraslogo,
  trophy,
  config,
  misc,
  info,
  menu,
} from '../../../assets';

const SideMenu = () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className={style.containerSideMenu}>
      <input
        onChange={() => setChecked(!checked)}
        type='checkbox'
        id='menu-hamburguer'
        className={style.menu_input}
      />
      <label htmlFor='menu-hamburguer' className={style.menu_label}>
        <img src='http://svgshare.com/i/Jj.svg' />
      </label>
      <div className={style.contentContainer}>
        <div className={style.logoContainer}>
          <img src={voltbraslogo} alt='voltbraslogo' />
          <div>
            <h1>Voltbras App</h1>
            <p>Pokémon Manager</p>
          </div>
        </div>

        <div className={style.firstNav}>
          <span className={style.menuImgContainer}>
            <img className={style.menuImg} src={menu} alt='menu' />
          </span>
          <h1>Lista</h1>
        </div>

        <div className={style.nav}>
          <img src={trophy} alt='trophy' />
          <h1>Conquistas</h1>
        </div>

        <div className={style.nav}>
          <img src={misc} alt='misc' />
          <h1>Pokédex</h1>
        </div>

        <div className={style.nav}>
          <img src={info} alt='info' />
          <h1>Ajuda</h1>
        </div>

        <div className={style.nav}>
          <img src={config} alt='config' />
          <h1>Configuração</h1>
        </div>
      </div>
    </div>
  );
};

export { SideMenu };
