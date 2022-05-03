import styled from 'styled-components';

interface GridCellProps {
  area: string;
}
/**
 * A grid area wrapper
 */
const GridCell = styled.div<GridCellProps>`
  grid-area: ${({ area }) => area};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default GridCell;
