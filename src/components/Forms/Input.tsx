import { FC } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { createHtmlTag } from '@Lib/utils/format-text.utils';

export type InputProps = {
  label: string;
  type: string;
  placeholder: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

const Input: FC<InputProps> = ({
  label,
  type,
  placeholder,
  error,
  register,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={createHtmlTag(label)}
        className="block font-body font-bold mb-2"
      >
        <span>{label}</span>
      </label>
      <input
        className="bg-white shadow-gray-800/50 dark:bg-gray-400 dark:placeholder-white dark:text-white font-body shadow appearance-none rounded w-full p-2 
        text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        {...register}
      />

      {error && (
        <div className="my-2 bg-red-200 border-l-4 border-red-700 text-red-700 rounded-md p-2">
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
