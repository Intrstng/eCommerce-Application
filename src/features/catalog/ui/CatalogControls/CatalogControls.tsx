import type { FC } from 'react';
import Box from '@mui/material/Box';
import { CatalogFilterSelect } from '../CatalogFilterSelect/CatalogFilterSelect';
import { useSearchParams } from 'react-router-dom';
import searchSvg from '../../../../assets/icons/search.svg';
import S from './CatalogControls.module.scss';
import type { ProductType } from '../../api/catalogApi';
import { useState } from 'react';
import icons from '../../../../assets/icons/icons';

type CatalogControlsProps = {
  hasActiveFilters: boolean;
  updateParameterCB: (key: string, value: string) => void;
  handleClearFiltersCB: () => void;
  materials: string[];
  genders: string[];
  productTypes: ProductType[];
};


export const CatalogControls: FC<CatalogControlsProps> = ({
                                                            hasActiveFilters,
                                                            updateParameterCB,
                                                            handleClearFiltersCB,
                                                            materials,
                                                            genders,
                                                            productTypes,
                                                          }) => {
  const [searchParameters] = useSearchParams();
  const isCategorySelected = searchParameters.has('type');
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const toggleFiltersVisibility = () => {
    setAreFiltersVisible(!areFiltersVisible);
  };

  return (
      <Box className={S.controls}>
        <button className={S.filterButton} onClick={toggleFiltersVisibility}>
          <icons.filter1 />
        </button>
        <Box className={`${S.collapsibleFilters} ${areFiltersVisible ? S.visibleOnMobile : ''}`}>
          <Box className={S.selectControls}>
            <CatalogFilterSelect
                value={(searchParameters.get('productType') ?? '').trim()}
                options={productTypes.map(type => type.name.trim())}
                placeholder="ALL TYPES"
                onChange={value => {
                  updateParameterCB('productType', value.trim());
                }}
                disabled={productTypes.length === 0 || isCategorySelected}
            />

            <CatalogFilterSelect
                value={searchParameters.get('material') ?? ''}
                options={materials}
                placeholder="ALL MATERIALS"
                onChange={value => {
                  updateParameterCB('material', value);
                }}
                disabled={materials.length === 0}
            />

            <CatalogFilterSelect
                value={searchParameters.get('gender') ?? ''}
                options={genders}
                placeholder="ANY GENDER"
                onChange={value => {
                  updateParameterCB('gender', value);
                }}
                disabled={genders.length === 0}
            />

            <CatalogFilterSelect
                value={searchParameters.get('sort') ?? ''}
                options={['price_asc', 'price_desc']}
                placeholder="PRICE"
                onChange={value => {
                  updateParameterCB('sort', value);
                }}
            />
          </Box>
          <Box className={S.searchContainer}>
            <input
                type="text"
                placeholder="Search..."
                value={searchParameters.get('search') ?? ''}
                onChange={event => {
                  updateParameterCB('search', event.target.value);
                }}
                className={S.searchInputField}
            />
            <img src={searchSvg} alt={'Search'} className={S.searchIcon}/>
          </Box>
          <button onClick={handleClearFiltersCB} className={S.clearButton} disabled={!hasActiveFilters}>
            Clear
          </button>
        </Box>
      </Box>
  );
};