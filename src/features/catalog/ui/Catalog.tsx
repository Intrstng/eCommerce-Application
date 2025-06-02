import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useFetchProducts } from '../../../common/hooks/useFetchProducts';
import { CatalogCard } from './CatalogCard/CatalogCard';
import S from './Catalog.module.scss';
import type { CatalogProduct } from 'src/features/catalog/api/catalogApi.interfaces.ts';
import icons from '../../../assets/icons/icons';

export const Catalog = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();
    const { catalogProductsFiltered, isProductsLoading, materials, genders } = useFetchProducts();

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
    const hasProducts = catalogProductsFiltered.length > 0;

    return (
        <Box className={S.catalogContainer}>
            <h1>Catalog</h1>
            <Box className={S.controls}>
                <Box className={S.selectControls}>
                    <FilterSelect
                        value={searchParameters.get('material') ?? ''}
                        options={materials}
                        placeholder="ALL MATERIALS"
                        onChange={value => {
                            updateParameter('material', value);
                        }}
                        disabled={materials.length === 0}
                    />

                    <FilterSelect
                        value={searchParameters.get('gender') ?? ''}
                        options={genders}
                        placeholder="ANY GENDER"
                        onChange={value => {
                            updateParameter('gender', value);
                        }}
                        disabled={genders.length === 0}
                    />

                    <FilterSelect
                        value={searchParameters.get('sort') ?? ''}
                        options={['price_asc', 'price_desc']}
                        placeholder="PRICE"
                        onChange={value => {
                            updateParameter('sort', value);
                        }}
                    />
                    <button onClick={handleClearFilters} className={S.clearButton} disabled={!hasActiveFilters}>
                        Clear
                    </button>
                </Box>
                <Box className={S.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchParameters.get('search') ?? ''}
                        onChange={event => {
                            updateParameter('search', event.target.value);
                        }}
                        disabled
                        className={S.searchInput}
                    />
                    <icons.search className={S.searchIcon} />
                </Box>
            </Box>

            {hasProducts ? (
                <ProductsGrid products={catalogProductsFiltered} isProductsLoading={isProductsLoading} />
            ) : (
                <NoResults hasActiveFilters={hasActiveFilters} onClearFilters={handleClearFilters} />
            )}
        </Box>
    );
};

const ProductsGrid = ({ products, isProductsLoading }: { products: CatalogProduct[]; isProductsLoading: boolean }) => (
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

const FilterSelect = ({
    value,
    options,
    placeholder,
    onChange,
    disabled = false,
}: {
    value: string;
    options: string[];
    placeholder: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}) => (
    <Box className={S.filterBlock}>
        <select
            value={value}
            onChange={event => {
                onChange(event.target.value);
            }}
            className={S.filterSelect}
            disabled={disabled}
        >
            <option value="">{placeholder}</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option.toUpperCase()}
                </option>
            ))}
        </select>
    </Box>
);

const NoResults = ({ hasActiveFilters, onClearFilters }: { hasActiveFilters: boolean; onClearFilters: () => void }) => (
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
