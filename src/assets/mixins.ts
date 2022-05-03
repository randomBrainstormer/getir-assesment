import { css, CSSObject } from 'styled-components';

export const breakpoints = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
};

type cssParams = Parameters<typeof css>;
const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>;

export const respondTo = keys.reduce((accumulator, label) => {
  accumulator[label] = (...args: cssParams) => {
    return css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
  };
  return accumulator;
}, {} as Record<keyof typeof breakpoints, Function>);
