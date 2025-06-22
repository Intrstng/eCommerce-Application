import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    addressCardInfoContent: {
        padding: '0.5rem 0.75rem 0.75rem 1.25rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        width: '93.3%',
        border: '1px solid #000',
        '@media (max-width: 560px)': {
            flexDirection: 'column',
            width: '93%',
        },
        '@media (max-width: 460px)': {
            width: '91.5%',
        },
        '@media (max-width: 370px)': {
            width: '90%',
        },
    },
    addressCard: {
        mt: 2,
    },
    addressCardInfo: {
        mb: '0',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
    },
    addressCardInfoTitle: {
        maxWidth: '6.5rem',
        width: '100%',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.19rem',
        color: '#65635F',
        overflow: 'hidden',
    },
    addressCardItemInfo: {
        marginLeft: '0',
        // marginRight: '0.5rem',
        // maxWidth: '11.92rem',
        // width: '100%',
        width: '190px',
        height: '2.5rem',
        display: 'block',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '1rem',
        lineHeight: '1.19rem',
        color: '#000000',
        letterSpacing: '0.1em',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        textAlign: 'start',
        '@media (max-width: 560px)': {
            marginRight: '0',
        },
    },

    addressControls: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        alignSelf: 'flex-start',
        position: 'relative',
        '@media (max-width: 560px)': {
            flexDirection: 'row',
            gap: '0.5rem',
            width: '100%',
            marginTop: '-2rem',
        },
    },

    addressEditControls: {
        alignSelf: 'flex-end',
    },

    addressDetailsControls: {
        mt: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem',
    },

    addressDefaultControls: {
        mt: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem',

        '@media (max-width: 560px)': {
            marginTop: '2rem',
        },
    },

    editAddressButton: {
        width: '2rem',
        height: '2rem',
        color: '#65635F',
        position: 'absolute',
        top: '0',
        right: '1.2rem',
        transition: '0.3s all ease-in-out',
        '&:hover': {
            color: 'green',
        },
    },

    deleteAddressButton: {
        width: '2rem',
        height: '2rem',
        color: '#65635F',
        position: 'absolute',
        top: '0',
        right: '-0.5rem',
        transition: '0.3s all ease-in-out',
        '&:hover': {
            color: '#d20000',
        },
    },

    addressPurposeButtons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'flex-start',
        gap: '0.5rem',
        mt: '0.75rem',
        mb: '0.1rem',
    },
    addressStatusButtons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '0.5rem',
    },

    addressDetailsButton: {
        maxWidth: '8.25rem',
        width: '100%',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.6rem',
        lineHeight: '1.25rem',
        letterSpacing: '1px',
        pt: '0.3rem',
        pb: '0.3rem',
        boxShadow: 'unset',
        border: '1px solid #000',
        transition: '0.3s all ease-in-out',
        borderRadius: 0,
        '&:disabled': {
            border: '1px solid rgba(101, 99, 95, 0.65)',
            backgroundColor: 'rgba(101, 99, 95, 0.15)',
        },
    },
    billingPurposeButton: {
        mt: 0,
        color: '#65635F',
        border: '1px solid #65635F',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#000',
            border: '1px solid #000',
        },
    },
    shippingPurposeButton: {
        mt: 0,
        mb: 0,
        color: '#65635F',
        border: '1px solid #65635F',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#000',
            border: '1px solid #000',
        },
    },

    addressDefaultButtons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        gap: '0.5rem',
        mt: '0.75rem',
        mb: 0,
    },
    tooltipDefaultButton: {
        maxWidth: '10.25rem',
        width: '100%',
    },
    addressDefaultButton: {
        maxWidth: '10.25rem',
        width: '100%',
        fontFamily: 'Jost, sans-serif',
        fontWeight: '400',
        fontSize: '0.6rem',
        lineHeight: '1.25rem',
        letterSpacing: '1px',
        pt: '0.3rem',
        pb: '0.3rem',
        boxShadow: 'unset',
        border: '1px solid #000',
        transition: '0.3s all ease-in-out',
        borderRadius: 0,
        '&:disabled': {
            border: '1px solid rgba(101, 99, 95, 0.65)',
            backgroundColor: 'rgba(101, 99, 95, 0.15)',
        },
    },
    billingDefaultButton: {
        mt: 0,
        color: '#65635F',
        border: '1px solid #65635F',

        backgroundColor: '#FFF',
        '&:hover': {
            color: '#000',
            border: '1px solid #000',
        },
    },
    shippingDefaultButton: {
        mt: 0,
        mb: 0,
        color: '#65635F',
        border: '1px solid #65635F',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#000',
            border: '1px solid #000',
        },
    },

    defaultBillingStatusButton: {
        mt: 0,
        color: '#65635F',
        border: '1px solid #65635F',
        backgroundColor: 'rgb(101 99 95 / 15%)',
        '&:hover': {
            color: '#000',
            backgroundColor: '#FFF',
        },
    },
    defaultShippingStatusButton: {
        mt: 0,
        mb: 0,
        color: '#65635F',
        backgroundColor: '#65635F',
        '&:hover': {
            backgroundColor: '#65635F',
            boxShadow: 'unset',
            cursor: 'unset',
        },
    },

    purposeActive: {
        border: '1px solid #65635F',
        color: '#FFF',
        backgroundColor: '#65635F',
        '&:hover': {
            backgroundColor: '#65635F',
        },
    },
    statusActive: {
        border: '1px solid #65635F',
        color: '#FFF',
        backgroundColor: '#000',
        '&:hover': {
            backgroundColor: '#3D365C',
        },
    },
    dialog: {
        '& .MuiPaper-root': {
            borderRadius: '0',
        },
    },
});
