import S from './ProfilePage.module.scss';

export const ProfilePage = () => {
    return (
        <div className={S.profileContent}>
            <h2>Profile Page</h2>
            <div>
                <p>Here will be rendered user`s profile data</p>
            </div>
        </div>
    );
};
