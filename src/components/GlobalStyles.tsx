import { createGlobalStyle } from 'styled-components';
import { ThemedComponent } from '../assets/colors';

export const GlobalStyles = createGlobalStyle<ThemedComponent>`
  body {
    background: ${({ theme }) => theme.backgroundColor};
    font-family: 'Open Sans', sans-serif;
    transition: all 0.50s linear;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

`;
export default GlobalStyles;
