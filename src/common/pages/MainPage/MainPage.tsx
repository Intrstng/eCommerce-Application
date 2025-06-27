import S from './MainPage.module.scss';
import { HeroSection } from './HeroSection/HeroSection';
import { TopProductsSection } from './TopProductsSection/TopProductsSection';
import { Promotion } from '../../../features/discount/ui/Promotion/Promotion';
import { InstagramSection } from './InstagramSection/InstagramSection';

export const MainPage = () => {
    return (
        <div className={S.mainContent}>
            <HeroSection />
            <TopProductsSection />
            <Promotion />
            <InstagramSection />
        </div>
    );
};
