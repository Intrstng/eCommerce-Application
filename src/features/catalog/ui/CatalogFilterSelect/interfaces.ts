export interface CatalogFilterSelectProps {
    value: string;
    options: string[];
    placeholder: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}
