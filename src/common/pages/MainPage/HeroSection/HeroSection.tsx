import { memo, useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import styles from './HeroSection.module.scss';
import heroVideoSource from '../../../../assets/videos/hero.mp4';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

export const HeroSection = memo(() => {
    const navigate = useNavigate();
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    // const { t } = useTranslation();

    useEffect(() => {
        const video = document.createElement('video');
        video.src = heroVideoSource;
        video.preload = 'metadata';

        const handleLoadedData = () => {
            setIsVideoLoaded(true);
        };

        video.addEventListener('loadeddata', handleLoadedData);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

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
                {!isVideoLoaded && <div className={styles.videoPlaceholder} />}
                <video
                    className={`${styles.heroVideo} ${isVideoLoaded ? styles.videoLoaded : ''}`}
                    preload="metadata"
                    playsInline
                    autoPlay
                    loop
                    muted
                    src={heroVideoSource}
                />
            </div>
        </div>
    );
});
