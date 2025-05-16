import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Error404 } from '../Error404/Error404';
import S from '../Error404/Error404.module.scss';

const mockNavigate = vi.fn();
const BACK_TO_HOME = 'Go to home page';

vi.mock('react-router-dom', async importOriginal => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Error404 Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders the error animation and button', () => {
        render(
            <MemoryRouter>
                <Error404 />
            </MemoryRouter>
        );

        const lottieAnimation = screen.getByTestId('error-lottie');
        expect(lottieAnimation).toBeInTheDocument();

        const goHomeButton = screen.getByText(BACK_TO_HOME);
        expect(goHomeButton).toBeInTheDocument();
    });

    it('navigates to the home page when the button is clicked', () => {
        const PATH = { MAIN: '/main' };
        vi.mock('../../../common/common.enums.ts', () => ({ PATH }));

        render(
            <MemoryRouter>
                <Error404 />
            </MemoryRouter>
        );

        const goHomeButton = screen.getByText(BACK_TO_HOME);
        fireEvent.click(goHomeButton);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(PATH.MAIN);
    });

    it('renders with correct class names', () => {
        render(
            <MemoryRouter>
                <Error404 />
            </MemoryRouter>
        );

        const goHomeButton = screen.getByText(BACK_TO_HOME);
        expect(goHomeButton).toHaveClass(S.toHomeLink);
    });
});
