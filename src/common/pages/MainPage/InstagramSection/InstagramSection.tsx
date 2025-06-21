import icons from '../../../../assets/icons/icons';
import S from './InstagramSection.module.scss';
import Button from '@mui/material/Button';
import image1 from '../../../../assets/images/instagram/1.jpg';
import image2 from '../../../../assets/images/instagram/2.jpg';
import image3 from '../../../../assets/images/instagram/3.jpg';
import image4 from '../../../../assets/images/instagram/4.jpg';
import image5 from '../../../../assets/images/instagram/5.jpg';
import image6 from '../../../../assets/images/instagram/6.jpg';
import image7 from '../../../../assets/images/instagram/7.jpg';
import image8 from '../../../../assets/images/instagram/8.jpg';
import Box from '@mui/material/Box';
import { STYLES } from './styles.instagramSection';

const IMAGE_COLLECTION: string[] = [image1, image2, image3, image4, image5, image6, image7, image8];
const INSTAGRAM_URL = 'https://www.instagram.com/do.jewelry/';
const InstagramIcon = icons.instagram;

export const InstagramSection = () => {
    const handleNavigation = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box className={S.instagramWrapper}>
            <Box className={S.instagramGallery}>
                {IMAGE_COLLECTION.slice(0, 4).map(source => (
                    <Box
                        className={S.instagramImageWrapper}
                        onClick={() => {
                            handleNavigation(INSTAGRAM_URL);
                        }}
                        key={source}
                    >
                        <img src={source} alt="Instagram post" />
                        <InstagramIcon className={S.instagramIcon} />
                    </Box>
                ))}
            </Box>
            <Box className={S.instagramCta}>
                <h2 className={S.subsection}>Join #do.jewelry</h2>
              <Button
                  size="large"
                  variant="secondary"
                  sx={ STYLES.ctaButton }
                  onClick={() => {
                    handleNavigation(INSTAGRAM_URL);
                  }}
              >
                FOLLOW ON INSTAGRAM
              </Button>
            </Box>
            <Box className={S.instagramGallery}>
                {IMAGE_COLLECTION.slice(4).map(source => (
                    <Box
                        className={S.instagramImageWrapper}
                        onClick={() => {
                            handleNavigation(INSTAGRAM_URL);
                        }}
                        key={source}
                    >
                        <img src={source} alt="Instagram post" />
                        <InstagramIcon className={S.instagramIcon} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
