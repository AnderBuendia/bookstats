import { FC } from 'react';
import type { Book } from '@prisma/client';
import { BookStatus } from '@prisma/client';
import { readPagesAvgMins } from '@Domain/book';
import { formatDate } from '@Lib/utils/format-date.utils';
import StarRating from '@Components/generic/StarRating';

export type BookSectionProps = {
  book: Book;
};

const BookSection: FC<BookSectionProps> = ({ book }) => {
  const {
    id,
    name,
    author,
    rating,
    pages,
    status,
    review,
    read_pages,
    createdAt,
    updatedAt,
  } = book;

  return (
    <div className="flex flex-col w-11/12 justify-center items-center">
      <div className="container mx-auto my-4 p-5 bg-white rounded-md shadow-md">
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-lg ">{name}</h1>
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
              {readPagesAvgMins(pages, status, read_pages)} mins
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
      {/* <div
        className={`w-full flex flex-${
          openEdit ? 'col justify-center items-center' : 'row'
        }`}
      >
        {openEdit ? (
          <FormEditBook book={book} />
        ) : (
          <button
            className="object-center w-6/12 p-2 mr-6 font-bold bg-green-500 text-white rounded-md hover:opacity-70 
            transition-opacity duration-500 ease-out"
            onClick={() => setOpenEdit((prev) => !prev)}
          >
            Edit Book
          </button>
        )}
        <button
          className="object-center w-6/12 p-2 font-bold bg-red-500 text-white rounded-md hover:opacity-70 
          transition-opacity duration-500 ease-out"
          onClick={submitDeleteBook}
        >
          Delete Book
        </button>
      </div> */}
    </div>
  );
};

export default BookSection;
