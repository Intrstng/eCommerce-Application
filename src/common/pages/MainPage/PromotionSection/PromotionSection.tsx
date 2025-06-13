import { memo } from 'react';
import S from './PromotionSection.module.scss';
import imageSun from '../../../../assets/images/promotion/Sun.png';
import imageMoon from '../../../../assets/images/promotion/Moon.png';

export const PromotionSection = memo(() => {
    const handlePromoClick = (code: string) => {
        console.log(code);
    };

    return (
        <div className={S.wrapper}>
            <div className={S.cardsContainer}>
                <div className={`${S.card} ${S.card1}`}>
                    <img src={imageSun} alt="Sun" />
                    <div className={S.content}>
                        <div className={S.discount}>
                            <div className={S.value}>3%</div>
                            <div className={S.title}>total discount</div>
                        </div>
                        <div className={S.description}>Use code STARRY3 for a dazzling 3% off on all our orders!</div>
                        <div
                            className={S.promocode}
                            onClick={() => handlePromoClick('STARRY3')}
                        >
                            STARRY3
                        </div>
                    </div>
                    <img src={imageMoon} alt="Moon" />
                </div>
                <div className={`${S.card} ${S.card2}`}>
                    <div className={S.content}>
                        <div className={S.row1}>
                            <div className={S.discount}>
                                <div className={S.value}>15%</div>
                                <div className={S.title}>on rings</div>
                            </div>
                            <div className={S.dateEnd}>expires june 30</div>
                        </div>
                        <div className={S.description}>Get 15% off with the promo code LUNAR15!</div>
                        <div
                            className={S.promocode}
                            onClick={() => handlePromoClick('LUNAR15')}
                        >
                            LUNAR15
                        </div>
                    </div>
                </div>
                <div className={`${S.card} ${S.card3}`}>
                    <div className={S.content}>
                        <div className={S.row1}>
                            <div className={S.discount}>
                                <div className={S.value}>20%</div>
                                <div className={S.title}>on barrets</div>
                            </div>
                            <div className={S.dateEnd}>expires june 15</div>
                        </div>
                        <div className={S.description}>Save 20% on your next purchase using code NEBULA20!</div>
                        <div
                            className={S.promocode}
                            onClick={() => handlePromoClick('NEBULA20')}
                        >
                            NEBULA20
                        </div>
                    </div>
                </div>
                <div className={`${S.card} ${S.card4}`}>
                    <div className={S.content}>
                        <div className={S.row1}>
                            <div className={S.discount}>
                                <div className={S.value}>30%</div>
                                <div className={S.title}>on broches</div>
                            </div>
                            <div className={S.dateEnd}>expires july 30</div>
                        </div>
                        <div className={S.description}>Get 15% off with the promo code SUNNA30!</div>
                        <div
                            className={S.promocode}
                            onClick={() => handlePromoClick('SUNNA30')}
                        >
                            SUNNA30
                        </div>
                    </div>
                </div>
            </div>
            <div className={S.noticeText}>
                Promotions cannot be combined with other offers. Some exclusions may apply.
            </div>
        </div>
    );
});
