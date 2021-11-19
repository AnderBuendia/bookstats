import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { Rating, RatingView } from 'react-simple-star-rating';
import { MainPaths } from '@Enums/paths/main-paths.enum';

interface StarRatingProps {
  bookId: string;
  bookRating: number;
}

const StarRating: FC<StarRatingProps> = ({ bookId, bookRating }) => {
  const [rating, setRating] = useState(bookRating);
  const { pathname } = useRouter();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="flex justify-center">
      {pathname === MainPaths.INDEX ? (
        <RatingView ratingValue={rating} />
      ) : (
        <Rating onClick={handleRating} ratingValue={rating} />
      )}
    </div>
  );
};

export default StarRating;
