import { memo, useEffect, useState } from 'react';
import icons from '../../../../assets/icons/icons';
import styles from './InstagramSection.module.scss';
import Button from '../../../components/Button/Button';
import image1 from '../../../../assets/images/instagram/1.jpg';
import image2 from '../../../../assets/images/instagram/2.jpg';
import image3 from '../../../../assets/images/instagram/3.jpg';
import image4 from '../../../../assets/images/instagram/4.jpg';
import image5 from '../../../../assets/images/instagram/5.jpg';
import image6 from '../../../../assets/images/instagram/6.jpg';
import image7 from '../../../../assets/images/instagram/7.jpg';
import image8 from '../../../../assets/images/instagram/8.jpg';
// import { useTranslation } from 'react-i18next';
// import { useNavigate } from 'react-router-dom';

export const InstagramSection = memo(() => {
    // const { t } = useTranslation();
    // const navigate = useNavigate();

    useEffect(() => {
        setImages([image1, image2, image3, image4, image5, image6, image7, image8]);
    }, []);

    const [images, setImages] = useState<string[]>([]);
    const InstagramIcon = icons.instagram;

    const INSTA_URL = 'https://www.instagram.com/do.jewelry/';

    const handleNavigation = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className={styles.instagramWrapper}>
            <div className={styles.instagramGallery}>
                {images.slice(0, 4).map(source => (
                    <div
                        className={styles.instagramImageWrapper}
                        onClick={() => {
                            handleNavigation(INSTA_URL);
                        }}
                        key={source}
                    >
                        <img src={source} alt="Instagram post" />
                        <InstagramIcon className={styles.instagramIcon} />
                    </div>
                ))}
            </div>
            <div className={styles.instagramCta}>
                <h2 className={styles.subsection}>Join #do.jewelry</h2>
                <Button
                    text="FOLLOW ON INSTAGRAM"
                    size="large"
                    variant="secondary"
                    iconRight="instagram"
                    onClick={() => {
                        handleNavigation(INSTA_URL);
                    }}
                    className={styles.ctaButton}
                />
            </div>
            <div className={styles.instagramGallery}>
                {images.slice(4).map(source => (
                    <div
                        className={styles.instagramImageWrapper}
                        onClick={() => {
                            handleNavigation(INSTA_URL);
                        }}
                        key={source}
                    >
                        <img src={source} alt="Instagram post" />
                        <InstagramIcon className={styles.instagramIcon} />
                    </div>
                ))}
            </div>
        </div>
    );
});
