import { genStyles } from '../../../../utils/generate-styles';

export const STYLES = genStyles({
    addressCardsContent: {
        maxWidth: '35rem',
        mb: '2rem',
    },

    addressesTitle: {
        mb: '1rem',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1.31rem',
        lineHeight: '1.5rem',
        color: '#161412',
    },

    addressCards: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '1rem',
    },

    addressControls: {
        mt: '1rem',
        width: '91%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '0.7rem',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
            maxWidth: '76.5%',
        },
    },
    addressButton: {
        minWidth: '13rem',
        width: '100%',
        whiteSpace: 'nowrap',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.75rem',
        lineHeight: '1.5rem',
        letterSpacing: '1px',
        pt: '0.375rem',
        pb: '0.375rem',
        boxShadow: 'unset',
        border: '1px solid #000',
        borderRadius: 0,
        transition: '0.3s all ease-in-out',
        '&:disabled': {
            border: '1px solid rgba(101, 99, 95, 0.65)',
            backgroundColor: 'rgba(101, 99, 95, 0.15)',
        },
    },
    shippingAddButton: {
        mt: 0,
        mb: 0,
        color: '#FFF',
        backgroundColor: '#000',
        '&:hover': {
            color: '#000',
            border: '1px solid #000',
            backgroundColor: '#FFF',
        },
    },
    billingAddButton: {
        mt: 0,
        color: '#65635F',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#000',
        },
    },
    dialog: {
        '& .MuiPaper-root': {
            borderRadius: '0',
        },
    },
    emptyAddressMessage: {
        m: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.25rem 0',
        maxWidth: '31.8rem',
        width: '100%',
        textAlign: 'center',
        border: '1px dashed',
        borderColor: 'divider',
        borderRadius: 0,
        '@media (max-width: 600px)': {
            border: 'none',
            padding: '1.25rem 0',
        },
    },
    emptyAddressMessageTitle: {
        mb: 0,
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        letterSpacing: '1px',
        color: '#65635F',
    },
});
