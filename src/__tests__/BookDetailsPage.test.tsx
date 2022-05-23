import { render } from '@testing-library/react';
import BookPage from '@Pages/book/[id]';
import { useSession } from 'next-auth/react';
import { useFindBookUseCase } from '@Application/book/find-book.use-case';
import { mockedUserBooks } from '../__mocks__/user-books.mock';
import router from 'next/router';

const mockedUseFindBook = useFindBookUseCase as jest.Mock<any>;
jest.mock('@Application/book/find-book.use-case');

describe('Should render the BooksPage without crashing', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: 'testUser',
        },
      },
      status: 'authenticated',
    });

    mockedUseFindBook.mockImplementation(() => ({ isLoading: true }));
    router.query = { id: mockedUserBooks[0].id };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    render(<BookPage />);
  });

  it('Should show loading spinner element', () => {
    const { getByTestId } = render(<BookPage />);

    expect(getByTestId('load-spinner')).toBeVisible();
  });

  describe('Should render book data in details page', () => {
    beforeEach(() => {
      mockedUseFindBook.mockImplementation(() => ({
        isLoading: false,
        data: mockedUserBooks[0],
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Displays data from find book use case', () => {
      const { getByText } = render(<BookPage />);

      expect(getByText(/Title Test/i)).toBeVisible();
    });
  });
});
