import type { FC, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@Lib/hooks/useClickOutside';

export type ModalDeleteBookProps = {
  onDeleteBook: () => void;
  componentRef: MutableRefObject<HTMLDivElement>;
  handleShowModalDelete: Dispatch<SetStateAction<boolean>>;
};

const ModalPortal: FC<ModalDeleteBookProps> = ({
  onDeleteBook,
  componentRef,
  handleShowModalDelete,
}) => {
  return createPortal(
    <ModalDeleteBook
      onDeleteBook={onDeleteBook}
      componentRef={componentRef}
      handleShowModalDelete={handleShowModalDelete}
    />,
    document.getElementById('my-portal')!
  );
};

const ModalDeleteBook: FC<ModalDeleteBookProps> = ({
  onDeleteBook,
  componentRef,
  handleShowModalDelete,
}) => {
  useClickOutside(componentRef, handleShowModalDelete);

  return (
    <div className="flex fixed inset-0 bg-white bg-opacity-70">
      <div
        ref={componentRef}
        className="relative p-8 m-auto border-2 border-gray-600 text-center rounded-md shadow-lg bg-white dark:bg-gray-700"
      >
        <div className="mb-4">
          <h3 className="font-bold text-center text-xl mb-2">Are you sure?</h3>
          <p className="font-bold text-center text-lg">
            You want to delete this file?
          </p>
        </div>

        <div className="flex flex-row justify-between items-center">
          <button
            className="py-2 px-4 rounded-lg text-white bg-red-500 mr-3 hover:opacity-70"
            onClick={() => onDeleteBook()}
          >
            <span>Yes, Delete it!</span>
          </button>
          <button
            className="py-2 px-4 rounded-lg text-white bg-black hover:opacity-70"
            onClick={() => handleShowModalDelete(false)}
          >
            <span>No, Cancel it!</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPortal;
