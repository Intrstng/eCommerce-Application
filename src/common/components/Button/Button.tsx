import type React from 'react';
import icons from '../../../assets/icons/icons';
import styles from './Button.module.scss';

export interface ButtonProps {
    onClick?: () => void;
    text?: string;
    size?: 'small' | 'default' | 'large';
    state?: 'default' | 'loading' | 'disabled';
    type?: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'text';
    fullWidth?: boolean;
    customColor?: string;
    iconLeft?: keyof typeof icons;
    iconRight?: keyof typeof icons;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    type = 'button',
    state = 'default',
    text,
    size = 'default',
    onClick,
    fullWidth,
    customColor,
    iconLeft,
    iconRight,
    children,
    variant = 'primary',
    className,
}) => {
    const IconLeft = iconLeft ? icons[iconLeft] : null;

    let IconRightComponent;
    if (state === 'loading') {
        // IconRightComponent = <Loader size={16} />; // Show loader, when 'loading' === true
    } else if (iconRight) {
        const ActualIconRight = icons[iconRight];
        IconRightComponent = (
            <ActualIconRight
                style={customColor && variant === 'primary' ? { fill: '#fff' } : {}}
                className={styles.icon}
            />
        );
    }

    const buttonStyles =
        customColor && variant === 'primary'
            ? {
                  backgroundColor: customColor.startsWith('--') ? `var(${customColor})` : customColor,
                  color: '#fff',
              }
            : {
                  color: customColor,
              };

    const iconStyles = customColor && variant === 'primary' ? { fill: '#fff' } : {};

    const buttonClass = customColor
        ? `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${styles.noHover} ${className ?? ''}`
        : `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className ?? ''}`;

    const isDisabled = state === 'disabled' || state === 'loading';

    return (
        <button type={type} onClick={onClick} disabled={isDisabled} style={buttonStyles} className={buttonClass}>
            {IconLeft && <IconLeft style={iconStyles} className={styles.icon} />}
            {text}

            {IconRightComponent}

            {children}
        </button>
    );
};

export default Button;
