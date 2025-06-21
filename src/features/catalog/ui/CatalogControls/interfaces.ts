import type { ProductType } from '../../api/interfaces';

export interface CatalogControlsProps {
    hasActiveFilters: boolean;
    updateParameterCB: (key: string, value: string) => void;
    handleClearFiltersCB: () => void;
    materials: string[];
    genders: string[];
    productTypes: ProductType[];
    hasProducts: boolean;
}
