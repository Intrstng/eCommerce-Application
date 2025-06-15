import S from './MainPage.module.scss';
import { HeroSection } from './HeroSection/HeroSection';
import { InstagramSection } from './InstagramSection/InstagramSection';
import { PromotionSection } from './PromotionSection/PromotionSection';

export const MainPage = () => {
    return (
        <div className={S.mainContent}>
            <HeroSection></HeroSection>
            <PromotionSection></PromotionSection>
            <InstagramSection></InstagramSection>
        </div>
    );
};
