import { useTranslation } from 'react-i18next';
import { PATH } from '../../enums';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import errorAnimation from '../../../assets/lottie-animation-data/error404_animation.lottie?url';
import S from './Error404.module.scss';
import Button from '@mui/material/Button';

export const Error404 = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(PATH.MAIN);
    };

    return (
        <div className={S.errorContent}>
            <DotLottieReact className={S.errorLottie} src={errorAnimation} loop autoplay />
            <Button variant="contained" onClick={handleGoHome} className={S.toHomeLink}>
                {t('error404.goBack')}
            </Button>
        </div>
    );
};
