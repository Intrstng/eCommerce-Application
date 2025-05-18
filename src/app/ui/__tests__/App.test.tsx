import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { beforeEach, afterEach, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { createMemoryRouter } from 'react-router-dom';
import { router } from '../../../common/routes/Route';
import { store } from '../../store';
import { PATH } from '../../../common/enums';

const MAIN_PAGE = 'Main Page'; // ToDo: refactor when the main page will be filled with content

describe('Application Rendering', () => {
    let mockRoot: HTMLDivElement;

    beforeEach(() => {
        mockRoot = document.createElement('div');
        mockRoot.id = 'root';
        document.body.appendChild(mockRoot);
    });

    afterEach(() => {
        if (document.body.contains(mockRoot)) {
            document.body.removeChild(mockRoot);
        }
    });

    it('should render the application without errors', async () => {
        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(MAIN_PAGE)).toBeInTheDocument();
        });
    });

    it('should render a specific route', async () => {
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
