import { describe, expect, it, vi, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';


vi.mock('../../../assets/icons/icons', () => ({
    default: {
        arrowRight: vi.fn(() => <svg data-testid="arrow-right-icon" />),
        arrowLeft: vi.fn(() => <svg data-testid="arrow-left-icon" />),
    },
}));

describe('Button Component', () => {
    const mockClick = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders with default props', () => {
        render(<Button text="Click me" />);
        const button = screen.getByRole('button', { name: 'Click me' });

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'button');
        expect(button).not.toBeDisabled();
    });

    it('handles click events', () => {
        render(<Button text="Click me" onClick={mockClick} />);
        const button = screen.getByRole('button', { name: 'Click me' });

        fireEvent.click(button);
        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('renders with left icon', () => {
        render(<Button text="Back" iconLeft="arrowLeft" />);

        expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Back' })).toContainElement(
            screen.getByTestId('arrow-left-icon')
        );
    });

    it('renders with right icon', () => {
        render(<Button text="Next" iconRight="arrowRight" />);

        expect(screen.getByTestId('arrow-right-icon')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Next' })).toContainElement(
            screen.getByTestId('arrow-right-icon')
        );
    });

    it('is disabled when state is "disabled"', () => {
        render(<Button text="Disabled" state="disabled" />);
        expect(screen.getByRole('button', { name: 'Disabled' })).toBeDisabled();
    });

    it('applies custom color styles for primary variant', () => {
        render(<Button text="Colored" variant="primary" customColor="#ff0000" />);
        const button = screen.getByRole('button', { name: 'Colored' });

        expect(button).toHaveStyle({
            backgroundColor: '#ff0000',
            color: '#fff'
        });
    });

    it('merges custom className with base classes', () => {
        render(<Button text="Custom" className="extra-class" />);
        const button = screen.getByRole('button', { name: 'Custom' });

        expect(button).toHaveClass('extra-class');
    });

    it('renders children when provided', () => {
        render(
            <Button>
                <span data-testid="child-element">Child Content</span>
            </Button>
        );

        expect(screen.getByTestId('child-element')).toBeInTheDocument();
    });
});