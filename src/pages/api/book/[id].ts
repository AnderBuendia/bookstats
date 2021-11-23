import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@Lib/utils/prisma.utils';
import { HTTPStatusCodes } from '@Enums/config/http-status-codes.enum';
import { AlertMessages } from '@Enums/config/messages.enum';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(HTTPStatusCodes.METHOD_NOT_ALLOWED).send(false);
    return;
  }

  const bookId = req.query.id as string;

  try {
    if (bookId) {
      const book = await prisma.book.findUnique({
        where: { id: bookId },
        include: { user: true },
      });

      res.json(book);
    } else {
      res.status(HTTPStatusCodes.NOT_FOUND).send(false);
    }
  } catch (error: any) {
    if (error instanceof Error) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: AlertMessages.SERVER_ERROR });
    }
  }
};

export default handle;
