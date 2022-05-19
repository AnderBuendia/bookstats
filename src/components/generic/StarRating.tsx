import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Rating, RatingView } from 'react-simple-star-rating';
import { useUpdateRatingUseCase } from '@Application/book/update-rating.use-case';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import type { IBook } from '@Interfaces/domain/book.interface';

interface StarRatingProps {
  bookRating: number;
  book: IBook;
}

const StarRating: FC<StarRatingProps> = ({ book, bookRating }) => {
  const router = useRouter();
  const { updateRating } = useUpdateRatingUseCase();

  const handleRating = async (rate: number) => {
    const data = { rate };
    const response = await updateRating(data, book);

    if (response) {
      return router.push(MainPaths.BOOKS);
    }
  };

  return (
    <div className="flex justify-center">
      {router.pathname === MainPaths.INDEX ? (
        <RatingView ratingValue={bookRating} />
      ) : (
        <Rating onClick={handleRating} ratingValue={bookRating} />
      )}
    </div>
  );
};

export default StarRating;
