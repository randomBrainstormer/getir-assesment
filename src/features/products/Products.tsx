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
import { respondTo } from '../../assets/mixins';

const ProductsSection = styled.section`
  grid-area: products-section;
  width: 100%;
`;

const ProductListPanel = styled.div`
  background-color: ${(props) => props.theme.backgroundColorContrast};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(16, 1fr);
  gap: 12px 0px;

  ${respondTo.sm`
    padding: 22px 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(8, 1fr);
    gap: 18px 8px;
  `}

  ${respondTo.md`
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 20px 8px;
  `}
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
