import S from './MainPage.module.scss';
import { HeroSection } from './HeroSection/HeroSection';
import { InstagramSection } from './InstagramSection/InstagramSection';

export const MainPage = () => {
    return (
        <div className={S.mainContent}>
            <HeroSection></HeroSection>
            <InstagramSection></InstagramSection>
        </div>
    );
};
