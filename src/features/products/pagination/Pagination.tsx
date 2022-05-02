import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import arrow from './arrow.svg';
import arrowActive from './arrowActive.svg';

import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { productPages } from '../productsSlice';
import { sagaActions } from '../../../app/sagaActions';

import { ThemedComponent } from '../../../assets/colors';

interface StyledArrowProp extends ThemedComponent {
  rotateArrow?: boolean;
  className?: string;
}

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const ArrowButton = styled.div<StyledArrowProp>`
  display: flex;
  align-items: center;

  ${(props) =>
    props.rotateArrow
      ? `
      &:before {
        transform: rotate(180deg);
        padding-left: 12px;
      }
    `
      : `
      &:after {
        padding-left: 12px;
        padding-top: 8px;
      }
    `}
`;

const NextArrow = <ArrowButton>Next</ArrowButton>;

const PrevArrow = <ArrowButton rotateArrow={true}>Prev</ArrowButton>;

const StyledPagination = styled(ReactPaginate).attrs({
  breakLabel: '...',
  nextLabel: NextArrow,
  pageRangeDisplayed: 4,
  marginPagesDisplayed: 1,
  previousLabel: PrevArrow,
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  padding-left: 0;
  width: 100%;

  li a {
    padding: 12px;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.paginationText};
    font-weight: bold;
    font-size: 14px;
  }
  li.previous a div {
    display: flex;
    &:before {
      content: url(${(props) =>
        props?.className?.includes('disabled') ? arrow : arrowActive});
    }
  }
  li.previous a div {
    color: ${(props) => props.theme.mainColor};
    &:before {
      content: url(${arrowActive});
    }
  }
  li.previous.disabled a div {
    color: ${(props) => props.theme.paginationText};
    &:before {
      content: url(${arrow});
    }
  }
  li.next a div {
    color: ${(props) => props.theme.mainColor};
    &:after {
      content: url(${arrowActive});
    }
  }
  li.next.disabled a div {
    color: ${(props) => props.theme.paginationText};
    &:after {
      content: url(${arrow});
    }
  }
  li.previous a,
  li.next a {
    padding: 0 12px;
    height: 100%;
  }
  li.active a,
  li.selected a {
    background-color: ${(props) => props.theme.mainColor};
    border-color: transparent;
    color: white;
  }
`;

const Pagination = () => {
  const dispatch = useAppDispatch();
  const pages = useAppSelector(productPages);
  // Invoke when user click to request another page.
  const handlePageClick = ({ selected }: { selected: number }) => {
    dispatch({
      type: sagaActions.FETCH_PRODUCT_SAGA,
      payload: { page: selected + 1 },
    });
    // setItemOffset(newOffset);
  };

  return (
    <PaginationWrapper>
      <StyledPagination
        pageCount={pages}
        // marginPagesDisplayed={3}
        // pageRangeDisplayed={3}
        onPageChange={handlePageClick}
      />
      {/* <ReactPaginate
        breakLabel="..."
        nextLabel={NextArrow}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pages}
        previousLabel={PrevArrow}
        // renderOnZeroPageCount={() => null}
      /> */}
    </PaginationWrapper>
  );
};

export default Pagination;
