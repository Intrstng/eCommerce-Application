import type React from 'react';
import Button from '@mui/material/Button';
import { STYLES } from './styles.CustomButton';

interface CustomButtonProps {
    children: React.ReactNode;
    className?: string;
    isActive?: boolean;
    onClick: () => void;
    style?: React.CSSProperties;
}

export const CustomButton = ({ children, className = '', isActive, onClick, style, ...props }: CustomButtonProps) => {
    return (
        <Button
            sx={{
                ...STYLES.button,
                ...(isActive ? STYLES.activeButton : {}),
            }}
            className={className ?? ''}
            style={style ?? {}}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    );
};
