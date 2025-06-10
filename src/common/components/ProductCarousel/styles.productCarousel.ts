import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    productImage: {
        height: '500px',
        width: '500px',
        '@media (max-width: 850px)': {
            height: '390px',
            width: '390px',
        },
        '@media (max-width: 550px)': {
            height: '320px',
            width: '320px',
        },
    },
    carousel: {
        height: '500px',
        width: '500px',
        cursor: 'zoom-in',
        '@media (max-width: 850px)': {
            height: '390px',
            width: '390px',
        },
        '@media (max-width: 550px)': {
            height: '320px',
            width: '320px',
        },
    },
    carouselZoomed: {
        cursor: 'zoom-out',
    },
    productImageZoomed: {
        width: '100%',
        height: 'auto',
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
