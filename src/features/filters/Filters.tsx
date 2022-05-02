import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { sagaActions } from '../../app/sagaActions';
import TextElement from '../../components/TextElement';
import { ProductSortFilter } from '../../types';
import {
  selectActiveBrandFilter,
  selectActiveTagFilter,
  selectFilterBrands,
  selectFilterTags,
  selectSortingFilter,
} from '../products/productsSlice';

import checkboxChecked from './checkbox.svg';

interface FilterLayoutProps {
  title: string;
  children: React.ReactNode;
  maxHeight?: number;
}

const FilterLayoutAlignment = styled.div<{ maxHeight?: number }>`
  background-color: ${(props) => props.theme.backgroundColor};
  padding-bottom: 24px;
  overflow: scroll;
  ${(props) => props?.maxHeight && `max-height: ${props.maxHeight}px;`}
`;

const FilterLayoutTitle = styled(TextElement)`
  padding-bottom: 12px;
`;

const FilterLayoutContent = styled.div`
  background-color: ${(props) => props.theme.backgroundColorContrast};
  padding: 24px;
`;

const FilterLayout: React.FC<FilterLayoutProps> = ({
  title,
  children,
  maxHeight,
}) => {
  return (
    <FilterLayoutAlignment maxHeight={maxHeight}>
      <FilterLayoutTitle size={13} color="gray" bold={true}>
        {title}
      </FilterLayoutTitle>
      <FilterLayoutContent>{children}</FilterLayoutContent>
    </FilterLayoutAlignment>
  );
};

const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  all: unset;
  border: 2px solid ${(props) => props.theme.mainColor};
  border-radius: 20px;
  width: 24px;
  height: 20px;
  max-height: 20px;
  max-width: 20px;
  cursor: pointer;

  &:checked {
    background-image: url(${checkboxChecked});
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: initial;
  }
`;

interface RadioInputFilterProps {
  value: ProductSortFilter;
  checked: boolean;
  onChange: (e: any) => void;
  label: string;
}

const CheckboxLabel = styled.label`
  display: flex;
  flex-direction: row;
  padding: 8px 0px;
`;

const RadioInputText = styled(TextElement).attrs({
  color: 'dark',
})`
  padding-left: 10px;
`;

const RadioInputFilter: React.FC<RadioInputFilterProps> = ({
  value,
  checked,
  onChange,
  label,
}) => {
  return (
    <CheckboxLabel>
      <RadioInput
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
      />
      <RadioInputText>{label}</RadioInputText>
    </CheckboxLabel>
  );
};

const SortingFilters = () => {
  const dispatch = useAppDispatch();
  const sortingFilter = useAppSelector(selectSortingFilter);

  const changeSortFilter = (filter: ProductSortFilter) => {
    dispatch({ type: sagaActions.SET_SORTING_FILTER, payload: { filter } });
  };

  return (
    <FilterLayout title="Sorting">
      <RadioInputFilter
        value={ProductSortFilter.PRICE_LOWEST}
        checked={sortingFilter === ProductSortFilter.PRICE_LOWEST}
        onChange={changeSortFilter}
        label="Price low to high"
      />
      <RadioInputFilter
        value={ProductSortFilter.PRICE_HIGHEST}
        checked={sortingFilter === ProductSortFilter.PRICE_HIGHEST}
        onChange={changeSortFilter}
        label="Price high to low"
      />
      <RadioInputFilter
        value={ProductSortFilter.DATE_RECENT}
        checked={sortingFilter === ProductSortFilter.DATE_RECENT}
        onChange={changeSortFilter}
        label="New to old"
      />
      <RadioInputFilter
        value={ProductSortFilter.DATE_OLDEST}
        checked={sortingFilter === ProductSortFilter.DATE_OLDEST}
        onChange={changeSortFilter}
        label="Old to new"
      />
    </FilterLayout>
  );
};

const SearchInput = styled.input`
  border: 2px solid ${(props) => props.theme.backgroundColor};
  border-radius: 2px;
  padding: 16px;
`;

const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  all: unset;
  border: 2px solid ${(props) => props.theme.mainColor};
  border-radius: 2px;
  width: 24px;
  height: 20px;
  max-height: 20px;
  max-width: 20px;

  box-shadow: 0px 1px 7px rgba(93, 56, 192, 0.4);

  &:checked {
    background-image: url(${checkboxChecked});
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: initial;
  }
`;

const CheckBoxLabel = styled.label`
  display: flex;
  flex-direction: row;
  padding: 8px 0;
`;

const CheckBoxText = styled(TextElement).attrs({
  color: 'dark',
})`
  padding-left: 8px;
`;

interface CheckBoxInputProps {
  checked: boolean;
  onChange: (value: boolean, label: string) => void;
  label: string;
}
const CheckBoxInput: React.FC<CheckBoxInputProps> = ({
  checked,
  label,
  onChange,
}) => {
  return (
    <CheckBoxLabel>
      <CheckBox
        // value={checked}
        checked={checked}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <CheckBoxText>{label}</CheckBoxText>
    </CheckBoxLabel>
  );
};

const BrandsFilter = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: sagaActions.FETCH_OTHER_FILTERING_DATA });
  }, [dispatch]);

  const [brandFilterText, setBrandFilterText] = React.useState('');

  const brands = useAppSelector(selectFilterBrands);

  const activeBrands = useAppSelector(selectActiveBrandFilter);

  const filteredBrands = React.useMemo(
    () =>
      brands.filter((brand) =>
        brand.toLowerCase().includes(brandFilterText.toLowerCase())
      ),
    [brandFilterText, brands]
  );

  const handleChange = (value: boolean, label: string) => {
    dispatch({
      type: sagaActions.SET_ACTIVE_BRAND_FILTER,
      payload: { value, label },
    });
  };

  const filterBrands = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrandFilterText(event.target.value);
  };

  return (
    <FilterLayout title="Brands" maxHeight={298}>
      <>
        <SearchInput placeholder="Search brand" onChange={filterBrands} />
        {filteredBrands.map((filterBrand) => (
          <CheckBoxInput
            key={filterBrand}
            label={filterBrand}
            onChange={handleChange}
            checked={activeBrands.includes(filterBrand)}
          />
        ))}
      </>
    </FilterLayout>
  );
};

const TagsFilters = () => {
  const dispatch = useAppDispatch();

  const [tagFilterText, setTagFilterText] = React.useState('');

  const tags = useAppSelector(selectFilterTags);

  const activeTags = useAppSelector(selectActiveTagFilter);

  const filteredTags = React.useMemo(
    () =>
      tags.filter((tag) =>
        tag.toLowerCase().includes(tagFilterText.toLowerCase())
      ),
    [tagFilterText, tags]
  );

  const handleChange = (value: boolean, label: string) => {
    dispatch({
      type: sagaActions.SET_ACTIVE_TAGS_FILTER,
      payload: { value, label },
    });
  };

  const filterTags = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFilterText(event.target.value);
  };

  return (
    <FilterLayout title="Tags" maxHeight={298}>
      <>
        <SearchInput placeholder="Search brand" onChange={filterTags} />
        {filteredTags.map((filterTag) => (
          <CheckBoxInput
            key={filterTag}
            label={filterTag}
            onChange={handleChange}
            checked={activeTags.includes(filterTag)}
          />
        ))}
      </>
    </FilterLayout>
  );
};

const FiltersWrapper = styled.div`
  grid-area: filters-section;
`;

const Filters = () => {
  return (
    <FiltersWrapper>
      <SortingFilters />
      <BrandsFilter />
      <TagsFilters />
    </FiltersWrapper>
  );
};

export default Filters;
