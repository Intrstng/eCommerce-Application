import type { SearchPaginationParameters } from '../../features/catalog/api/interfaces';

export const buildSearchQuery = (parameters: SearchPaginationParameters): string => {
    const query = new URLSearchParams();

    if (parameters.material) query.set('material', parameters.material);
    if (parameters.gender) query.set('gender', parameters.gender);
    if (parameters.search) query.set('search', parameters.search);
    if (parameters.type) query.set('type', parameters.type);
    if (parameters.productType) query.set('productType', parameters.productType);
    if (parameters.currentPage) query.set('page', parameters.currentPage);

    return query.toString();
};
