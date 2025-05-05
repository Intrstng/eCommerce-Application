import type { Plugin } from 'vite';

export default function addRootDivPlugin(): Plugin {
    return {
        name: 'add-root-div-plugin',
        transformIndexHtml(html) {
            const rootDiv = `<div id="root"></div>`;

            if (html.includes(rootDiv)) {
                return html;
            }

            return html.replace(/<\/body>/, `${rootDiv}</body>`);
        },
    };
}
