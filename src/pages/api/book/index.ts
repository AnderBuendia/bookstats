import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@Lib/utils/prisma.utils';
import { HTTPStatusCodes } from '@Enums/config/http-status-codes.enum';
import { AlertMessages } from '@Enums/config/messages.enum';

/**
 * POST /api/book
 */
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(HTTPStatusCodes.METHOD_NOT_ALLOWED).send(false);
    return;
  }

  const { title, author, status, pages, rating, readPages } = req.body.book;

  try {
    const result = await prisma.book.create({
      data: {
        title,
        author,
        status,
        pages,
        rating,
        readPages,
        user: { connect: { email: req.body.email } },
      },
    });

    res.status(HTTPStatusCodes.OK).json(result);
  } catch (error: any) {
    if (error instanceof Error) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: AlertMessages.SERVER_ERROR });
    }
  }
};

export default handle;
