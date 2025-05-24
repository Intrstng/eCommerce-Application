import { useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';

export const CatalogPage = () => {
    const [searchParameters, setSearchParameters] = useSearchParams();

    const currentPage = searchParameters.get('page');
    const currentType = searchParameters.get('type');

    const handleEarringsClick = () => {
        setSearchParameters(previousParameters => {
            const newParameters = new URLSearchParams(previousParameters);
            newParameters.set('page', '1');
            newParameters.set('type', 'Earrings');
            return newParameters;
        });
    };

    const catalogContent =
        currentPage && currentType ? (
            <div>
                <h3>{`The catalog is filtered by type and presents page #${currentPage} of ${currentType} products`}</h3>
                <Button type="button" onClick={handleEarringsClick} variant="outlined">
                    Search Earrings in catalog
                </Button>
            </div>
        ) : (
            <h3>This catalog presents all types of products at the moment</h3>
        );

    return (
        <div>
            <h2>Catalog</h2>
            {catalogContent}
        </div>
    );
};
