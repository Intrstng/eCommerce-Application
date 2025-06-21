import { genStyles } from '../utils/generate-styles';

export const STYLES = genStyles({
    button: {
        boxSizing: 'border-box',
        border: '1px solid transparent',
        fontFamily: 'Jost, sans-serif',
        fontSize: '0.75rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        fontWeight: 400,
        lineHeight: '1.5rem',
        letterSpacing: '0.1em',
        color: '#fff',
        backgroundColor: '#000',
        transition: 'color 0.3s ease, background-color 0.3s ease',
        '&:disabled': {
            pointerEvents: 'none',
            border: '1px solid rgb(101 99 95 / 65%)',
            opacity: '0.55',
            backgroundColor: 'rgb(101 99 95 / 20%)',
        },
        '&:hover': {
            border: '1px solid #000',
            color: '#000',
            backgroundColor: '#fff',
        },
    },
    activeButton: {
        color: '#fff',
        backgroundColor: '#65635F',
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
