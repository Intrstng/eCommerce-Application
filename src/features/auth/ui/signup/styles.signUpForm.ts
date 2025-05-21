import { genStyles } from '../../../../common/utils/generate-styles';

export const STYLES = genStyles({
    content: {
        paddingTop: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    logo: {
        m: 1,
        backgroundColor: 'rgba(8,83,231,0.9)',
    },
    pageTitle: {
        mb: 2,
    },
    formPass: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '0.5rem',
        mt: 1,
        mb: 4,
        '@media (max-width: 690px)': {
            flexDirection: 'column',
            mb: 2,
        },
    },
    formName: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '0.5rem',
        mt: 1,
        mb: 4,
        '@media (max-width: 690px)': {
            flexDirection: 'column',
        },
    },
    autofillInput: {
        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px rgba(250, 237, 202, 0.4) inset',
            WebkitTextFillColor: '#205781',
        },
    },
    formShipping: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '0.5rem',
        mt: 1,
        mb: 3,
        '@media (max-width: 950px)': {
            flexDirection: 'column',
            mb: 0,
        },
    },
    containerBilling: {
        mt: 3,
    },
    formBilling: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '0.5rem',
        mt: 1,
        mb: 3,
        '@media (max-width: 950px)': {
            flexDirection: 'column',
            mb: 0,
        },
    },
    nameInput: {
        mt: 0,
        mb: 0,
        '@media (max-width: 690px)': {
            mb: '1.5rem',
        },
    },
    dateInput: {
        mt: 0,
        mb: 0,
        '@media (max-width: 690px)': {
            mb: '-0.8rem',
        },
    },
    emailInput: {
        mt: 0,
        mb: 0,
        '@media (max-width: 690px)': {
            mb: 3,
        },
    },
    addressInput: {
        mt: 0,
        mb: 0,
    },
    addressInputMedia: {
        '@media (max-width: 950px)': {
            mb: 3,
        },
        '@media (max-width: 690px)': {
            mb: '1.4rem',
        },
    },
    countryInput: {
        width: 'auto',
        minWidth: '200px',
        maxWidth: '100%',
    },
    passInput: {
        mt: 0,
        '@media (max-width: 690px)': {
            mb: '1.7rem',
        },
    },
    confirmPassInput: {
        mt: '2rem',
    },
    countryLabel: {
        mt: '-0.15rem',
    },
    button: {
        mt: 0,
        mb: 1,
    },
    link: {
        textAlign: 'center',
    },
    errorForm: {
        position: 'absolute',
        left: 0,
        top: '3.2rem',
        color: '#d20000',
        fontFamily: 'Arial',
        fontSize: '0.6rem',
    },
    errorName: {
        bottom: 1,
    },
    errorMail: {
        bottom: 3,
    },
    errorPass: {
        top: '3.4rem',
    },
    errorConfirmPass: {
        top: '2.8rem',
    },
    defaultShippingAddressCheckbox: {
        mt: 0,
        mb: 0,
        color: '#295F98',
    },
    shippingAsBillingCheckbox: {
        mt: -1,
        mb: 0,
        color: '#12243d',
    },
    defaultBillingAddressCheckbox: {
        mb: 2,
        color: '#295F98',
    },
    shippingAsBillingMessage: {
        color: '#4DAF50',
        fontWeight: 'bold',
        mt: -0.5,
        mb: 2,
    },
    linkSignUp: {
        m: '0 auto 2rem',
    },
});
