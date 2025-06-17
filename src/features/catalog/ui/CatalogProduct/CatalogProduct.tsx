import type { FC } from 'react';
import Box from '@mui/material/Box';
import { CatalogCard } from '../CatalogCard/CatalogCard';
import S from './CatalogProduct.module.scss';
import type { ProductsGridProps } from './interface';

export const ProductsGrid: FC<ProductsGridProps> = ({ products, isProductsLoading }) => (
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
                variantId={product.variants[0].id}
            />
        ))}
    </Box>
);
