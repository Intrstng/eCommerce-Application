import S from './MainPage.module.scss';
import { HeroSection } from './HeroSection/HeroSection';
import { TopProductsSection } from './TopProductsSection/TopProductsSection';
import { PromotionSection } from './PromotionSection/PromotionSection';
import { InstagramSection } from './InstagramSection/InstagramSection';

export const MainPage = () => {
    return (
        <div className={S.mainContent}>
            <HeroSection></HeroSection>
            <TopProductsSection></TopProductsSection>
            <PromotionSection></PromotionSection>
            <InstagramSection></InstagramSection>
        </div>
    );
};
