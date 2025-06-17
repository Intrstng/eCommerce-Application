import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    productImage: {
        height: 'clamp(320px, 40vw, 500px)',
        width: 'clamp(320px, 40vw, 500px)',
        maxWidth: '100%',
        aspectRatio: '1/1',
        '@media (max-width: 950px)': {
            height: 'clamp(320px, 60vw, 450px)',
            width: 'clamp(320px, 60vw, 450px)',
        },
        '@media (max-width: 450px)': {
            height: 'clamp(280px, 80vw, 330px)',
            width: 'clamp(280px, 80vw, 330px)',
        },
    },
    carousel: {
        height: 'clamp(320px, 40vw, 500px)',
        width: 'clamp(320px, 40vw, 500px)',
        maxWidth: '100%',
        aspectRatio: '1/1',
        cursor: 'zoom-in',
        '@media (max-width: 950px)': {
            height: 'clamp(320px, 60vw, 450px)',
            width: 'clamp(320px, 60vw, 450px)',
        },
        '@media (max-width: 450px)': {
            height: 'clamp(280px, 80vw, 330px)',
            width: 'clamp(280px, 80vw, 330px)',
        },
    },
    carouselZoomed: {
        cursor: 'zoom-out',
    },
    productImageZoomed: {
        width: '100%',
        height: 'auto',
        maxWidth: '100vw',
        maxHeight: '90vh',
        aspectRatio: 'auto',
    },
    dialogContent: {
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        padding: '0.75rem',
        top: 10,
        right: 10,
        color: 'rgba(197,9,9,0.7)',
        zIndex: '3',
        transition: '0.3s ease all',
        '&:hover': {
            transform: 'scale(1.1)',
            color: 'rgba(197, 9, 9, 1)',
        },
    },
});
