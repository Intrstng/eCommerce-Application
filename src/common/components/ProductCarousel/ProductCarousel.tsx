import type { FC } from 'react';
import { useState } from 'react';
import { STYLES } from './styles.productCarousel';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-material-ui-carousel';
import type { ProductCarouselProps } from './interfaces';

export const ProductCarousel: FC<ProductCarouselProps> = ({ images }) => {
    const [openImage, setOpenImage] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setOpenImage(true);
    };

    const handleClose = () => {
        setOpenImage(false);
    };

    return (
        <Box sx={STYLES.carousel}>
            {images.length === 1 ? (
                <Box>
                    <CardMedia
                        component="img"
                        src={images[0]}
                        alt="product"
                        sx={STYLES.productImage}
                        onClick={() => {
                            setOpenImage(previous => !previous);
                        }}
                    />

                    <Dialog open={openImage} onClose={handleClose} fullWidth maxWidth="md">
                        <Box sx={STYLES.dialogContent}>
                            <IconButton sx={STYLES.closeButton} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <Carousel
                                sx={STYLES.carouselZoomed}
                                autoPlay={false}
                                indicators={false}
                                cycleNavigation={false}
                                swipe={false}
                                navButtonsAlwaysVisible={false}
                                index={selectedImageIndex}
                            >
                                <CardMedia
                                    component="img"
                                    src={images[0]}
                                    alt="product"
                                    sx={STYLES.productImageZoomed}
                                />
                            </Carousel>
                        </Box>
                    </Dialog>
                </Box>
            ) : (
                <Box>
                    <Carousel
                        sx={STYLES.carousel}
                        autoPlay={true}
                        stopAutoPlayOnHover={true}
                        interval={4000}
                        animation={'slide'}
                        duration={500}
                        swipe={true}
                        indicators={false}
                        cycleNavigation={true}
                        navButtonsAlwaysVisible={true}
                    >
                        {images?.map((source, i) => (
                            <CardMedia
                                key={i}
                                component="img"
                                src={source}
                                alt="product"
                                sx={STYLES.productImage}
                                onClick={() => {
                                    handleImageClick(i);
                                }}
                            />
                        ))}
                    </Carousel>

                    <Dialog open={openImage} onClose={handleClose} fullWidth maxWidth="sm">
                        <Box sx={STYLES.dialogContent}>
                            <IconButton sx={STYLES.closeButton} onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                            <Carousel
                                sx={STYLES.carouselZoomed}
                                autoPlay={false}
                                indicators={false}
                                cycleNavigation={true}
                                swipe={true}
                                navButtonsAlwaysVisible={true}
                                index={selectedImageIndex}
                            >
                                {images.map((source, i) => (
                                    <CardMedia
                                        key={i}
                                        component="img"
                                        src={source}
                                        alt="product"
                                        sx={STYLES.productImageZoomed}
                                    />
                                ))}
                            </Carousel>
                        </Box>
                    </Dialog>
                </Box>
            )}
        </Box>
    );
};
