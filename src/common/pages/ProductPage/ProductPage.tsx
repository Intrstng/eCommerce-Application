import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductByIdTC } from '../../../features/catalog/model/slices/catalogSlice';
import { useEffect, useState } from 'react';
import { catalogProductSelector } from '../../../features/catalog/model/selectors/catalogSelector';
import type { CatalogProduct } from '../../../features/catalog/api/catalogApi.interfaces';
import type { ProductPrice } from '../../../features/catalog/api/catalogApi.interfaces';
import type { Status } from 'app/model/types';
import { statusSelector } from 'app/model/selectors/appSelectors';
import Box from '@mui/material/Box';
import { STYLES } from './styles.productPage';
import { Card, CardMedia } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { BackButton } from '../../buttons/BackButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CustomButton } from '../../buttons/CustomButton';
import { FavouriteSwitch } from '../../components/FavouriteSwitch/FavouriteSwitch';
import { ProductPageSkeleton } from './ProductPageSkeleton';
import { formatPrice, formatPriceDiscount, isFirstSignInIDOdd } from '../../../features/catalog/utils/format-price';
import { CopyToClipboard } from '../../components/CopyToClipboard/CopyToClipboard';
import materialSvg from '../../../assets/icons/material.svg';
import genderSvg from '../../../assets/icons/gender.svg';
import sizeSvg from '../../../assets/icons/size-tag.svg';
import stoneShineSvg from '../../../assets/icons/diamond_shine.svg';
import skuSvg from '../../../assets/icons/sku.svg';

interface Attribute {
    name: string;
    value: {
        key: string;
        label?: string;
    };
}

