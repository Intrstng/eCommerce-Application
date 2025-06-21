import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    addToCartButton: {
        position: 'absolute',
        bottom: '1rem',
        right: '1rem',
        marginLeft: 'auto',
        padding: '0.25rem',
        transition: 'all 0.25s ease-in-out',
        backgroundColor: 'rgba(240, 240, 240, 0.6)',
        '&:hover': {
            backgroundColor: 'rgba(240, 240, 240, 0.75)',
        },
    },
    inCartButton: {
        backgroundColor: 'rgba(240, 240, 240, 0.6)',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
            backgroundColor: 'rgba(240, 240, 240, 0.75)',
        },
    },
});
