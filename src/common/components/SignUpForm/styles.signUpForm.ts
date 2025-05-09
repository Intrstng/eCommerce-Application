import { genStyles } from '../../utils/generate-styles';

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
        '@media (max-width: 500px)': {
            flexDirection: 'column',
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
        '@media (max-width: 500px)': {
            flexDirection: 'column',
        },
    },
    formDelivery: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '0.5rem',
        mt: 1,
        mb: 4,
        '@media (max-width: 900px)': {
            flexDirection: 'column',
        },
    },
    formBilling: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        gap: '0.5rem',
        mt: 1,
        mb: 4,
        '@media (max-width: 900px)': {
            flexDirection: 'column',
        },
    },
    nameInput: {
        mt: 0,
        mb: 0,
    },
    dateInput: {
        mt: 0,
        mb: 0,
    },
    emailInput: {
        mt: 0,
        mb: 0,
    },
    addressInput: {
        mt: 0,
        mb: 0,
    },
    addressInputMedia: {
        '@media (max-width: 900px)': {
            mb: 3,
        },
    },
    countryInput: {
        width: 'auto',
        minWidth: '200px',
        maxWidth: '100%',
    },
    passInput: {
        mt: 0,
        mb: '0.4rem',
    },
    confirmPassInput: {
        mt: '2rem',
    },
    countryLabel: {
        mt: '-0.4rem',
    },
    button: {
        mt: 0, // 5
        mb: 1,
    },
    link: {
        textAlign: 'center',
    },
    errorForm: {
        position: 'absolute',
        left: 0,
        top: '2.8rem',
        color: '#d20000',
        fontFamily: 'Arial',
        fontSize: '0.6rem',
    },
    errorName: {
        bottom: 3,
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
    linkSignIn: {
        m: '0 auto',
    },
});
