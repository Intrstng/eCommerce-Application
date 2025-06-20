import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    productPageContainer: {
        padding: '0 1rem',
        maxWidth: '1180px',
        margin: '0 auto',
    },
    productContainer: {
        marginBottom: '2rem',
    },
    product: {
        borderRadius: '0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5.8rem',
        boxShadow: 'unset',
        '@media (max-width: 1180px)': {
            gap: '1.5rem',
        },
        '@media (max-width: 950px)': {
            flexDirection: 'column',
        },
    },
    carousel: {
        height: '500px',
        width: '500px',
    },
    content: {
        maxWidth: '394px',
        width: '100%',
        '@media (max-width: 550px)': {
            width: '320px',
        },
    },
    title: {
        mt: '0.625rem',
        mb: '1.25rem',
        fontFamily: 'Cormorant, serif',
        fontWeight: '400',
        fontSize: '3.25rem',
        lineHeight: '3.93rem',
        color: '#161412',
    },
    info: {
        mb: '0.5rem',
        width: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '0.45rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.875rem',
        lineHeight: '1rem',
        color: '#65635F',
    },
    errorMessage: {
        paddingTop: '2.5rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1.31rem',
        lineHeight: '1.5rem',
        color: '#65635F',
    },
    stone: {
        alignItems: 'flex-start',
        mb: '0.25rem',
    },
    material: {
        fontSize: '0.875rem',
        textTransform: 'capitalize',
    },
    gender: {
        fontSize: '0.875rem',
        textTransform: 'capitalize',
    },
    sku: {
        mb: '0.75rem',
    },
    text: {
        mb: '1.25rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.19rem',
        color: '#65635F',
        textAlign: 'left',
    },
    devider: {
        mb: '1.25rem',
    },
    productControls: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productSkeletonContainer: {
        padding: '0 1rem',
        maxWidth: '1180px',
        margin: '7rem auto 2rem',
    },
    skeletonBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    priceAndStockContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1rem',
    },
    stockText: {
        fontFamily: 'Jost, sans-serif',
        fontSize: '1rem',
        color: '#65635f',
    },
    cartLoader: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});
