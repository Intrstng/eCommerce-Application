import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi, expect } from 'vitest';
import type { Mock } from 'vitest';

expect.extend(matchers);

beforeAll(() => {
    vi.mock('react-router-dom', async importOriginal => {
        const actual = await importOriginal<typeof import('react-router-dom')>();
        return {
            ...actual,
            useNavigate: vi.fn(),
            useLocation: vi.fn(() => ({ pathname: '/', search: '', hash: '', state: null })),
            useParams: vi.fn(() => ({})),
            useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
            useRouteMatch: vi.fn(),
        };
    });

    vi.mock('@mui/material', async importOriginal => {
        const actual = await importOriginal<typeof import('@mui/material')>();
        return {
            ...actual,
        };
    });
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.resetAllMocks();
});

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

window.scrollTo = vi.fn() as Mock;
