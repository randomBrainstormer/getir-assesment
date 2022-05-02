import React from 'react';
import { useLoading, ThreeDots } from '@agney/react-loading';
import { ThemedComponent } from '../assets/colors';
import styled from 'styled-components';

const LoaderWrapper = styled.section`
  color: ${(props) => props.theme?.mainColor};
`;

function Loader(props: ThemedComponent) {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots />,
  });

  return (
    <LoaderWrapper {...containerProps} {...props}>
      {indicatorEl} {/* renders only while loading */}
    </LoaderWrapper>
  );
}

export default Loader;
