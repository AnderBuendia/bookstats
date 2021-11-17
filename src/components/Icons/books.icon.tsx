import { FC } from 'react';
import Image from 'next/image';

export type BooksIconProps = {
  w: number;
  h: number;
};

export const BooksIcon: FC<BooksIconProps> = ({ w, h }) => {
  return <Image src="/book.svg" alt="Books Icon" width={w} height={h} />;
};
