import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@Lib/utils/prisma.utils';
import { HTTPStatusCodes } from '@Enums/config/http-status-codes.enum';
import { AlertMessages } from '@Enums/config/messages.enum';
import { FormValuesEditBookForm } from '@Types/forms/edit-book-form.type';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const bookId = req.query.id as string;

  if (!bookId) {
    res.status(HTTPStatusCodes.NOT_FOUND).send(false);
  }

  try {
    if (req.method === 'GET') {
      await handleGET(bookId, res);
    } else if (req.method === 'POST') {
      await handlePOST(bookId, req.body.data, res);
    } else if (req.method === 'PUT') {
      await handlePUT(bookId, req.body.rate, res);
    } else if (req.method === 'DELETE') {
      await handleDELETE(bookId, res);
    } else {
      res.status(HTTPStatusCodes.METHOD_NOT_ALLOWED).send(false);
      return;
    }
  } catch (error: any) {
    if (error instanceof Error) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: AlertMessages.SERVER_ERROR });
    }
  }
};

/* GET /api/book/:id */
const handleGET = async (bookId: string, res: NextApiResponse) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { user: true },
  });

  res.status(HTTPStatusCodes.OK).json(book);
};

/* POST /api/book/:id */
const handlePOST = async (
  bookId: string,
  data: FormValuesEditBookForm,
  res: NextApiResponse
) => {
  const result = await prisma.book.update({
    where: { id: bookId },
    data: {
      ...data,
      read_pages: {
        push: data.read_pages && Number(data.read_pages),
      },
    },
  });

  res.status(HTTPStatusCodes.OK).json(result);
};

/* PUT /api/book/:id */
const handlePUT = async (
  bookId: string,
  rate: number,
  res: NextApiResponse
) => {
  const result = await prisma.book.update({
    where: { id: bookId },
    data: {
      rating: rate,
    },
  });

  res.status(HTTPStatusCodes.OK).json(result);
};

/*  DELETE /api/book/:id */
const handleDELETE = async (bookId: string, res: NextApiResponse) => {
  const book = await prisma.book.delete({
    where: { id: bookId },
  });

  res.status(HTTPStatusCodes.OK).json(book);
};

export default handle;
