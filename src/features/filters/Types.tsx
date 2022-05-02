import React, { useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../app/hooks';
import { setActiveProductType } from '../products/productsSlice';
import { sagaActions } from '../../app/sagaActions';

import { ProductType } from '../../types';

interface ChipButtonProps {
  isActive: boolean;
}

const ChipButton = styled.button.attrs((props) => ({
  type: 'button',
}))<ChipButtonProps>`
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  outline: none;
  line-height: normal;

  /* Corrects font smoothing for webkit */
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;

  /* Corrects inability to style clickable input types in iOS */
  -webkit-appearance: none;

  padding: 6px 16px;
  border-radius: 2px;

  min-width: 60px;
  min-height: 30px;

  background-color: ${(props) =>
    props.isActive ? props.theme.mainColor : props.theme.secondaryColor};
  color: ${(props) =>
    props.isActive
      ? props.theme.mainColorContrast
      : props.theme.secondaryColorContrast};
`;

const ProductTypes = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 16px 0;
`;

const FilterByProductType = () => {
  // control which chip button is active
  const [activeChip, setActiveChip] = useState<ProductType>(ProductType.MUG);

  const dispatch = useAppDispatch();

  const setActiveType = (chip: ProductType) => {
    dispatch(setActiveProductType(chip));
    setActiveChip(chip);
    dispatch({ type: sagaActions.FETCH_PRODUCT_SAGA, payload: { page: 1 } });
  };

  return (
    <ProductTypes>
      <ChipButton
        isActive={activeChip === ProductType.MUG}
        onClick={() => setActiveType(ProductType.MUG)}
      >
        mug
      </ChipButton>
      <ChipButton
        isActive={activeChip === ProductType.SHIRT}
        onClick={() => setActiveType(ProductType.SHIRT)}
      >
        shirt
      </ChipButton>
    </ProductTypes>
  );
};

export default FilterByProductType;
