import { FC } from 'react';
import { useRouter } from 'next/router';
import { Rating, RatingView } from 'react-simple-star-rating';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { useUpdateRating } from '@Application/book/updateRating';

interface StarRatingProps {
  bookId: string;
  bookRating: number;
}

const StarRating: FC<StarRatingProps> = ({ bookId, bookRating }) => {
  const router = useRouter();
  const { updateRating } = useUpdateRating();

  const handleRating = async (rate: number) => {
    const response = await updateRating(rate, bookId);

    if (response?.ok) {
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
