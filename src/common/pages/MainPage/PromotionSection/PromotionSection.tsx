import { memo } from 'react';
import S from './PromotionSection.module.scss';
import imageSun from '../../../../assets/images/promotion/Sun.png';
import imageMoon from '../../../../assets/images/promotion/Moon.png';
import Box from '@mui/material/Box';

export const PromotionSection = memo(() => {
    const handlePromoClick = (code: string) => {
        console.log(code);
    };

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
                            onClick={() => handlePromoClick('STARRY3')}
                        >
                            STARRY3
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
                            onClick={() => handlePromoClick('LUNAR15')}
                        >
                            LUNAR15
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
                            onClick={() => handlePromoClick('NEBULA20')}
                        >
                            NEBULA20
                        </Box>
                    </Box>
                </Box>
                <Box className={`${S.card} ${S.card4}`}>
                    <Box className={S.content}>
                        <Box className={S.row1}>
                            <Box className={S.discount}>
                                <Box className={S.value}>30%</Box>
                                <Box className={S.title}>on broches</Box>
                            </Box>
                            <Box className={S.dateEnd}>expires july 30</Box>
                        </Box>
                        <Box className={S.description}>Get 15% off with the promo code SUNNA30!</Box>
                        <Box
                            className={S.promocode}
                            onClick={() => handlePromoClick('SUNNA30')}
                        >
                            SUNNA30
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
