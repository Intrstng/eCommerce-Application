import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from 'app/ui/App';
import { store } from 'app/store';
import './index.scss';

const container = document.querySelector('#root');

if (container) {
    const root = createRoot(container);

    root.render(
        <Provider store={store}>
            <App />
        </Provider>
    );
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
    );
}
