import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import S from './TopProductsSection.module.scss';
import ProductCardSkeleton from '../../../components/ProductCard/ProductCardSkeleton';

export const TopProductsSection = () => {
    return (
        <div className={S.productSlider}>
            <div className={S.sliderHeading}>
                <h2 className={S.title}>Top Products</h2>
                <div className={S.subtitle}>Essential products, best values, lower prices</div>
            </div>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={20}
                slidesPerView={6}
                // slidesPerView="auto"
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    640: { slidesPerView: 4, spaceBetween: 20 },
                    768: { slidesPerView: 4, spaceBetween: 20 },
                    1024: { slidesPerView: 6, spaceBetween: 20 },
                    1280: { slidesPerView: 8, spaceBetween: 20 },
                }}
            >
                {Array.from({ length: 10 }).map((_, index) => (
                    <SwiperSlide key={index} className={S.swiperSlide}>
                        <ProductCardSkeleton />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
