// import { useTranslation } from 'react-i18next';
// import { useSearchParams } from 'react-router-dom';
// import Button from '@mui/material/Button';
//
// export const CatalogPage = () => {
//     const { t } = useTranslation();
//     const [searchParameters, setSearchParameters] = useSearchParams();
//
//     const currentPage = searchParameters.get('page');
//     const currentType = searchParameters.get('type');
//
//     const handleEarringsClick = () => {
//         setSearchParameters(previousParameters => {
//             const newParameters = new URLSearchParams(previousParameters);
//             newParameters.set('page', '1');
//             newParameters.set('type', 'Earrings');
//             return newParameters;
//         });
//     };
//
//     const catalogContent =
//         currentPage && currentType ? (
//             <div>
//                 <h3>{`The catalog is filtered by type and presents page #${currentPage} of ${currentType} products`}</h3>
//                 <Button type="button" onClick={handleEarringsClick} variant="outlined">
//                     {t('catalogPage.button')}
//                 </Button>
//             </div>
//         ) : (
//             <h3>{t('catalogPage.description')}</h3>
//         );
//
//     return (
//         <div>
//             <h2>{t('catalogPage.title')}</h2>
//             {catalogContent}
//         </div>
//     );
// };

import { Catalog } from '../../../features/catalog/ui/Catalog';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const CatalogPage = () => {
    return (
        <>
            <BreadCrumbs />
            <Catalog />
        </>
    );
};
