import { genStyles } from '../../../../common/utils/generate-styles';

export const STYLES = genStyles({
    content: {
        paddingTop: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontFamily: 'Cormorant, serif',
        color: '#65635f',
        fontWeight: '500',
        fontSize: '2.5rem',
        margin: 0,
    },
    logo: {
        m: 1,
        backgroundColor: '#000000',
    },
    emailInput: {
        mb: 4,
        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0px 1000px rgba(250, 237, 202, 0.4) inset',
            WebkitTextFillColor: '#205781',
        },
    },
    button: {
        mt: 4.5,
        mb: 1,
        fontSize: '0.875rem',
        fontWeight: '400',
        fontFamily: 'Jost, sans-serif',
        letterSpacing: '1px',
        color: '#65635f',
        border: '1px solid #161412',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        transition: '0.3s all ease-in-out',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#161412',
            color: '#fff',
            boxShadow: 'none',
        },
    },
    link: {
        textAlign: 'center',
    },
    errorForm: {
        position: 'absolute',
        left: 0,
        color: '#d20000',
        fontFamily: 'Arial',
        fontSize: '0.6rem',
    },
    errorMail: {
        bottom: '0.8rem',
    },
    errorPass: {
        top: '3.3rem',
    },
    linkSignUp: {
        m: '0 auto',
    },
});
