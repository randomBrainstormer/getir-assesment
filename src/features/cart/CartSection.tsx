import React from 'react';
import cartIcon from './cartIcon.svg';
import TextElement from '../../components/TextElement';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectCartProducts, changeCartItemQuantity } from './cartSlice';
import { CartItem } from '../../types';
import NumberInput from '../../components/NumberInput';
import CurrencyText from '../../components/CurrencyText';

interface CartProductProps {
  item: CartItem;
}

const HeaderSection = styled.div`
  background-color: ${(props) => props.theme.mainColorShadow};
  width: 129px;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;

  position: relative;

  &:hover {
    #dropdown-content {
      display: block;
    }
  }
`;

const CartLogo = styled.img.attrs((props) => ({
  src: cartIcon,
  alt: 'Cart icon',
}))`
  padding-right: 8px;
`;

const ClosedSection = styled.div`
  display: flex;
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  min-width: 296px;
  transform: translateY(calc(100%));
`;

const DropdownContent = styled.div`
  max-height: 250px;
  display: flex;
  background-color: ${(props) => props.theme.backgroundColorContrast};
  border: 8px solid ${(props) => props.theme.mainColor};
  padding: 24px;
  flex-direction: column;
  overflow: scroll;
`;

const CartItemElement = styled.div`
  display: flex;
  flex-direction: row;
  padding: 18px 4px;
  border-bottom: 2px solid ${(props) => props.theme.backgroundColor};
`;

const CartItemElementLeftSide = styled.div`
  display: flex;
  width: 60%;
  justify-content: flex-start;
  flex-direction: column;
`;

const CartItemElementRightSide = styled.div`
  display: flex;
  width: 40%;
  justify-content: flex-end;
`;

const CartTotalRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 24px;
`;

const Total = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid ${(props) => props.theme.mainColor};
  padding: 16px;
  border-radius: 2px;
`;

const Placeholder = styled.div`
  height: 48px;
`;

const CartProduct: React.FC<CartProductProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { name, price } = item.product;
  const changeValue = (newValue: number) => {
    dispatch(changeCartItemQuantity({ id: item.id, newValue }));
  };
  return (
    <CartItemElement>
      <CartItemElementLeftSide>
        <TextElement color="dark">{name}</TextElement>
        <CurrencyText value={price} color="primary" />
      </CartItemElementLeftSide>
      <CartItemElementRightSide>
        <NumberInput value={item.count} onChange={changeValue} />
      </CartItemElementRightSide>
    </CartItemElement>
  );
};

function CartSection() {
  const cartProducts = useAppSelector<CartItem[]>(selectCartProducts);
  const total = cartProducts.reduce(
    (total, sum) => total + sum.product.price * sum.count,
    0
  );
  return (
    <HeaderSection>
      <ClosedSection>
        <CartLogo />
        <CurrencyText color="light" value={total} />
      </ClosedSection>
      {cartProducts.length > 0 && (
        <DropdownMenu id="dropdown-content">
          <Placeholder />
          <DropdownContent>
            {cartProducts.map((p, index) => (
              <CartProduct key={index + p.id} item={p} />
            ))}
            <CartTotalRow>
              <Total>
                <CurrencyText value={total} color="primary" />
              </Total>
            </CartTotalRow>
          </DropdownContent>
        </DropdownMenu>
      )}
    </HeaderSection>
  );
}

export default CartSection;
