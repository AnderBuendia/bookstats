import { render } from '@testing-library/react';
import BooksPage from '@Pages/books';
import { useSession } from 'next-auth/react';
import { useFindUserBooksUseCase } from '@Application/book/find-user-books.use-case';
import { mockedUserBooks } from '../__mocks__/user-books.mock';
import router from 'next/router';

const mockedUseFindUserBooks = useFindUserBooksUseCase as jest.Mock<any>;
jest.mock('@Application/book/find-user-books.use-case');

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

    mockedUseFindUserBooks.mockImplementation(() => ({
      status: 'loading',
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without crashing', () => {
    render(<BooksPage />);
  });

  it('Should show loading spinner element', () => {
    const { getByTestId } = render(<BooksPage />);

    expect(getByTestId('load-spinner')).toBeVisible();
  });

  describe('Show user books data', () => {
    beforeEach(() => {
      mockedUseFindUserBooks.mockImplementation(() => ({
        status: 'success',
        data: {
          pages: [{ books: mockedUserBooks }],
        },
      }));
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should show Add New Book button and the first author book in the list', () => {
      const { getByText } = render(<BooksPage />);

      expect(getByText(/Add New Book/i)).toBeInTheDocument();
      expect(getByText(/Author Test/i)).toBeInTheDocument();
    });

    it('Should redirect to a book details page', async () => {
      const bookId = mockedUserBooks[0].id;

      render(<BooksPage />);

      await router.push({
        pathname: '/book/[id]',
        query: { id: bookId },
      });

      expect(router).toMatchObject({
        asPath: `/book/${bookId}`,
        pathname: '/book/[id]',
      });
    });
  });
});
