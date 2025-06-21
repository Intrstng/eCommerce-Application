import { genStyles } from '../../../../common/utils/generate-styles';

export const STYLES = genStyles({
    promocode: {
        fontFamily: 'Jost, sans-serif',
        fontSize: '24px',
        fontWeight: '400',
        lineHeight: '136%',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '244px',
        width: '100%',
        height: '40px',
        padding: '0 12px',
        borderRadius: '4px',
        color: '#f4f4f2',
        background: 'rgba(255, 255, 255, 0.1)',
        transition: 'all 0.25s ease-in-out',

        '&:disabled': {
            color: 'rgba(244, 244, 242, 0.45)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid #65635f',
        },

        '&:hover': {
            color: '#e3d080',
            background: '#65635f',
        },
    },
    promocodeActive: {
        color: '#e3d080',
        background: '#65635f',
    },
    expiredTooltip: {
        '& .MuiTooltip-arrow': {
            left: '-1rem !important',
        },
    },
});
