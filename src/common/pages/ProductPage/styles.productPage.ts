import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    productPageContainer: {
        width: 'calc(100% - 2rem)', // padding 1rem x 2 (see next line)
        padding: '0 1rem',
        maxWidth: '1180px',
        margin: '0 auto',
        '@media (max-width: 550px)': {
            width: 'calc(100% - 1rem)',
            padding: '0 0.5rem',
        },
    },
    productContainer: {
        width: '100%',
        marginBottom: '2rem',
    },
    product: {
        width: '100%',
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
        width: 'calc(100% - 2rem)', // padding 1rem x 2 (see next line)
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
});
