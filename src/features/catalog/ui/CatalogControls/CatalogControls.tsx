import type { FC } from 'react';
import Box from '@mui/material/Box';
import { CatalogFilterSelect } from '../CatalogFilterSelect/CatalogFilterSelect';
import { useSearchParams } from 'react-router-dom';
import searchSvg from '../../../../assets/icons/search.svg';
import S from './CatalogControls.module.scss';

type CatalogControlsProps = {
    hasActiveFilters: boolean;
    updateParameterCB: (key: string, value: string) => void;
    handleClearFiltersCB: () => void;
    materials: string[];
    genders: string[];
};

export const CatalogControls: FC<CatalogControlsProps> = ({
    hasActiveFilters,
    updateParameterCB,
    handleClearFiltersCB,
    materials,
    genders,
}) => {
    const [searchParameters] = useSearchParams();

    return (
        <Box className={S.controls}>
            <Box className={S.selectControls}>
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
                <button onClick={handleClearFiltersCB} className={S.clearButton} disabled={!hasActiveFilters}>
                    Clear
                </button>
            </Box>
            <Box className={S.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchParameters.get('search') ?? ''}
                    onChange={event => {
                        updateParameterCB('search', event.target.value);
                    }}
                    disabled
                    className={S.searchInputField}
                />
                <img src={searchSvg} alt={'Search'} className={S.searchIcon} />
            </Box>
        </Box>
    );
};
