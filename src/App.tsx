import React, { useState } from 'react';
import Header from './features/header/Header';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './components/GlobalStyles';
import { lightThemeColors, darkThemeColors } from './assets/colors';
import WebsiteContent from './components/WebsiteContent';
import styled from 'styled-components';
import GridCell from './components/GridCell';
import Filters from './features/filters/Filters';
import Products from './features/products/Products';

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 16px;
  grid-template-areas: 'filters-section products-section other-section';
  padding: 24px;
`;

function App() {
  const [theme] = useState('light');

  // ENHANCEMENT: we could implement a theme switch
  // useEffect(() => {
  //   setTheme('dark');
  // }, []);

  return (
    <ThemeProvider
      theme={theme === 'light' ? lightThemeColors : darkThemeColors}
    >
      <GlobalStyles />
      <div className="App">
        <Header />
        <WebsiteContent>
          <ContentGrid>
            <GridCell area="filters-section">
              <Filters />
            </GridCell>
            <GridCell area="products-section">
              <Products />
            </GridCell>
          </ContentGrid>
        </WebsiteContent>
      </div>
    </ThemeProvider>
  );
}

export default App;
