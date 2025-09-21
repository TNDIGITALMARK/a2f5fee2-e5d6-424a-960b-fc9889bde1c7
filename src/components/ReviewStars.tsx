'use client';

import { Star } from 'lucide-react';

interface ReviewStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showRating?: boolean;
  reviewCount?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function ReviewStars({
  rating,
  maxRating = 5,
  size = 'md',
  showRating = false,
  reviewCount,
  interactive = false,
  onRatingChange
}: ReviewStarsProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const renderStars = () => {
    return Array.from({ length: maxRating }, (_, i) => {
      const starRating = i + 1;
      const isFilled = starRating <= rating;
      const isHalfFilled = starRating - 0.5 <= rating && starRating > rating;

      return (
        <button
          key={i}
          type="button"
          onClick={() => handleStarClick(starRating)}
          disabled={!interactive}
          className={`${
            interactive
              ? 'hover:scale-110 transition-transform cursor-pointer'
              : 'cursor-default'
          }`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              isFilled
                ? 'fill-yellow-400 text-yellow-400'
                : isHalfFilled
                ? 'fill-yellow-400/50 text-yellow-400'
                : interactive
                ? 'text-gray-300 hover:text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">{renderStars()}</div>

      {(showRating || reviewCount !== undefined) && (
        <div className={`flex items-center gap-1 ${textSizeClasses[size]} text-gray-600`}>
          {showRating && (
            <span className="font-medium">{rating.toFixed(1)}</span>
          )}
          {reviewCount !== undefined && (
            <span>
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
}

interface ReviewStarDistributionProps {
  ratings: { [key: number]: number };
  totalReviews: number;
}

export function ReviewStarDistribution({
  ratings,
  totalReviews
}: ReviewStarDistributionProps) {
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="space-y-2">
      {stars.map((star) => {
        const count = ratings[star] || 0;
        const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-2 text-sm">
            <span className="w-8 text-right">{star}</span>
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-12 text-right text-gray-600">{count}</span>
          </div>
        );
      })}
    </div>
  );
}