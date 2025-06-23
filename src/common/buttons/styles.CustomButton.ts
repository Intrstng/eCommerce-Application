import { genStyles } from '../utils/generate-styles';

export const STYLES = genStyles({
    button: {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        fontFamily: 'Jost, sans-serif',
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: '1.5rem',
        letterSpacing: '0.1em',
        color: 'white',
        backgroundColor: '#000',
        transition: 'color 0.3s ease, background-color 0.3s ease',

        '&:hover': {
            border: '1px solid #000',
            color: '#000',
            backgroundColor: '#fff',
        },
    },

    '@media (max-width: 768px)': {
        button: {
            padding: '0.3rem 0.5rem',
            fontSize: '0.6rem',
        },
    },
});
