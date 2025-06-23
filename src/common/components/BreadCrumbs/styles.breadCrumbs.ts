import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    breadcrumbs: {
        mt: 3,
        mb: 2,
    },
    links: {
        textDecoration: 'none',
        color: '#547792',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.92rem',
        transition: '0.3s ease color',
        letterSpacing: '1px',
        '&:hover': {
            color: '#A55B4B',
        },
    },
    parameterPath: {
        textTransform: 'capitalize',
        cursor: 'text',
    },
    lastPage: {
        color: '#2B1E09',
        textTransform: 'capitalize',
        cursor: 'text',
        '&:hover': {
            color: '#5459AC',
        },
    },
});
