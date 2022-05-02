import styled from 'styled-components';
import { lightThemeColors, ThemedComponent } from '../assets/colors';

interface WrapperProps extends ThemedComponent {
  mainBg?: boolean;
}

/**
 * Component to wrap elements in same layout style
 */
const Wrapper = styled.div<WrapperProps>`
  background-color: ${(props) =>
    props.mainBg ? props.theme.mainColor : props.theme.backgroundColor};
`;

Wrapper.defaultProps = {
  theme: lightThemeColors,
};

export default Wrapper;
