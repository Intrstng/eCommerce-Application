import Typography from '@mui/material/Typography';
import { CatalogCard } from './CatalogCard/CatalogCard';
import noImage from '../../../assets/products/no-image.png';
import Box from '@mui/material/Box';
import S from './Catalog.module.scss';
import { formatPrice } from '../utils/format-price';
import { useFetchProducts } from '../../../common/hooks/useFetchProducts';

export const Catalog = () => {
    const { catalogProducts, isProductsLoading } = useFetchProducts();

    if (catalogProducts.length === 0) {
        return (
            <Typography component="h2" variant="h5">
                There are no products in the catalogue according to your requirements. Try requesting products with
                another characteristics...
            </Typography>
        );
    }

    return (
        <div>
            <h2>Catalog</h2>
            <Box className={S.cards}>
                {catalogProducts.map(product => (
                    <CatalogCard
                        key={product.id}
                        image={product.images[0] || noImage}
                        title={product.name.en}
                        description={product.description.en}
                        price={formatPrice(product.prices)}
                        isProductsLoading={isProductsLoading}
                    />
                ))}
            </Box>
        </div>
    );
};
