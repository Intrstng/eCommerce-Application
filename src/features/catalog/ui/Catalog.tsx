import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFetchProducts } from '../../../common/hooks/useFetchProducts';
import { STYLES } from './styles.Catalog';
import { ProductsGrid } from './CatalogProduct/CatalogProduct';
import { NoResults } from './NoResults/NoResults';
import { useSearchParams } from 'react-router-dom';
import { CatalogControls } from './CatalogControls/CatalogControls';
import { useAppSelector } from '../../../common/hooks';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import CircularProgress from '@mui/material/CircularProgress';

export const Catalog = () => {
    const { catalogProductsFiltered, isProductsLoading, materials, genders, productTypes } = useFetchProducts();
    const appStatus: string = useAppSelector<Status>(statusSelector);
    const [searchParameters, setSearchParameters] = useSearchParams();

    const updateParameter = (key: string, value: string) => {
        const newParameters = new URLSearchParams(searchParameters);
        if (value) {
            newParameters.set(key, value);
        } else {
            newParameters.delete(key);
        }
        setSearchParameters(newParameters);
    };

    const handleClearFilters = () => {
        setSearchParameters(new URLSearchParams());
    };

    const hasActiveFilters = searchParameters.toString().length > 0;
    const hasProducts = catalogProductsFiltered?.length > 0;

    return (
        <Box sx={STYLES.catalogContainer}>
            <Typography variant="h2" component="h2" sx={STYLES.catalogTitle}>
                Catalog
            </Typography>

            <CatalogControls
                hasActiveFilters={hasActiveFilters}
                updateParameterCB={updateParameter}
                handleClearFiltersCB={handleClearFilters}
                materials={materials}
                genders={genders}
                productTypes={productTypes}
            />

            {appStatus === 'loading' ? (
                <Box sx={STYLES.loadSpinner}>
                    <CircularProgress size={60} color="success" />
                </Box>
            ) : hasProducts ? (
                <ProductsGrid products={catalogProductsFiltered} isProductsLoading={isProductsLoading} />
            ) : (
                <NoResults hasActiveFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
            )}
        </Box>
    );
};
