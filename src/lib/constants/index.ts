import { RestEndPoints } from '@Enums/paths/rest-endpoints.enum';

export const API_BOOK_URL = `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOK}`;
export const API_BOOKS_URL = `${process.env.NEXT_PUBLIC_SITE_URL}${RestEndPoints.BOOKS}`;
