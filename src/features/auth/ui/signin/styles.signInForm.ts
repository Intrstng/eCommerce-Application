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
        backgroundColor: '#d20000',
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
