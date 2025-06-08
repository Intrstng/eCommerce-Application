import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { router } from '../../../common/routes/Route';
import { store } from '../../store';
import { PATH } from '../../../common/enums';

const MAIN_PAGE = 'Main Page';

describe('Application Rendering', () => {
    let mockRoot: HTMLDivElement;

    beforeEach(() => {
        mockRoot = document.createElement('div');
        mockRoot.id = 'root';
        document.body.appendChild(mockRoot);
        vi.resetAllMocks();
    });

    afterAll(() => {
        // Cleanup after all tests
        const root = document.getElementById('root');
        if (root) document.body.removeChild(root);
    });

    it.skip('test mock', async () => {
        await waitFor(() => {
            expect(true).toBe(true);
        });
    });

    it.skip('should render the application without errors', async () => {
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(MAIN_PAGE)).toBeInTheDocument();
        });
    });

    it.skip('should render a specific route', async () => {
        const memoryRouter = createMemoryRouter(
            [
                {
                    path: PATH.PAGE_ROOT,
                    element: <div>{MAIN_PAGE}</div>,
                },
            ],
            {
                initialEntries: [PATH.PAGE_ROOT],
                initialIndex: 0,
            }
        );

        render(
            <Provider store={store}>
                <RouterProvider router={memoryRouter} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(MAIN_PAGE)).toBeInTheDocument();
        });
    });
});
