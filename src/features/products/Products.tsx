import React, { useEffect } from 'react';
import styled from 'styled-components';
import TextElement from '../../components/TextElement';
import Loader from '../../components/Loader';
import Pagination from './pagination/Pagination';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectProducts, isProductListLoading } from './productsSlice';
import { sagaActions } from '../../app/sagaActions';
import FilterByProductType from '../filters/Types';
import ProductTemplate from './ProductTemplate';

const ProductsSection = styled.section`
  grid-area: products-section;
`;

const ProductListPanel = styled.div`
  padding: 22px 20px;
  background-color: ${(props) => props.theme.backgroundColorContrast};

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 20px 8px;
  grid-template-areas:
    'filters-section products-section . .'
    '. . . .'
    '. . . .'
    '. . . .';
`;

const CustomLoader = styled(Loader)`
  grid-column: 2 / 4;
  grid-row: 2 /2;
`;

const Products = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectProducts);

  const isLoading = useAppSelector(isProductListLoading);

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_PRODUCT_SAGA, payload: { page: 1 } });
  }, [dispatch]);

  return (
    <ProductsSection>
      <TextElement color="gray" size={20}>
        Products
      </TextElement>
      <FilterByProductType />
      <ProductListPanel>
        {isLoading ? (
          <CustomLoader />
        ) : (
          products.map((p, i) => <ProductTemplate key={i + p.name} item={p} />)
        )}
      </ProductListPanel>
      <Pagination />
    </ProductsSection>
  );
};

export default Products;
