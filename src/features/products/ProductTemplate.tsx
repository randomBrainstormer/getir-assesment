import React from 'react';
import styled from 'styled-components';
import shirt from './shirt.jpeg';
import mug from './mug.jpeg';
import { useAppDispatch } from '../../app/hooks';
import { Product, ProductType } from '../../types';
import { addItemToCart } from '../cart/cartSlice';
import CurrencyText from '../../components/CurrencyText';

interface ProductProps {
  item: Product;
}

interface ProductImgProps {
  type: ProductType;
}

const ProductInfo = styled.div`
  flex-grow: 1;
`;

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageCard = styled.div``;

const ProductImg = styled.img.attrs<ProductImgProps>(({ type }) => ({
  src: type === ProductType.MUG ? mug : shirt,
  alt: type === ProductType.MUG ? 'Image of a mug' : 'Image of a shirt',
}))<ProductImgProps>`
  width: 92px;
  height: 100%;
`;

const ProductPrice = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.theme.mainColor};
  align-items: flex-start;
  padding: 8px 0;
`;

const ProductDescription = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 14px;
  align-items: flex-start;
  text-align: left;
`;

const ProductButton = styled.button.attrs({
  type: 'button',
})`
  display: inline-block;
  background-color: ${(props) => props.theme.mainColor};
  border-radius: 2px;
  border: 4px double ${(props) => props.theme.mainColor};
  color: white;
  text-align: center;
  font-size: 12px;
  line-height: 20px;
  width: 100%;
  margin-top: 8px;
  transition: all 0.5s;
  cursor: pointer;
`;

const ProductTemplate: React.FC<ProductProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handlePress = () => {
    dispatch(addItemToCart(item));
  };

  return (
    <ProductWrapper>
      <ImageCard>
        <ProductImg type={item.itemType} />
      </ImageCard>
      <ProductInfo>
        <ProductPrice>
          <CurrencyText value={item.price} color="primary" />
        </ProductPrice>
        <ProductDescription>{item.name}</ProductDescription>
      </ProductInfo>
      <ProductButton onClick={handlePress}>Add</ProductButton>
    </ProductWrapper>
  );
};

export default ProductTemplate;
