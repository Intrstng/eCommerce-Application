/* eslint-disable no-restricted-imports */
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import type { AppRootState } from 'app/store';

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
