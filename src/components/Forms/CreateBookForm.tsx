import type { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { BookStatus } from '@prisma/client';
import { useCreateBookUseCase } from '@Application/book/create-book.use-case';
import { getColorStatus } from '@Lib/utils/book.utils';
import Input from '@Components/Forms/Input';
import Select from '@Components/Forms/Select';
import { FormMessages } from '@Enums/config/messages.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import type { FormValuesCreateBookForm } from '@Types/forms/create-book-form.type';

const CreateBookForm: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { createBook } = useCreateBookUseCase();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValuesCreateBookForm>({
    defaultValues: {
      pages: 0,
      status: BookStatus.TO_READ,
    },
  });
  const watchStatus = watch('status');

  const onSubmit = handleSubmit(async (data) => {
    const response = await createBook(data, session?.user?.email);

    if (response) {
      return router.push(MainPaths.BOOKS);
    }
  });

  return (
    <form
      className="container mx-auto w-11/12 shadow-md rounded-md p-6 bg-white dark:bg-gray-700"
      onSubmit={onSubmit}
    >
      <h2 className="font-bold text-xl text-center">Add New Book</h2>
      <Input
        label="Title"
        type="text"
        placeholder="Title..."
        register={{
          ...register('title', {
            required: FormMessages.TITLE_REQUIRED,
          }),
        }}
        error={errors.title}
      />

      <Input
        label="Author"
        type="text"
        placeholder="Author..."
        register={{
          ...register('author', {
            required: FormMessages.AUTHOR_REQUIRED,
          }),
        }}
        error={errors.author}
      />

      <div className="flex flex-row justify-between items-center">
        <Input
          label="Pages"
          type="number"
          placeholder="Number of pages..."
          register={{
            ...register('pages'),
          }}
          error={errors.pages}
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

      <button className="btn-form">
        <span>Create New Book</span>
      </button>
    </form>
  );
};

export default CreateBookForm;
