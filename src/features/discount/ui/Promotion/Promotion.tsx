import { memo, useEffect, useState } from 'react';
import S from './Promotion.module.scss';
import imageSun from '../../../../assets/images/promotion/Sun.png';
import imageMoon from '../../../../assets/images/promotion/Moon.png';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { applyPromoCodeTC, getAvailablePromoCodesTC, setActivePromoCodeTC } from '../../model/slices/discountSlice';
import { availablePromoCodesSelector, promoCodeSelector } from '../../model/selectors/discountSelectors';
import type { Cart, DiscountCode } from '@commercetools/platform-sdk';
import type { PromoCodeCartContent } from '../../../../common/types';
import { compareDiscountsAsc } from '../../../../common/utils/compare-discounts';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { STYLES } from './styles.promotion';
import { transformToPromoCodeCartContent } from '../../../../common/utils/transform-to-promo-code-cart-content';
import { cartSelector } from '../../../cart/model/selectors/cartSelectors';

export const Promotion = memo(() => {
    const availablePromoCodes = useAppSelector<DiscountCode[]>(availablePromoCodesSelector);
    const currentPromoCode = useAppSelector<PromoCodeCartContent | null>(promoCodeSelector);
    const cart: Cart | null = useAppSelector(cartSelector);
    const dispatch = useAppDispatch();

    const [promoCodeCartContentCollection, setPromoCodeCartContentCollection] = useState<PromoCodeCartContent[]>([]);

    useEffect(() => {
        async function fetchPromoCodes() {
            if (availablePromoCodes.length > 0) {
                const collection = await Promise.all(
                    availablePromoCodes.map(promoCode => transformToPromoCodeCartContent(promoCode))
                );
                setPromoCodeCartContentCollection(collection.sort((a, b) => compareDiscountsAsc(a, b)));
            } else {
                setPromoCodeCartContentCollection([]);
            }
        }
        void fetchPromoCodes();
    }, [availablePromoCodes]);

    const handlePromoClick = (promoCode: PromoCodeCartContent) => {
        if (cart) {
            const code: string = promoCode?.key ?? promoCode?.code ?? '';
            dispatch(applyPromoCodeTC(cart, code));
        }
    };

    useEffect(() => {
        dispatch(getAvailablePromoCodesTC());
    }, [dispatch]);

    useEffect(() => {
        if (cart) {
            dispatch(setActivePromoCodeTC(cart));
        }
    }, [dispatch, cart]);

    if (promoCodeCartContentCollection.length === 0) {
        return null;
    }

    return (
        <Box className={S.wrapper}>
            <Box className={S.cardsContainer}>
                {promoCodeCartContentCollection.map((promoCodeCart, index) =>
                    index === 0 ? (
                        <Box className={`${S.card} ${S[`card${String(index + 1)}`]}`} key={promoCodeCart.id}>
                            <img src={imageSun} alt="Sun" />
                            <Box className={S.content}>
                                <Box className={S.discount}>
                                    <Box className={S.value}>{promoCodeCart.discountPercent}</Box>
                                    <Box className={S.title}>{promoCodeCart.discountText ?? 'current discount'}</Box>
                                </Box>
                                <Box className={S.description}>{promoCodeCart.description}</Box>
                                <Tooltip
                                    title={promoCodeCart.isActive ? '' : 'Promo code is expired'}
                                    placement="bottom-start"
                                    arrow
                                    disableHoverListener={promoCodeCart.isActive}
                                    slotProps={{
                                        tooltip: {
                                            sx: STYLES.expiredTooltip,
                                        },
                                    }}
                                >
                                    <span className={S.tooltipContentWrapper}>
                                        <Button
                                            sx={{
                                                ...STYLES.promocode,
                                                ...(currentPromoCode?.id === promoCodeCart.id
                                                    ? STYLES.promocodeActive
                                                    : {}),
                                            }}
                                            onClick={() => {
                                                handlePromoClick(promoCodeCart);
                                            }}
                                            disabled={!promoCodeCart.isActive}
                                        >
                                            {promoCodeCart.key ?? promoCodeCart.code}
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Box>
                            <img src={imageMoon} alt="Moon" />
                        </Box>
                    ) : (
                        <Box className={`${S.card} ${S[`card${String(index + 1)}`]}`} key={promoCodeCart.id}>
                            <Box className={S.content}>
                                <Box className={S.row1}>
                                    <Box className={S.discount}>
                                        <Box className={S.value}>{promoCodeCart.discountPercent}</Box>
                                        <Box className={S.title}>{promoCodeCart.discountText}</Box>
                                    </Box>
                                    <Box className={S.dateEnd}>
                                        {promoCodeCart.isActive ? 'expires' : 'expired'} {promoCodeCart.validUntil}
                                    </Box>
                                </Box>
                                <Box className={S.description}>{promoCodeCart.description}</Box>
                                <Tooltip
                                    title={promoCodeCart.isActive ? '' : 'Promo code is expired'}
                                    placement="bottom-start"
                                    arrow
                                    disableHoverListener={promoCodeCart.isActive}
                                    slotProps={{
                                        tooltip: {
                                            sx: STYLES.expiredTooltip,
                                        },
                                    }}
                                >
                                    <span>
                                        <Button
                                            sx={{
                                                ...STYLES.promocode,
                                                ...(currentPromoCode?.id === promoCodeCart.id
                                                    ? STYLES.promocodeActive
                                                    : {}),
                                            }}
                                            onClick={() => {
                                                handlePromoClick(promoCodeCart);
                                            }}
                                            disabled={!promoCodeCart.isActive}
                                        >
                                            {promoCodeCart.key ?? promoCodeCart.code}
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Box>
                        </Box>
                    )
                )}
            </Box>
            <Box className={S.noticeText}>
                Promotions cannot be combined with other offers. Some exclusions may apply.
            </Box>
        </Box>
    );
});
