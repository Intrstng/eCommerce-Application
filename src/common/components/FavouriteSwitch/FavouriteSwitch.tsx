import type { FC } from 'react';
import favoritesOnSvg from '../../../assets/icons/favorites-on.svg';
import favoritesOffSvg from '../../../assets/icons/favorites-off.svg';

type FavouriteSwitchProps = {
    id: string;
    isFavourite: boolean;
    onToggle: (id: string) => void;
};

export const FavouriteSwitch: FC<FavouriteSwitchProps> = ({ id, isFavourite, onToggle }) => {
    const handleToggle = (): void => {
        onToggle(id);
    };

    return (
        <img
            src={isFavourite ? favoritesOnSvg : favoritesOffSvg}
            alt="Favourite switch"
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
        />
    );
};
