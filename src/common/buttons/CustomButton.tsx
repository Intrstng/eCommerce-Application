import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { STYLES } from './styles.CustomButton';

export const CustomButton = ({ children, className = '', ...props }: ButtonProps) => {
    return (
        <Button variant="contained" sx={STYLES.button} className={className || ''} {...props}>
            {children}
        </Button>
    );
};
