import type { CatalogProduct } from '../api/catalogApi.interfaces';
import type { Attribute } from '@commercetools/platform-sdk';
import { isLocalizedEnumValue, isLocalizedString, isPlainEnumValue } from '../../../common/utils/type-guards';

export const getAttributeValue = (
    variant: CatalogProduct['variants'][0],
    attributeName: string
): string | undefined => {
    const attribute = variant.attributes?.find(
        (attribute_): attribute_ is Attribute & { name: string } => attribute_.name === attributeName
    );

    if (!attribute || attribute.value === null || attribute.value === undefined) {
        return undefined;
    }

    const value: unknown = attribute.value;
    if (typeof value === 'string') {
        return value;
    }

    if (isLocalizedString(value)) {
        return value.en;
    }

    if (isPlainEnumValue(value)) {
        return value.key;
    }

    if (isLocalizedEnumValue(value)) {
        return value.label.en;
    }

    return String(value);
};
