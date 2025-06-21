import Button from '@mui/material/Button';
import { STYLES } from './styles.CustomButton';
import type { CustomButtonProps } from './interfaces';
import { FC } from 'react';

export const CustomButton: FC<CustomButtonProps> = ({...props}) => (
        <Button sx={{
            ...STYLES.button,
            ...(props.isActive ? STYLES.activeButton : {}),
        }} {...props} />
);
