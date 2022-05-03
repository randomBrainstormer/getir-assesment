import React from 'react';
import logo from './headerLogo.svg';
import GridCell from '../../components/GridCell';
import styled from 'styled-components';
import WebsiteContent from '../../components/WebsiteContent';
import CartSection from '../cart/CartSection';
import { respondTo } from '../../assets/mixins';

const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: 'header-logo header-menu';

  ${respondTo.sm`
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: '. header-logo header-menu';
  `}
`;

const HeaderLogo = styled.img.attrs((props) => ({
  src: logo,
  alt: 'Market logo',
}))`
  max-width: 140px;
  padding-top: 17px;
  padding-bottom: 19.32px;
`;

const CartGrid = styled(GridCell).attrs((props) => ({
  area: 'header-menu',
}))`
  display: flex;
  justify-content: center;
`;

function Header() {
  return (
    <WebsiteContent isMainBg={true}>
      <StyledHeader>
        <GridCell area="header-logo">
          <HeaderLogo />
        </GridCell>
        <CartGrid>
          <CartSection />
        </CartGrid>
      </StyledHeader>
    </WebsiteContent>
  );
}

export default Header;
