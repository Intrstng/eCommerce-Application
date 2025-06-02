import { memo } from 'react';
import Button from '../../../components/Button/Button';
import styles from './HeroSection.module.scss';
import heroVideoSource from '../../../../assets/videos/hero.mp4';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

export const HeroSection = memo(() => {
    const navigate = useNavigate();
    // const { t } = useTranslation();

    return (
        <div className={styles.heroSection}>
            <div className={styles.heroContent}>
                <h1 className={styles.heroHeading}>
                    Custom jewerly for yourself, friends, family, and special occasions.
                </h1>
                <div className={styles.heroButtons}>
                    <Button
                        text="Search catalog"
                        size="large"
                        variant="primary"
                        fullWidth
                        className={styles.heroSearchCatalog}
                        onClick={() => {
                            navigate('/catalog');
                        }}
                    />
                </div>
            </div>
            <div className={styles.videoWrapper}>
                <video
                    className={styles.heroVideo}
                    preload="true"
                    playsInline
                    autoPlay
                    loop
                    muted
                    src={heroVideoSource}
                ></video>
            </div>
        </div>
    );
});
