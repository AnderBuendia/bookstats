import type { Book } from '@prisma/client';

export interface EndpointBook extends Book {}

export interface EndpointBooks {
  books: EndpointBook[];
  cursorBooks: string;
}
