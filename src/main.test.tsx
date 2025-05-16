import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRoot } from 'react-dom/client';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn().mockReturnValue({
    render: vi.fn(),
  }),
}));

vi.mock('react-redux', () => ({
  Provider: vi.fn(({ children }) => children),
}));

vi.mock('react-router-dom', () => ({
  RouterProvider: vi.fn(({ router }) => <div>Mock Router</div>),
}));

vi.mock('./app/store', () => ({
  store: {},
}));

vi.mock('./common/routes/Route', () => ({
  router: {},
}));

describe('Application Entry Point', () => {
  let originalQuerySelector: typeof document.querySelector;
  let consoleErrorSpy: any;

  beforeEach(() => {
    originalQuerySelector = document.querySelector;
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    document.querySelector = originalQuerySelector;
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  it('should render the app when root element exists', async () => {
    document.querySelector = vi.fn().mockReturnValue(document.createElement('div'));
    await import('./main');

    expect(createRoot).toHaveBeenCalled();
  });
});