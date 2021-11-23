import { FC } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useCreateBook } from '@Application/book/createBook';
import { getColorStatus } from '@Domain/book';
import Input from '@Components/Forms/Input';
import Select from '@Components/Forms/Select';
import { FormMessages } from '@Enums/config/messages.enum';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { FormValuesCreateBookForm } from '@Types/forms/create-book-form.type';
import { BookStatus } from '@prisma/client';

const CreateBookForm: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { createBook } = useCreateBook();

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
  const watchSelect = watch('status');

  const onSubmit = handleSubmit(async (data) => {
    const response = await createBook(data, session?.user?.email);

    if (response) {
      router.push(MainPaths.BOOKS);
    }
  });

  return (
    <form
      className="w-11/12 lg:w-6/12 bg-white rounded-md p-6 mt-6"
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
            watchSelect
          )} py-2 px-4 rounded-xl mt-5 bg-red appearance-none text-center`}
          {...register('status')}
          options={[
            { label: BookStatus.TO_READ, value: BookStatus.TO_READ },
            { label: BookStatus.READY, value: BookStatus.READY },
            { label: BookStatus.READING, value: BookStatus.READING },
            { label: BookStatus.COMPLETED, value: BookStatus.COMPLETED },
          ]}
        />
      </div>

      <button className="btn-form" type="submit">
        Create New Book
      </button>
    </form>
  );
};

export default CreateBookForm;
