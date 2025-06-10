import { genStyles } from '../../utils/generate-styles';

export const STYLES = genStyles({
    catalogContent: {
        width: 'calc(100% - 2rem)', // padding 1rem x 2 (see next line)
        padding: '0 1rem',
        maxWidth: '1180px',
        margin: '0 auto',
    },
});
