import type { CatalogProduct } from '../../api/catalogApi.interfaces';
import Box from '@mui/material/Box';
import { CatalogCard } from '../CatalogCard/CatalogCard';
import S from './CatalogProduct.module.scss';

export const ProductsGrid = ({
    products,
    isProductsLoading,
}: {
    products: CatalogProduct[];
    isProductsLoading: boolean;
}) => (
    <Box className={S.cards}>
        {products.map(product => (
            <CatalogCard
                key={product.id}
                id={product.id}
                image={product.images[0]}
                title={product.name.en}
                description={product.description.en}
                prices={product.prices}
                isProductsLoading={isProductsLoading}
            />
        ))}
    </Box>
);
