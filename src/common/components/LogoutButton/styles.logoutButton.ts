import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    logoutLink: {
        textDecoration: 'none',
    },
    logoutBtn: {
        padding: '0',
        textTransform: 'capitalize',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.81rem',
        lineHeight: '1.5rem',
        color: '#65635F',
        transition: '0.3s all ease-in-out',
        '&:hover': {
            color: '#d20000',
        },
    },
});
