import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { BookStatus } from '@prisma/client';
import { useUpdateBookUseCase } from '@Application/book/edit-book.use-case';
import { getColorStatus, sumReadPages } from '@Lib/utils/book.utils';
import Input from '@Components/Forms/Input';
import Select from '@Components/Forms/Select';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { FormMessages } from '@Enums/config/messages.enum';
import type { IBook } from '@Interfaces/domain/book.interface';
import type { FormValuesEditBookForm } from '@Types/forms/edit-book-form.type';

export type EditBookFormProps = {
  book: IBook;
};

const EditBookForm: FC<EditBookFormProps> = ({ book }) => {
  const { title, author, status, review, pages, readPages } = book;
  const { data: session } = useSession();
  const router = useRouter();
  const { updateBook } = useUpdateBookUseCase();
  const totalReadPages = sumReadPages(readPages);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValuesEditBookForm>({
    defaultValues: {
      title,
      author,
      readPages: 0,
      status,
      review,
    },
  });
  const watchStatus = watch('status');

  const onSubmit = handleSubmit(async (data) => {
    const response = await updateBook(data, book, session?.user?.email);

    if (response) {
      return router.push(MainPaths.BOOKS);
    }
  });

  return (
    <form
      className="container mx-auto p-6 bg-white dark:bg-gray-700 rounded-md shadow-md"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl pb-2 font-black text-center">Edit this book</h2>

      <Input
        label="Title"
        type="text"
        placeholder="Title..."
        register={{ ...register('title') }}
        error={errors.title}
      />

      <Input
        label="Author"
        type="text"
        placeholder="Author..."
        register={{ ...register('author') }}
        error={errors.author}
      />

      <div className="flex flex-row justify-between items-center">
        <Input
          label="Read Pages"
          type="number"
          placeholder="Number of pages..."
          register={{
            ...register('readPages', {
              validate: {
                lessThanPages: (value) =>
                  Number(value) === 0 ||
                  Number(value) <= pages ||
                  FormMessages.READ_PAGES,
                lessThanReadPages: (value) =>
                  Number(value) === 0 ||
                  totalReadPages <= pages ||
                  FormMessages.READ_PAGES,
              },
            }),
          }}
          error={errors.readPages}
        />

        <Select
          style={`${getColorStatus(
            watchStatus
          )} py-2 px-4 rounded-xl ml-3 mt-4 bg-red font-bold appearance-none text-center hover:opacity-70 cursor-pointer`}
          {...register('status')}
          options={[
            { label: BookStatus.TO_READ, value: BookStatus.TO_READ },
            { label: BookStatus.READY, value: BookStatus.READY },
            { label: BookStatus.READING, value: BookStatus.READING },
            { label: BookStatus.COMPLETED, value: BookStatus.COMPLETED },
          ]}
        />
      </div>

      <p className="font-body font-bold">
        Total Read Pages:
        <span className="ml-2 text-gray-400 font-medium">{totalReadPages}</span>
      </p>

      <div className="mt-4">
        <label htmlFor="review" className="block font-body font-bold mb-2">
          <span>Review</span>
        </label>
        <textarea
          className="bg-white dark:bg-gray-400 shadow-gray-800/50 font-body shadow appearance-none rounded w-full h-28 p-2
             text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Write your review here... (optional)"
          {...register('review')}
        />
      </div>

      <button className="btn-form">
        <span>Edit Book</span>
      </button>
    </form>
  );
};

export default EditBookForm;
