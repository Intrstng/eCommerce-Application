import { memo, useEffect, useState } from 'react';
import S from './PromotionSection.module.scss';
import imageSun from '../../../../assets/images/promotion/Sun.png';
import imageMoon from '../../../../assets/images/promotion/Moon.png';

export const PromotionSection = memo(() => {
    return (
        <div className={S.wrapper}>
            <div className={S.cardsContainer}>
                <div className={`${S.card} ${S.card1}`}>
                    <img src={imageSun} alt="Sun" />
                    <div className="content">Card 1</div>
                    <img src={imageMoon} alt="Moon" />
                </div>
                <div className={`${S.card} ${S.card2}`}>Card 2</div>
                <div className={`${S.card} ${S.card3}`}>Card 3</div>
                <div className={`${S.card} ${S.card4}`}>Card 4</div></div>
            <div className={S.noticeText}>
                Promotions cannot be combined with other offers. Some exclusions may apply.
            </div>
        </div>
    );
});
