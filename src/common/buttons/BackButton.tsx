import { useNavigate } from 'react-router-dom';
import S from './BackButton.module.scss';
import arrowLeftSvg from '../../assets/icons/arrow-left.svg';

export const BackButton = () => {
    const navigate = useNavigate();

    const navigateHandler = () => {
        navigate(-1);
    };

    return (
        <button onClick={navigateHandler} className={S.backButton}>
            <img src={arrowLeftSvg} alt="Back arrow" className={S.arrowLeft} />
            Back
        </button>
    );
};
