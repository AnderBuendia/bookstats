import type { FC } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { BookStatus } from '@prisma/client';
import { useDeleteBookUseCase } from '@Application/book/delete-book.use-case';
import { readPagesAvgMins } from '@Lib/utils/book.utils';
import { formatDate } from '@Lib/utils/format-date.utils';
import StarRating from '@Components/generic/StarRating';
import EditBookForm from '@Components/Forms/EditBookForm';
import ModalDeleteBook from '@Components/BookSection/ModalDeleteBook';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import type { IBook } from '@Interfaces/domain/book.interface';

export type BookSectionProps = {
  book: IBook;
};

const BookSection: FC<BookSectionProps> = ({ book }) => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { deleteBook } = useDeleteBookUseCase();

  const {
    id,
    title,
    author,
    rating,
    pages,
    status,
    review,
    readPages,
    createdAt,
    updatedAt,
  } = book;

  const handleDeleteBook = async () => {
    const response = await deleteBook({ bookId: id }, session?.user?.email);

    if (response) {
      return router.push(MainPaths.BOOKS);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {showModalDelete && (
        <ModalDeleteBook
          onDeleteBook={handleDeleteBook}
          handleShowModalDelete={setShowModalDelete}
        />
      )}

      <div className="container mx-auto p-5 bg-white dark:bg-gray-700 rounded-md shadow-md mb-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-lg ">{title}</h1>
          <h3 className="font-light text-gray-500 dark:text-white">{author}</h3>
        </div>
        <div className="my-4 flex flex-row justify-between items-center">
          <section className="flex flex-row">
            <p className="font-bold">Pages</p>
            <p className="after:content-['Pages'] ml-2 font-light text-gray-500 dark:text-white">
              {pages}{' '}
            </p>
          </section>
          <StarRating bookRating={rating} book={book} />
        </div>
        <div className="w-full flex flex-row justify-between items-center text-center rounded-md border p-2">
          <div className="w-1/3 flex flex-col">
            <p className="font-bold">Time left</p>
            <p className="text-gray-500 dark:text-white font-light">
              {readPagesAvgMins(pages, status, readPages)} <span>mins</span>
            </p>
          </div>
          <div className="w-1/3 flex flex-col border-r border-l">
            <p className="font-bold">Start at</p>
            <p className="text-gray-500 dark:text-white font-light">
              {status === BookStatus.READING
                ? formatDate(createdAt)
                : 'Not Yet'}
            </p>
          </div>
          <div className="w-1/3 flex flex-col">
            <p className="font-bold">Completed at</p>
            <p
              id="completed-date"
              className="text-gray-500 dark:text-white font-light"
            >
              {status === BookStatus.COMPLETED
                ? formatDate(updatedAt)
                : 'Not Yet'}
            </p>
          </div>
        </div>
        {review && (
          <div className="w-full mt-4">
            <p>Review</p>
            <article className="mt-2 py-2 px-3 bg-gray-200 dark:bg-gray-500 rounded-md text-black dark:text-white">
              {review}
            </article>
          </div>
        )}
      </div>

      {openEditForm ? (
        <EditBookForm book={book} />
      ) : (
        <div className="w-full flex flex-row">
          <button
            className="btn-menu mr-6"
            onClick={() => setOpenEditForm(true)}
          >
            <span>Edit Book</span>
          </button>

          <button
            className="btn-menu bg-rose-600 shadow-rose-600/50"
            onClick={() => setShowModalDelete(true)}
          >
            <span>Delete Book</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSection;
