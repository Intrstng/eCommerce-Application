import { memo } from 'react';
import S from './HeroSection.module.scss';
import heroVideoSource from '../../../../assets/video/hero.mp4';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../enums';
import Button from '@mui/material/Button';
import { STYLES } from './styles.heroSection';

export const HeroSection = memo(() => {
    const navigate = useNavigate();

    return (
        <div className={S.heroSection}>
            <div className={S.heroContent}>
                <h1 className={S.heroHeading}>Custom jewelry for yourself, friends, family, and special occasions.</h1>
                <div className={S.heroButtons}>
                    <Button
                        size="large"
                        sx={STYLES.heroSearchCatalog}
                        onClick={() => {
                            navigate(PATH.CATALOG);
                        }}
                    >
                        Search catalog
                    </Button>
                </div>
            </div>
            <div className={S.videoWrapper}>
                <video
                    className={S.heroVideo}
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
