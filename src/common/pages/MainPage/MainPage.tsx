import S from './MainPage.module.scss';
import { HeroSection } from './HeroSection/HeroSection';
import { PromotionSection } from './PromotionSection/PromotionSection';
import { InstagramSection } from './InstagramSection/InstagramSection';

export const MainPage = () => {
    return (
        <div className={S.mainContent}>
            <HeroSection></HeroSection>
            <PromotionSection></PromotionSection>
            <InstagramSection></InstagramSection>
        </div>
    );
};