export const ProductPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const catalogProduct: CatalogProduct[] = useAppSelector<CatalogProduct[]>(catalogProductSelector);
    const isLoading: string = useAppSelector<Status>(statusSelector);

    // ToDo: Temporary solution:
    const [isFavourite, setIsFavourite] = useState<Record<string, boolean>>({
        uuidFav1: false,
        uuidFav2: false,
    });
    const [isInBasket, setIsInBasket] = useState(false);

    const handleIsFavouriteToggle = (id: string) => {
        setIsFavourite(previous => ({
            ...previous,
            [id]: !previous[id],
        }));
    };

    const handleCartToggle = () => {
        setIsInBasket(previous => !previous);
    };
    ///////////////

    useEffect(() => {
        if (id) {
            dispatch(getProductByIdTC(id));
        }
    }, [dispatch, id]);

    let images: string[] = [''];
    // let isInCart: boolean = false;
    // let isInFavourites: boolean = false;
    let name = '';
    let prices: ProductPrice[] = [];
    let material = '';
    let gender = '';
    let size = '';
    let stone = '';
    let description = '';
    let sku: string | undefined = '';

    const isAttribute = (variant: unknown): variant is Attribute => {
        return typeof variant === 'object' && variant !== null && 'name' in variant && 'value' in variant;
    };

    if (catalogProduct.length === 1) {
        const product = catalogProduct[0];
        description = product.description.en;
        images = product.images;
        name = product.name.en;
        prices = product.prices;

        const genderAttribute = product.variants[0].attributes?.find(isAttribute);
        gender = genderAttribute ? genderAttribute.value.key : '';

        const materialAttribute = product.variants[0].attributes?.find(isAttribute);
        material = materialAttribute ? materialAttribute.value.key : '';

        const sizeAttribute = product.variants[0].attributes?.find(isAttribute);
        size = sizeAttribute && typeof sizeAttribute.value === 'string' ? sizeAttribute.value : '';

        const stoneAttribute = product.variants[0].attributes?.find(isAttribute);
        stone = stoneAttribute ? stoneAttribute.value.key : '';

        sku = product.variants[0].sku;
    } else if (catalogProduct.length !== 1 && isLoading !== 'loading') {
        return <Typography>Item is not found...</Typography>;
    }

    if (isLoading === 'loading') {
        return <ProductPageSkeleton />;
    }

    return (
        <Box sx={STYLES.productContainer}>
            <Card sx={STYLES.product}>
                <Box sx={STYLES.carousel}>
                    <Carousel
                        sx={STYLES.carousel}
                        autoPlay={true}
                        stopAutoPlayOnHover={true}
                        interval={4000}
                        animation={'slide'}
                        duration={500}
                        swipe={true}
                        indicators={true}
                        cycleNavigation={true}
                        navButtonsAlwaysVisible={true}
                    >
                        {images?.map((source, i) => (
                            <CardMedia
                                key={i}
                                component="img"
                                src={source}
                                alt="product"
                                className="productImage"
                                sx={STYLES.productImage}
                            />
                        ))}
                    </Carousel>
                </Box>

                <Box sx={STYLES.content}>
                    <BackButton />
                    <Typography sx={STYLES.title}>{name ?? 'Name is not present'}</Typography>
                    <Box
                        sx={{
                            ...STYLES.info,
                            ...STYLES.material,
                        }}
                    >
                        <img src={materialSvg} alt="Material" />
                        <Typography>Material:</Typography>
                        <Typography>{material ?? 'Material is not present'}</Typography>
                    </Box>

                    <Box
                        sx={{
                            ...STYLES.info,
                            ...STYLES.gender,
                        }}
                    >
                        <img src={genderSvg} alt="Gender" />
                        <Typography>Gender:</Typography>
                        <Typography>{gender ?? 'Gender is not present'}</Typography>
                    </Box>

                    <Box sx={STYLES.info}>
                        <img src={sizeSvg} alt="Size" />
                        <Typography>Size:</Typography>
                        <Typography>{size ?? 'Size is not present'}</Typography>
                    </Box>

                    <Box
                        sx={{
                            ...STYLES.info,
                            ...STYLES.stone,
                        }}
                    >
                        <img src={stoneShineSvg} alt="Stone" />
                        <Typography>Stone:</Typography>
                        <Typography>{stone ?? 'Stone is not present'}</Typography>
                    </Box>

                    <Box
                        sx={{
                            ...STYLES.info,
                            ...STYLES.sku,
                        }}
                    >
                        <img src={skuSvg} alt="Sku" />
                        <Typography>SKU:</Typography>
                        <Typography>{sku ?? 'SKU is not present'}</Typography>
                        <CopyToClipboard value={sku} />
                    </Box>
                    <Typography sx={STYLES.text}>{description}</Typography>
                    <Divider sx={STYLES.devider} />
                    <Box sx={STYLES.priceContent}>
                        {/*Temporary solution with price and currency*/}
                        {/*<Typography sx={STYLES.price}>{formatPrice(prices, prices[1].value.currencyCode)}</Typography>*/}
                        <Typography sx={STYLES.price}>{formatPrice(prices, 'USD')}</Typography>
                        {isFirstSignInIDOdd(id) && (
                            <Box sx={STYLES.oldPriceContent}>
                                {/*Temporary solution with price and currency*/}
                                {/*<Typography sx={STYLES.oldPrice}>{formatPriceTricky(prices, prices[1].value.currencyCode)}</Typography>*/}
                                <Typography sx={STYLES.oldPrice}>{formatPriceDiscount(prices, 'USD')}</Typography>
                                <Box sx={STYLES.lineThrough} />
                            </Box>
                        )}
                    </Box>
                    <Box sx={STYLES.productControls}>
                        <CustomButton style={{ width: '21.8rem' }} onClick={handleCartToggle}>
                            {/*Temporary solution for Sprint 3*/}
                            {isInBasket ? 'Remove from Cart' : 'Add to Cart'}
                        </CustomButton>
                        {/*Temporary solution for Sprint 3*/}
                        <FavouriteSwitch
                            id={'uuidFav1'}
                            isFavourite={isFavourite.uuidFav1}
                            onToggle={handleIsFavouriteToggle}
                        />
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};
