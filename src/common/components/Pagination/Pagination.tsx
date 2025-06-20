import type { JSX } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { PATH } from '../../enums';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import type { SearchPaginationParameters } from '../../../features/catalog/api/interfaces';
import { buildSearchQuery } from '../../utils/build-search-query';
import { STYLES } from './styles.Pagination';
import { catalogTotalCountSelector } from '../../../features/catalog/model/selectors/catalogSelector';
import { ITEMS_ON_PAGE_DEFAULT } from '../../../features/catalog/api/catalogApi';

export const Pagination = () => {
    const navigate = useNavigate();
    const [searchParameters] = useSearchParams();
    const totalCount = useAppSelector(catalogTotalCountSelector);
    const pagesCount = ITEMS_ON_PAGE_DEFAULT > 0 ? Math.max(1, Math.ceil(totalCount / ITEMS_ON_PAGE_DEFAULT)) : 1;

    const searchPaginationParameters: SearchPaginationParameters = {
        material: searchParameters.get('material') ?? undefined,
        gender: searchParameters.get('gender') ?? undefined,
        search: searchParameters.get('search') ?? undefined,
        type: searchParameters.get('type') ?? undefined,
        currentPage: searchParameters.get('page') ?? '1',
        productType: searchParameters.get('productType') ?? undefined,
    };

    const currentPage = Number(searchPaginationParameters.currentPage);

    const handlePageChange = (newPage: number) => {
        const queryString = buildSearchQuery({
            ...searchPaginationParameters,
            currentPage: newPage.toString(),
        });
        navigate(`${PATH.CATALOG}${queryString ? `?${queryString}` : ''}`);
    };

    if (pagesCount === 1) {
        return null;
    }

    return (
        <Box sx={STYLES.paginationControls}>
            <Button
                onClick={() => {
                    handlePageChange(currentPage - 1);
                }}
                disabled={currentPage <= 1}
                sx={STYLES.paginationControlButton}
            >
                Prev
            </Button>

            {renderPageButtons(currentPage, pagesCount, handlePageChange)}

            <Button
                onClick={() => {
                    handlePageChange(currentPage + 1);
                }}
                disabled={currentPage >= pagesCount}
                sx={STYLES.paginationControlButton}
            >
                Next
            </Button>
        </Box>
    );
};

const renderPageButtons = (
    currentPage: number,
    pagesCount: number,
    handlePageChangeCB: (page: number) => void
): JSX.Element[] => {
    const buttons: JSX.Element[] = [];
    const maxVisiblePages = 2;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pagesCount, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
        buttons.push(
            <Button
                key={1}
                onClick={() => {
                    handlePageChangeCB(1);
                }}
                sx={currentPage === 1 ? STYLES.paginationActiveButton : STYLES.paginationPageButton}
            >
                1
            </Button>
        );
        if (startPage > 2) {
            buttons.push(<Box key="start-ellipsis">...</Box>);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        buttons.push(
            <Button
                key={i}
                onClick={() => {
                    handlePageChangeCB(i);
                }}
                sx={currentPage === i ? STYLES.paginationActiveButton : STYLES.paginationPageButton}
            >
                {i}
            </Button>
        );
    }

    if (endPage < pagesCount) {
        if (endPage < pagesCount - 1) {
            buttons.push(<Box key="end-ellipsis">...</Box>);
        }
        buttons.push(
            <Button
                key={pagesCount}
                onClick={() => {
                    handlePageChangeCB(pagesCount);
                }}
                sx={currentPage === pagesCount ? STYLES.paginationActiveButton : STYLES.paginationPageButton}
            >
                {pagesCount}
            </Button>
        );
    }

    return buttons;
};
