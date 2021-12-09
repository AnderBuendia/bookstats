import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@Lib/utils/prisma.utils';
import { HTTPStatusCodes } from '@Enums/config/http-status-codes.enum';
import { AlertMessages } from '@Enums/config/messages.enum';

/* GET /api/books */
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(HTTPStatusCodes.METHOD_NOT_ALLOWED).send(false);
    return;
  }

  const userId = req.query.uid as string;

  try {
    const books = await prisma.user
      .findUnique({
        where: { id: userId },
      })
      .books({
        take: 3,
        orderBy: {
          status: 'asc',
        },
      });

    res.status(HTTPStatusCodes.OK).json(books);
  } catch (error: any) {
    if (error instanceof Error) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: AlertMessages.SERVER_ERROR });
    }
  }

  // const books = await prisma.user
  //   .findUnique({ where: { id: req.query.uid as string } })
  //   .books({
  //     take: 3,
  //     skip: 1,
  //     orderBy: {
  //       status: 'asc',
  //     },
  //   });
};

export default handle;
