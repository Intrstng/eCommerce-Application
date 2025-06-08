import S from './NoResults.module.scss';
import Box from '@mui/material/Box';

export const NoResults = ({
    hasActiveFilters,
    onClearFilters,
}: {
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}) => (
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
