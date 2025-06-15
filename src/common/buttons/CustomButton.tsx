import type React from 'react';
import Button from '@mui/material/Button';
import { STYLES } from './styles.CustomButton';

interface CustomButtonProps {
    children: React.ReactNode;
    className?: string;
    isActive?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
}

export const CustomButton = ({
    children,
    className = '',
    isActive,
    onClick,
    style,
    type = 'button',
    disabled = false,
    ...props
}: CustomButtonProps) => {
    const handleOnClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <Button
            sx={{
                ...STYLES.button,
                ...(isActive ? STYLES.activeButton : {}),
            }}
            className={className ?? ''}
            style={style ?? {}}
            onClick={handleOnClick}
            type={type ?? 'button'}
            disabled={!!disabled}
            {...props}
        >
            {children}
        </Button>
    );
};
