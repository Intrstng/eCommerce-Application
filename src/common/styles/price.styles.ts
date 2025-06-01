import { genStyles } from '../utils/generate-styles';

export const PRICE_STYLES = genStyles({
    priceContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    price: {
        fontFamily: 'Jost, sans-serif',
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: '1.5rem',
        color: '#161412',
        transition: 'color 0.3s ease',
    },
    oldPriceContent: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    oldPrice: {
        fontFamily: 'Jost, sans-serif',
        fontWeight: 300,
        fontSize: '0.875rem',
        lineHeight: '1.5rem',
        color: '#65635F',
        textDecoration: 'none',
    },
    lineThrough: {
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '100%',
        height: '1px',
        backgroundColor: '#65635F',
        transform: 'translateY(-50%)',
    },
});
