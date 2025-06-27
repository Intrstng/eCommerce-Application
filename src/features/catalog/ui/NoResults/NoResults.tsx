import type { FC } from 'react';
import S from './NoResults.module.scss';
import Box from '@mui/material/Box';
import type { NoResultsProps } from './interfaces';

export const NoResults: FC<NoResultsProps> = ({ hasActiveFilters, onClearFilters }) => (
    <Box className={S.noResults}>
        {hasActiveFilters
            ? 'No products found matching your criteria. Try adjusting your filters.'
            : 'No products available at the moment.'}

        {hasActiveFilters && (
            <button onClick={onClearFilters} className={S.clearButton}>
                Clear all filters
            </button>
        )}
    </Box>
);
