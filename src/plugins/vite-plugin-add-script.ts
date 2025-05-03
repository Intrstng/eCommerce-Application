import type { Plugin } from 'vite';

export default function addScriptPlugin(): Plugin {
    return {
        name: 'add-script-plugin',
        transformIndexHtml(html) {
            const scriptTag = `<script type="module" src="/src/main.tsx"></script>`;
            return html.replace(/<\/body>/, `${scriptTag}</body>`);
        },
    };
}
