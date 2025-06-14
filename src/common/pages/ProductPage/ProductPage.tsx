import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductByIdTC } from '../../../features/catalog/model/slices/catalogSlice';
import { useEffect } from 'react';
import { catalogProductSelector } from '../../../features/catalog/model/selectors/catalogSelector';
import type { CatalogProduct, ProductPrice } from '../../../features/catalog/api/catalogApi.interfaces';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import Box from '@mui/material/Box';
import { STYLES } from './styles.productPage';
import { PRICE_STYLES } from '../../styles/price.styles';
import Card from '@mui/material/Card';
import { BackButton } from '../../buttons/BackButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CustomButton } from '../../buttons/CustomButton';
import { ProductPageSkeleton } from './ProductPageSkeleton';
import { formatPrice, formatPriceDiscount } from '../../../features/catalog/utils/format-price';
import { CopyToClipboard } from '../../components/CopyToClipboard/CopyToClipboard';
import materialSvg from '../../../assets/icons/material.svg';
import genderSvg from '../../../assets/icons/gender.svg';
import sizeSvg from '../../../assets/icons/size-tag.svg';
import stoneShineSvg from '../../../assets/icons/diamond_shine.svg';
import skuSvg from '../../../assets/icons/sku.svg';
import { isValidAttribute } from '../../utils/assertion-functions';
import { ProductCarousel } from '../../components/ProductCarousel/ProductCarousel';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { addToCartTC, removeFromCartTC } from '../../../features/cart/model/slices/cartSlice';
import { cartSelector, cartStatusSelector } from '../../../features/cart/model/selectors/cartSelectors';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import CircularProgress from '@mui/material/CircularProgress';

