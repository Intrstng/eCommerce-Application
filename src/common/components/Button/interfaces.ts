import type { ReactNode } from 'react';
import type icons from '../../../assets/icons/icons';

export interface ButtonProps {
    onClick?: () => void;
    text?: string;
    size?: 'small' | 'default' | 'large';
    state?: 'default' | 'loading' | 'disabled';
    type?: 'button' | 'submit' | 'reset';
    children?: ReactNode;
    variant?: 'primary' | 'secondary' | 'text';
    fullWidth?: boolean;
    customColor?: string;
    iconLeft?: keyof typeof icons;
    iconRight?: keyof typeof icons;
    className?: string;
}
