import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { CustomButton } from '../CustomButton';

vi.mock('@mui/material/Button', () => ({
  default: vi.fn((props) => (
      <button
          {...props}
          data-testid="mui-button"
          style={props.sx}
      >
        {props.children}
      </button>
  )),
}));

describe('CustomButton Component', () => {
  const mockClick = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with children', () => {
    const { getByText } = render(<CustomButton>Click Me</CustomButton>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<CustomButton onClick={handleClick}>Click Me</CustomButton>);

    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders disabled button when disabled prop is true', () => {
    const { getByText } = render(<CustomButton disabled>Click Me</CustomButton>);
    const button = getByText('Click Me');

    expect(button).toBeDisabled();
  });

  it('renders with custom className', () => {
    const { getByText } = render(<CustomButton className="custom-class">Click Me</CustomButton>);
    const button = getByText('Click Me');

    expect(button).toHaveClass('custom-class');
  });
});
