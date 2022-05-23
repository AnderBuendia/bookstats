import { render } from '@testing-library/react';
import HomePage from '@Pages/index';
import { useSession } from 'next-auth/react';

describe('Should render the app without crashing', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    render(<HomePage />);
  });

  it('Should show Sign in with GitHub button title', () => {
    const { getByText } = render(<HomePage />);

    expect(getByText(/Sign in with GitHub/i)).toBeInTheDocument();
  });

  it('Should show Go to your books button title', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'testUser',
        },
      },
      status: 'authenticated',
    });

    const { getByText } = render(<HomePage />);

    expect(getByText(/Go to your books/i)).toBeInTheDocument();
  });
});
