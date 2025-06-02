import styles from './MainPage.module.scss';
import { HeroSection } from './HeroSection/HeroSection';
import { InstagramSection } from './InstagramSection/InstagramSection';

export const MainPage = () => {
    return (
        <div className={styles.mainContent}>
            <HeroSection></HeroSection>
            <InstagramSection></InstagramSection>
        </div>
    );
};
