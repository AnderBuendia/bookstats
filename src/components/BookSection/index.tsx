import { FC, useState, useRef, MutableRefObject } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { Book } from '@prisma/client';
import { BookStatus } from '@prisma/client';
import { useDeleteBook } from '@Application/book/deleteBook';
import { readPagesAvgMins } from '@Domain/book';
import { formatDate } from '@Lib/utils/format-date.utils';
import StarRating from '@Components/generic/StarRating';
import EditBookForm from '@Components/Forms/EditBookForm';
import ModalDeleteBook from '@Components/BookSection/ModalDeleteBook';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type BookSectionProps = {
  book: Book;
};

const BookSection: FC<BookSectionProps> = ({ book }) => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const modalDeleteRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { data: session } = useSession();
  const router = useRouter();
  const { deleteBook } = useDeleteBook();

  const {
    id,
    title,
    author,
    rating,
    pages,
    status,
    review,
    read_pages,
    createdAt,
    updatedAt,
  } = book;

  const handleDeleteBook = async () => {
    const response = await deleteBook(id, session?.user?.email);

    if (response?.ok) {
      return router.push(MainPaths.BOOKS);
    }
  };

  return (
    <div className="flex flex-col w-11/12 justify-center items-center">
      {showModalDelete && (
        <ModalDeleteBook
          onDeleteBook={handleDeleteBook}
          componentRef={modalDeleteRef}
          handleShowModalDelete={setShowModalDelete}
        />
      )}

      <div className="container mx-auto p-5 bg-white rounded-md shadow-md mb-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-lg ">{title}</h1>
          <h3 className="font-light text-gray-500">{author}</h3>
        </div>
        <div className="my-4 flex flex-row justify-between items-center">
          <p>
            Pages <span className="ml-1 font-light text-gray-500">{pages}</span>
          </p>
          <StarRating bookId={id} bookRating={rating} />
        </div>
        <div className="w-full flex flex-row justify-between items-center text-center rounded-md border p-2">
          <div className="w-1/3 flex flex-col">
            <p>Time left</p>
            <p className="text-gray-500 font-light">
              {readPagesAvgMins(pages, status, read_pages)} <span>mins</span>
            </p>
          </div>
          <div className="w-1/3 flex flex-col border-r border-l">
            <p>Start at</p>
            <p className="text-gray-500 font-light">
              {status === BookStatus.READING
                ? formatDate(createdAt)
                : 'Not Yet'}
            </p>
          </div>
          <div className="w-1/3 flex flex-col ">
            <p>Completed at</p>
            <p id="completed-date" className="text-gray-500 font-light">
              {status === BookStatus.COMPLETED
                ? formatDate(updatedAt)
                : 'Not Yet'}
            </p>
          </div>
        </div>
        {review && (
          <div className="w-full mt-3">
            <p>Review</p>
            <div className="mt-1 p-2 bg-gray-200 rounded-md text-black">
              {review}
            </div>
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
            className="btn-menu bg-rose-500 shadow-rose-500/50"
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
