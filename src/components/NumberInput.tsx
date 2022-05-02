import React from 'react';
import styled from 'styled-components';

interface NumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Input = styled.input.attrs({
  min: 0,
  type: 'number',
  readOnly: true,
})`
  width: 32px;
  font-size: 16x;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  outline: none;
  background-color: ${(props) => props.theme.mainColor};
  color: ${(props) => props.theme.mainColorContrast};
  outline: none;
  border: none;
  background-image: none;
  box-shadow: none;
`;

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange }) => {
  const reduceValue = () => {
    onChange(value - 1);
  };

  const addValue = () => {
    onChange(value + 1);
  };

  return (
    <InputWrapper>
      <Button onClick={reduceValue}>-</Button>
      <Input value={value} />
      <Button onClick={addValue}>+</Button>
    </InputWrapper>
  );
};

export default NumberInput;
