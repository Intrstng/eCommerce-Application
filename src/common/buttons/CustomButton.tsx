import type React from 'react';
import Button from '@mui/material/Button';
import { STYLES } from './styles.CustomButton';

interface CustomButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick: () => void;
    style?: React.CSSProperties;
}

export const CustomButton = ({ children, className = '', onClick, style, ...props }: CustomButtonProps) => {
    return (
        <Button sx={STYLES.button} className={className ?? ''} style={style ?? {}} onClick={onClick} {...props}>
            {children}
        </Button>
    );
};
