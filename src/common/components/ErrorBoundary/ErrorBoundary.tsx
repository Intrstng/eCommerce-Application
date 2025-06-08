import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

export type ErrorBoundaryProps = {
    children: ReactNode;
};

export type ErrorBoundaryState = {
    hasError: boolean;
    errorMessage: string | null;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: null,
        };
    }

    public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            errorMessage: error.message,
        };
    }

    public static componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught in ErrorBoundary:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
