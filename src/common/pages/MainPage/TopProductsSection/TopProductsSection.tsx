import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import S from './TopProductsSection.module.scss';
import { ProductSliderCardSkeleton } from '../../../components/ProductSliderCard/ProductSliderCardSkeleton';
import { useFetchAllProducts } from '../../../hooks/useFetchAllProducts';
import { generateRandomArrayItems } from '../../../utils/generate-random-array-items';
import type { CatalogProduct } from '../../../../features/catalog/api/catalogApi.interfaces';
import Box from '@mui/material/Box';
import { ProductSliderCard } from '../../../components/ProductSliderCard/ProductSliderCard';

const SLIDES_QUANTITY = 10;
const SLIDES_GAP = 20;
const SKELETON_COUNT = 6;
const SLIDER_DELAY = 3000;

export const TopProductsSection = () => {
    const { allProducts, isAllProductsLoading } = useFetchAllProducts();
    console.log(allProducts, isAllProductsLoading);

    const randomProductItemsArray: CatalogProduct[] = isAllProductsLoading
        ? Array.from({ length: SLIDES_QUANTITY })
        : generateRandomArrayItems(allProducts, SLIDES_QUANTITY);

    return (
        <Box className={S.productSlider}>
            <Box className={S.sliderHeading}>
                <h2 className={S.title}>Top Products</h2>
                <h3 className={S.subtitle}>Essential products, best values, lower prices</h3>
            </Box>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={SLIDES_GAP}
                slidesPerView={SKELETON_COUNT}
                // slidesPerView="auto"
                // loop={true}
                loop={randomProductItemsArray.length > SKELETON_COUNT}
                autoplay={isAllProductsLoading ? false : { delay: SLIDER_DELAY, disableOnInteraction: false }}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: SLIDES_GAP / 2 },
                    390: { slidesPerView: 2, spaceBetween: SLIDES_GAP / 2 },
                    480: { slidesPerView: 2, spaceBetween: SLIDES_GAP / 2 },
                    // 600: { slidesPerView: 2, spaceBetween: SLIDES_GAP },
                    700: { slidesPerView: 3, spaceBetween: SLIDES_GAP, centeredSlides: false },
                    // 640: { slidesPerView: 4, spaceBetween: SLIDES_GAP },
                    768: { slidesPerView: 4, spaceBetween: SLIDES_GAP },
                    1024: { slidesPerView: 6, spaceBetween: SLIDES_GAP },
                    1440: { slidesPerView: 8, spaceBetween: SLIDES_GAP },
                }}
            >
                {randomProductItemsArray.map((productItem, index) => (
                    <SwiperSlide key={`slide-${productItem?.id ?? String(index)}`} className={S.swiperSlide}>
                        {isAllProductsLoading ? (
                            <ProductSliderCardSkeleton key={`skeleton-${productItem?.id ?? String(index)}`} />
                        ) : (
                            <ProductSliderCard
                                key={`product-${productItem?.id ?? String(index)}`}
                                productItemData={productItem}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};