export const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const catalogProduct: CatalogProduct[] = useAppSelector<CatalogProduct[]>(catalogProductSelector);
    const isLoading: string = useAppSelector<Status>(statusSelector);
    const cart: Cart | null = useAppSelector(cartSelector);
    const isCartLoading: string = useAppSelector<Status>(cartStatusSelector);

    const lineItems: LineItem[] = cart?.lineItems || [];
    const isInCart = lineItems.some((item: LineItem) => item.productId === id);

    useEffect(() => {
        if (id) {
            dispatch(getProductByIdTC(id));
        }
    }, [dispatch, id]);

    let images: string[] = [''];
    let name = '';
    let prices: ProductPrice[] = [];
    let material = '';
    let gender = '';
    let size = '';
    let stone = '';
    let description = '';
    let sku: string | undefined = '';
    let availableQuantity: number | undefined = 0;

    if (catalogProduct.length === 1) {
        const product = catalogProduct[0];
        description = product.description.en;
        images = product.images;
        name = product.name.en;
        prices = product.prices;
        availableQuantity = product.variants[0]?.availability?.availableQuantity;

        const genderAttribute = product.variants[0].attributes?.find(object => isValidAttribute(object, 'gender'));
        gender = genderAttribute ? genderAttribute.value.key : '';

        const materialAttribute = product.variants[0].attributes?.find(object => isValidAttribute(object, 'material'));
        material = materialAttribute ? materialAttribute.value.key : '';

        const sizeAttribute = product.variants[0].attributes?.find(object => isValidAttribute(object, 'size'));
        size = sizeAttribute && typeof sizeAttribute.value === 'string' ? sizeAttribute.value : '';

        const stoneAttribute = product.variants[0].attributes?.find(object => isValidAttribute(object, 'stone'));
        stone = stoneAttribute ? stoneAttribute.value.key : '';

        sku = product.variants[0].sku;
    } else if (catalogProduct.length !== 1 && isLoading !== 'loading') {
        return <Typography>Item is not found...</Typography>;
    }

    if (isLoading === 'loading') {
        return <ProductPageSkeleton />;
    }

    const priceInfo = {
        original: formatPrice(prices, 'EUR'),
        discounted: formatPriceDiscount(prices, 'EUR'),
        hasDiscount: !!formatPriceDiscount(prices, 'EUR'),
    };

    const handleCartAction = () => {
        if (!id) return;

        if (isInCart) {
            const itemToRemove = lineItems.find((item: LineItem) => item.productId === id);
            if (itemToRemove) dispatch(removeFromCartTC(itemToRemove.id));
        } else {
            dispatch(addToCartTC(id, 1));
        }
    };

    return (
        <Box sx={STYLES.productPageContainer}>
            <BreadCrumbs />
            <Box sx={STYLES.productContainer}>
                <Card sx={STYLES.product}>
                    <ProductCarousel images={images} />

                    <Box sx={STYLES.content}>
                        <BackButton />
                        <Typography sx={STYLES.title}>{name ?? 'Name is not present'}</Typography>

                        {material && (
                            <Box sx={{ ...STYLES.info, ...STYLES.material }}>
                                <img src={materialSvg} alt="Material" />
                                <Typography>Material:</Typography>
                                <Typography>{material}</Typography>
                            </Box>
                        )}

                        {gender && (
                            <Box sx={{ ...STYLES.info, ...STYLES.gender }}>
                                <img src={genderSvg} alt="Gender" />
                                <Typography>Gender:</Typography>
                                <Typography>{gender}</Typography>
                            </Box>
                        )}

                        {size && (
                            <Box sx={STYLES.info}>
                                <img src={sizeSvg} alt="Size" />
                                <Typography>Size:</Typography>
                                <Typography>{size}</Typography>
                            </Box>
                        )}

                        {stone && (
                            <Box sx={{ ...STYLES.info, ...STYLES.stone }}>
                                <img src={stoneShineSvg} alt="Stone" />
                                <Typography>Stone:</Typography>
                                <Typography>{stone}</Typography>
                            </Box>
                        )}

                        {sku && (
                            <Box sx={{ ...STYLES.info, ...STYLES.sku }}>
                                <img src={skuSvg} alt="Sku" />
                                <Typography>SKU:</Typography>
                                <Typography>{sku ?? 'SKU is not present'}</Typography>
                                <CopyToClipboard value={sku} />
                            </Box>
                        )}
                        <Typography sx={STYLES.text}>{description}</Typography>
                        <Divider sx={STYLES.devider} />

                        <Box sx={STYLES.priceAndStockContainer}>
                            <Box
                                sx={{
                                    ...PRICE_STYLES.priceContent,
                                    ...PRICE_STYLES.priceContentPosition,
                                }}
                            >
                                {priceInfo.hasDiscount ? (
                                    <>
                                        <Typography sx={PRICE_STYLES.price}>{priceInfo.discounted}</Typography>
                                        <Box sx={PRICE_STYLES.oldPriceContent}>
                                            <Typography sx={PRICE_STYLES.oldPrice}>{priceInfo.original}</Typography>
                                            <Box sx={PRICE_STYLES.lineThrough} />
                                        </Box>
                                    </>
                                ) : (
                                    <Typography sx={PRICE_STYLES.price}>{priceInfo.original}</Typography>
                                )}
                            </Box>
                            {availableQuantity !== undefined && (
                                <Typography sx={STYLES.stockText}>{availableQuantity} in stock</Typography>
                            )}
                        </Box>
                        <Box sx={STYLES.productControls}>
                            <CustomButton
                                isActive={isInCart}
                                onClick={handleCartAction}
                                style={{ width: '100%' }}
                                // disabled={isCartLoading === 'loading'} // button flicker
                            >
                                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                            </CustomButton>
                        </Box>
                    </Box>
                </Card>
                {/*Added in accordance with the requirements*/}
                {isCartLoading === 'loading' && (
                    <Box sx={STYLES.cartLoader}>
                        <CircularProgress color="success" />
                    </Box>
                )}
            </Box>
        </Box>
    );
};
