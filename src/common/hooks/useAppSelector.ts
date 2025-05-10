// /* eslint-disable no-restricted-imports */
// import { useSelector } from 'react-redux';
// import type { RootState } from 'app/store';
//
// export const useAppSelector = useSelector.withTypes<RootState>();

/* eslint-disable no-restricted-imports */
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';
import type { AppRootState } from 'app/store';

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
