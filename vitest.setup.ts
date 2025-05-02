import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
import { beforeAll, vi } from 'vitest';

expect.extend(matchers);

beforeAll(() => {
    vi.mock('react-router-dom', async () => {
        const actual = await vi.importActual('react-router-dom');
        return {
            ...actual,
            useNavigate: vi.fn(),
            useLocation: vi.fn(),
            useParams: vi.fn(),
            useRouteMatch: vi.fn(),
        };
    });
});

afterEach(() => {
    cleanup();
});
