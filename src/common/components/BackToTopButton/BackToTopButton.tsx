import { useState, useEffect } from 'react';
import S from './BackToTopButton.module.scss';
import BackToTopIcon from '../../../assets/icons/back-to-top.svg';

const SCROLL_THRESHOLD = 300;
const MOBILE_BREAKPOINT = 695;

export const BackToTopButton = () => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const onScrollOrResize = () => {
            const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
            setVisible(isMobile && window.scrollY > SCROLL_THRESHOLD);
        };
        window.addEventListener('scroll', onScrollOrResize);
        window.addEventListener('resize', onScrollOrResize);
        onScrollOrResize();
        return () => {
            window.removeEventListener('scroll', onScrollOrResize);
            window.removeEventListener('resize', onScrollOrResize);
        };
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return visible ? (
        <button className={S.backToTop} onClick={handleClick} aria-label="Back to top">
            <img src={BackToTopIcon} alt="Back to top" />
        </button>
    ) : null;
};
