import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    signInBtn: {
        '@media (width <= 768px)': {
            display: 'none',
        },
    },
    authLink: {
        cursor: 'pointer',
        transition: '0.3s all ease',
        '&:hover': {
            transform: 'scale(1.07)',
        },
    },
});
