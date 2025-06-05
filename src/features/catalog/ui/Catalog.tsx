import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useFetchProducts } from '../../../common/hooks/useFetchProducts';
import { STYLES } from './styles.Catalog';
import { ProductsGrid } from './CatalogProduct/CatalogProduct';
import { NoResults } from './NoResults/NoResults';
import { useSearchParams } from 'react-router-dom';
import { CatalogControls } from './CatalogControls/CatalogControls';

// catalogProductsFiltered: allCatalogProducts,
//     isProductsLoading,
//     materials,
//     genders,
//     productTypes,

export const Catalog = () => {
    const { catalogProductsFiltered, isProductsLoading, materials, genders, productTypes } = useFetchProducts();
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
        <Box>
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

            {hasProducts ? (
                <ProductsGrid products={catalogProductsFiltered} isProductsLoading={isProductsLoading} />
            ) : (
                <NoResults hasActiveFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
            )}
        </Box>
    );
};
