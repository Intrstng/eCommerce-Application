import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import icons from '../../../../assets/icons/icons';
import S from './InstagramSection.module.scss';
import Button from '../../../components/Button/Button';
import image1 from '../../../../assets/images/instagram/1.jpg';
import image2 from '../../../../assets/images/instagram/2.jpg';
import image3 from '../../../../assets/images/instagram/3.jpg';
import image4 from '../../../../assets/images/instagram/4.jpg';
import image5 from '../../../../assets/images/instagram/5.jpg';
import image6 from '../../../../assets/images/instagram/6.jpg';
import image7 from '../../../../assets/images/instagram/7.jpg';
import image8 from '../../../../assets/images/instagram/8.jpg';

export const InstagramSection = memo(() => {
    const { t } = useTranslation();
    useEffect(() => {
        setImages([image1, image2, image3, image4, image5, image6, image7, image8]);
    }, []);

    const [images, setImages] = useState<string[]>([]);
    const InstagramIcon = icons.instagram;

    const INSTAGRAM_URL = 'https://www.instagram.com/do.jewelry/';

    const handleNavigation = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={S.instagramWrapper}>
            <div className={S.instagramGallery}>
                {images.slice(0, 4).map(source => (
                    <div
                        className={S.instagramImageWrapper}
                        onClick={() => {
                            handleNavigation(INSTAGRAM_URL);
                        }}
                        key={source}
                    >
                        <img src={source} alt="Instagram post" />
                        <InstagramIcon className={S.instagramIcon} />
                    </div>
                ))}
            </div>
            <div className={S.instagramCta}>
                <h2 className={S.subsection}>{t('instagramSection.subsection')}</h2>
                <Button
                    text={t('instagramSection.buttonInstagram')}
                    size="large"
                    variant="secondary"
                    iconRight="instagram"
                    onClick={() => {
                        handleNavigation(INSTAGRAM_URL);
                    }}
                    className={S.ctaButton}
                />
            </div>
            <div className={S.instagramGallery}>
                {images.slice(4).map(source => (
                    <div
                        className={S.instagramImageWrapper}
                        onClick={() => {
                            handleNavigation(INSTAGRAM_URL);
                        }}
                        key={source}
                    >
                        <img src={source} alt="Instagram post" />
                        <InstagramIcon className={S.instagramIcon} />
                    </div>
                ))}
            </div>
        </div>
    );
});
