import Typography from '@mui/material/Typography';
import { CatalogCard } from './CatalogCard/CatalogCard';
import noImage from '../../../assets/products/no-image.png';
import Box from '@mui/material/Box';
import { useFetchProducts } from '../../../common/hooks/useFetchProducts';
import { STYLES } from './styles.Catalog';

export const Catalog = () => {
    const { catalogProducts, isProductsLoading } = useFetchProducts();

    if (!isProductsLoading && catalogProducts.length === 0) {
        return (
            <Typography component="h2" variant="h5">
                There are no products in the catalogue according to your requirements. Try requesting products with
                another characteristics...
            </Typography>
        );
    }

    return (
        <Box>
            <Typography variant="h2" component="h2" sx={STYLES.catalogTitle}>
                Catalog
            </Typography>
            <Box sx={STYLES.cards}>
                {catalogProducts.map(product => (
                    <CatalogCard
                        key={product.id}
                        id={product.id}
                        image={product.images[0] || noImage}
                        title={product.name.en}
                        description={product.description.en}
                        prices={product.prices} // Temporary currency solution
                        isProductsLoading={isProductsLoading}
                    />
                ))}
            </Box>
        </Box>
    );
};
