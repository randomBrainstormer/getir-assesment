import styled from 'styled-components';
import { WIDTH_MAX_CONTENT_WIDTH } from '../constants';

/**
 * Wrap elements to in a max-width div
 */
const Container = styled.div`
  max-width: ${WIDTH_MAX_CONTENT_WIDTH}px;
`;

export default Container;
