import React, { useCallback, useEffect, useState, useRef } from 'react';
import style from './styles.module.scss';

interface IRangeTypes {
  min: number;
  max: number;
}

interface IProps {
  rangeSlider: IRangeTypes;
  onChange: ({}: IRangeTypes) => {};
}

const MultiRangeSlider = ({ rangeSlider: { min, max }, onChange }: IProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLInputElement | null>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: any) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={style.containerMultiRangeSlider}>
      <input
        type='range'
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
        }}
        className={`${style.thumb} ${style['thumb--left']}`}
      />
      <input
        type='range'
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
        }}
        className={`${style.thumb} ${style['thumb--right']}`}
      />

      <div className={style.slider}>
        <div className={style.slider__track} />
        <div ref={range} className={style.slider__range} />
        <div className={style.slider__left_value}>{minVal}</div>
        <div className={style.slider__right_value}>{maxVal}</div>
      </div>
    </div>
  );
};

export { MultiRangeSlider };
