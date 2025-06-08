import S from './CatalogFilterSelect.module.scss';
import Box from '@mui/material/Box';

export const CatalogFilterSelect = ({
    value,
    options,
    placeholder,
    onChange,
    disabled = false,
}: {
    value: string;
    options: string[];
    placeholder: string;
    onChange: (value: string) => void;
    disabled?: boolean;
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
