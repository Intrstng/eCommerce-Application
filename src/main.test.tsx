// import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
// import { createRoot } from 'react-dom/client';
//
// vi.mock('react-dom/client', () => ({
//     createRoot: vi.fn().mockReturnValue({
//         render: vi.fn(),
//     }),
// }));
//
// vi.mock('react-redux', () => ({
//     Provider: vi.fn(({ children }) => children),
//     useDispatch: vi.fn(),
//     useSelector: vi.fn(),
// }));
//
// vi.mock('react-router-dom', () => ({
//     RouterProvider: vi.fn(({ router }) => <div>Mock Router</div>),
// }));
//
// vi.mock('./app/store', () => ({
//     store: {},
// }));
//
// vi.mock('./common/routes/Route', () => ({
//     router: {},
// }));
//
// describe('Application Entry Point', () => {
//     let originalQuerySelector: typeof document.querySelector;
//     let consoleErrorSpy: any;
//
//     beforeEach(() => {
//         originalQuerySelector = document.querySelector;
//         consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
//     });
//
//     afterEach(() => {
//         document.querySelector = originalQuerySelector;
//         consoleErrorSpy.mockRestore();
//         vi.clearAllMocks();
//     });
//
//     it('should render the app when root element exists', async () => {
//         document.querySelector = vi.fn().mockReturnValue(document.createElement('div'));
//         await import('./main');
//
//         expect(createRoot).toHaveBeenCalled();
//     });
// });

import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { App } from './app/ui/App';
import { store } from './app/store';
import { ErrorBoundary } from './common/components/ErrorBoundary/ErrorBoundary';

describe('Main Entry Point', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the application correctly', () => {
        const container = document.querySelector('#root');
        const root = createRoot(container!);

        act(() => {
            root.render(
                <Provider store={store}>
                    <MemoryRouter>
                        <ErrorBoundary>
                            <App />
                        </ErrorBoundary>
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(container).toBeInTheDocument();
        expect(container.firstChild).toBeTruthy();
    });
});
