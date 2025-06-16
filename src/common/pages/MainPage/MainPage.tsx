import S from './MainPage.module.scss';
import { HeroSection } from './HeroSection/HeroSection';
import { InstagramSection } from './InstagramSection/InstagramSection';
import { Promotion } from '../../../features/discount/ui/Promotion/Promotion';

export const MainPage = () => {
    return (
        <div className={S.mainContent}>
            <HeroSection></HeroSection>
            <Promotion></Promotion>
            <InstagramSection></InstagramSection>
        </div>
    );
};
