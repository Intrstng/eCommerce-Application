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
        '& .MuiIconButton-root': {
            '&[aria-label*="Previous"], &[aria-label*="Next"]': {
                margin: 0,
                position: 'absolute',
                top: '50% !important',
                transform: 'translateY(-50%) !important',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                borderRadius: '50%',
                zIndex: 2,
                transition: '0.3s ease all',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
            },
            '&[aria-label*="Previous"]': {
                left: '10px',
            },
            '&[aria-label*="Next"]': {
                right: '10px',
            },
        },
    },
    carouselZoomed: {
        cursor: 'zoom-out',
        '& .MuiIconButton-root': {
            '&[aria-label*="Previous"], &[aria-label*="Next"]': {
                margin: 0,
                position: 'absolute',
                top: '50% !important',
                transform: 'translateY(-50%) !important',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: 'white',
                borderRadius: '50%',
                zIndex: 2,
                transition: '0.3s ease all',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                },
            },
            '&[aria-label*="Previous"]': {
                left: '10px',
            },
            '&[aria-label*="Next"]': {
                right: '10px',
            },
        },
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
        zIndex: 10,
        top: 7,
        right: 7,
        color: '#fff',
        transition: '0.3s ease all',
        '&:hover': {
            transform: 'scale(1.1)',
            color: 'rgba(255,255,255,0.87)',
        },
    },
});
