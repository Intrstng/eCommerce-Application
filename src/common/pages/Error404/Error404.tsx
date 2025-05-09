import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import errorAnimation from '../../../assets/lottie-animation-data/error404_animation.lottie?url';
import S from './Error404.module.scss';

export const Error404 = () => {
    return (
        <div className={S.errorContent}>
            <DotLottieReact className={S.errorLottie} src={errorAnimation} loop autoplay />

            <NavLink className="linkLikeButton" to={PATH.PAGE_ROOT}>
                Go to home page
            </NavLink>
        </div>
    );
};
