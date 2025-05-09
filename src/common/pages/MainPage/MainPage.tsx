import S from './MainPage.module.scss';
import { PATH } from '../../enums';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { errorNotifyMessage, successNotifyMessage, warningNotifyMessage } from '../../utils/notify-message';

const notifySuccess = () => {
    // Will be removed later
    successNotifyMessage('Some success toastify message');
};
const notifyWarning = () => {
    // Will be removed later
    warningNotifyMessage('Some warning toastify message');
};
const notifyError = () => {
    // Will be removed later
    errorNotifyMessage('Some error toastify message');
};

export const MainPage = () => {
    return (
        <div className={S.mainContent}>
            <h2>Main Page</h2>
            <div className={S.mainArticles}>
                <p>Here will be rendered all articles of the main page</p>
            </div>
            <div className={S.mainNav}>
                <NavLink to={PATH.CATALOG}>Catalog</NavLink>
                <NavLink to={PATH.ARTICLES}>Blog Articles</NavLink>
            </div>
            <div className={S.mainControls}>
                <p>Example messages:</p>
                <Button onClick={notifySuccess}>Show Success Message</Button>
                <Button onClick={notifyWarning}>Show Warning Message</Button>
                <Button onClick={notifyError}>Show Error Message</Button>
            </div>
        </div>
    );
};
