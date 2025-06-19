import Button from '@mui/material/Button';
import { STYLES } from './styles.CustomButton';
import type { CustomButtonProps } from './interfaces';

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
