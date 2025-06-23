import { memo } from 'react';
import Button from '../../../components/Button/Button';
import S from './HeroSection.module.scss';
import heroVideoSource from '../../../../assets/video/hero.mp4';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../enums';

export const HeroSection = memo(() => {
    const navigate = useNavigate();

    return (
        <div className={S.heroSection}>
            <div className={S.heroContent}>
                <h1 className={S.heroHeading}>Custom jewerly for yourself, friends, family, and special occasions.</h1>
                <div className={S.heroButtons}>
                    <Button
                        text="Search catalog"
                        size="large"
                        variant="primary"
                        fullWidth
                        className={S.heroSearchCatalog}
                        onClick={() => {
                            navigate(PATH.CATALOG);
                        }}
                    />
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
