import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    authLink: {
        m: '0 auto 2rem',
        color: '#393E46',
    },
    navLink: {
        textDecoration: 'none',
        color: '#2973B2',
        transition: 'color 0.3s ease, text-decoration 0.3s ease',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '50%',
            width: '0',
            height: '1px',
            backgroundColor: '#024CAA',
            transition: 'width 0.3s ease, left 0.3s ease',
        },
        '&:hover': {
            color: '#024CAA',
            '&::after': {
                width: '100%',
                left: '0',
            },
        },
        '&:active': {
            color: '#2E5077',
            '&::after': {
                width: '80%',
                left: '0',
            },
        },
    },
});
