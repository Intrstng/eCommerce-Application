import type { FC } from 'react';
import S from './CatalogFilterSelect.module.scss';
import Box from '@mui/material/Box';
import type { CatalogFilterSelectProps } from './interfaces';

export const CatalogFilterSelect: FC<CatalogFilterSelectProps> = ({
    value,
    options,
    placeholder,
    onChange,
    disabled = false,
}) => (
    <Box className={S.filterBlock}>
        <select
            value={value}
            onChange={event => {
                onChange(event.target.value);
            }}
            className={S.filterSelect}
            disabled={disabled}
        >
            <option value="">{placeholder}</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option.toUpperCase()}
                </option>
            ))}
        </select>
    </Box>
);
