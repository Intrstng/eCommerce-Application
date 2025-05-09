import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    content: {
        paddingTop: 8,
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
        top: '2.8rem',
    },
    linkSignUp: {
        m: '0 auto',
    },
});
