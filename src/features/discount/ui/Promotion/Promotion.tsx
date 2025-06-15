import { memo, useEffect } from 'react';
import S from './Promotion.module.scss';
import imageSun from '../../../../assets/images/promotion/Sun.png';
import imageMoon from '../../../../assets/images/promotion/Moon.png';
import Box from '@mui/material/Box';
import { PromoCodes } from '../../../../common/enums';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { successNotifyMessage } from '../../../../common/utils/notify-message';
import { discountActions, getAvailablePromoCodesTC } from '../../model/slices/discountSlice';
import { availablePromoCodesSelector } from '../../model/selectors/discountSelectors';
import type { DiscountCode } from '@commercetools/platform-sdk';

export const Promotion = memo(() => {
    const availablePromoCodes = useAppSelector<DiscountCode[]>(availablePromoCodesSelector);
    const dispatch = useAppDispatch();

    console.log(availablePromoCodes);

    const handlePromoClick = (code: PromoCodes) => {
        dispatch(discountActions.setPromoCode({ promoCode: code }));
        successNotifyMessage(`Promo code ${code} applied to your cart successfully!`);
    };

    useEffect(() => {
        dispatch(getAvailablePromoCodesTC());
    }, [dispatch]);

    return (
        <Box className={S.wrapper}>
            <Box className={S.cardsContainer}>
                <Box className={`${S.card} ${S.card1}`}>
                    <img src={imageSun} alt="Sun" />
                    <Box className={S.content}>
                        <Box className={S.discount}>
                            <Box className={S.value}>3%</Box>
                            <Box className={S.title}>total discount</Box>
                        </Box>
                        <Box className={S.description}>Use code STARRY3 for a dazzling 3% off on all our orders!</Box>
                        <Box
                            className={S.promocode}
                            onClick={() => {
                                handlePromoClick(PromoCodes.STARRY);
                            }}
                        >
                            {PromoCodes.STARRY}
                        </Box>
                    </Box>
                    <img src={imageMoon} alt="Moon" />
                </Box>
                <Box className={`${S.card} ${S.card2}`}>
                    <Box className={S.content}>
                        <Box className={S.row1}>
                            <Box className={S.discount}>
                                <Box className={S.value}>15%</Box>
                                <Box className={S.title}>on rings</Box>
                            </Box>
                            <Box className={S.dateEnd}>expires june 30</Box>
                        </Box>
                        <Box className={S.description}>Get 15% off with the promo code LUNAR15!</Box>
                        <Box
                            className={S.promocode}
                            onClick={() => {
                                handlePromoClick(PromoCodes.LUNAR);
                            }}
                        >
                            {PromoCodes.LUNAR}
                        </Box>
                    </Box>
                </Box>
                <Box className={`${S.card} ${S.card3}`}>
                    <Box className={S.content}>
                        <Box className={S.row1}>
                            <Box className={S.discount}>
                                <Box className={S.value}>20%</Box>
                                <Box className={S.title}>on barrets</Box>
                            </Box>
                            <Box className={S.dateEnd}>expires june 15</Box>
                        </Box>
                        <Box className={S.description}>Save 20% on your next purchase using code NEBULA20!</Box>
                        <Box
                            className={S.promocode}
                            onClick={() => {
                                handlePromoClick(PromoCodes.NEBULA);
                            }}
                        >
                            {PromoCodes.NEBULA}
                        </Box>
                    </Box>
                </Box>
                <Box className={`${S.card} ${S.card4}`}>
                    <Box className={S.content}>
                        <Box className={S.row1}>
                            <Box className={S.discount}>
                                <Box className={S.value}>30%</Box>
                                <Box className={S.title}>on brooches</Box>
                            </Box>
                            <Box className={S.dateEnd}>expires july 30</Box>
                        </Box>
                        <Box className={S.description}>Get 30% off with the promo code SUNNA30!</Box>
                        <Box
                            className={S.promocode}
                            onClick={() => {
                                handlePromoClick(PromoCodes.SUNNA);
                            }}
                        >
                            {PromoCodes.SUNNA}
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={S.noticeText}>
                Promotions cannot be combined with other offers. Some exclusions may apply.
            </Box>
        </Box>
    );
});
