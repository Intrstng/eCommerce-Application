import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from 'app/store';
import './index.scss';
import { router } from './common/routes/Route';
import { AuthProvider } from './features/auth/providers/AuthProvider';

const container = document.querySelector('#root');

if (container) {
    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <AuthProvider>
                <RouterProvider
                    future={{
                        v7_startTransition: true,
                    }}
                    router={router}
                />
            </AuthProvider>
        </Provider>
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
    );
}
