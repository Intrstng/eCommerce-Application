import type React from 'react';

export interface CustomButtonProps {
    children: React.ReactNode;
    className?: string;
    isActive?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: 'submit' | 'reset' | 'button';
    disabled?: boolean;
}
