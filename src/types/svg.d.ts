declare module '*.svg?react' {
    import type * as React from 'react';
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    export { ReactComponent };
    export default ReactComponent;
}
