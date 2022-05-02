import styled from 'styled-components';
import { ThemedComponent } from '../assets/colors';

export type TextColor = 'dark' | 'light' | 'gray' | 'primary';
export interface TextElementProps extends ThemedComponent {
  color: TextColor;
  size?: number;
  bold?: boolean;
}

const getTextColor = (color: TextColor) => {
  switch (color) {
    case 'dark':
      return '#191919';
    case 'light':
      return '#FFFFFF';
    case 'gray':
      return '#697488';
    case 'primary':
      return '#1EA4CE';
    default:
      return '#000000';
  }
};
/**
 * Component to wrap elements in same layout style
 */
const TextElement = styled.span<TextElementProps>`
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.16px;

  font-size: ${(props) => props.size || 14}px;
  font-weight: ${(props) => (props.bold ? 600 : 400)};

  color: ${(props) => getTextColor(props.color)};
`;

export default TextElement;
