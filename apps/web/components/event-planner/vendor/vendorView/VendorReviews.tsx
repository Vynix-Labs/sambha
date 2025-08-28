"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Review } from "../../../../types/vendor";
import Link from "next/link";

interface VendorReviewsProps {
  vendor: {
    reviewCount: number;
    reviews: Review[];
  };
}

export function VendorReviews({ vendor }: VendorReviewsProps):React.JSX.Element {
  const [reviews, setReviews] = useState(
    vendor.reviews.map((review) => ({
      ...review,
      isLiked: false,
      currentLikes: review.likes,
    }))
  );

  const handleLikeClick = (reviewId: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              isLiked: !review.isLiked,
              currentLikes: review.isLiked
                ? review.currentLikes - 1
                : review.currentLikes + 1,
            }
          : review
      )
    );
  };

  return (
    <div className="mt-2">
      <h2 className="text-gray-800 font-semibold mb-2 pb-1 pt-3">
        Reviews ({vendor.reviewCount})
      </h2>
      {reviews.length > 0 ? (
        <>
          {reviews.map((review) => (
            <div key={review.id} className="border-t pt-4 pb-4">
              <div className="flex flex-col items-start bg-[#f9f9f9] p-2 rounded-lg mb-2 w-full">
                <div className="flex flex-row items-center mb-2 gap-2">
                  <Image
                    src="/noavatar.png"
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-900 font-semibold">
                      {review.userName}
                    </div>
                  </div>
                </div>
                <p className="text-gray-800 text-sm mb-1 font-light">
                  {review.comment}
                </p>
              </div>
              <div className="flex gap-2 items-center text-xs text-gray-500 pt-2">
                <p className="text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex justify-center items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                </div>
                <button
                  className="flex items-center text-xs gap-1 hover:text-[#c96fff] transition-colors"
                  onClick={() => handleLikeClick(review.id)}
                >
                  {review.isLiked ? (
                    <Heart className="w-4 h-4 fill-[#c96fff] text-[#c96fff]" />
                  ) : (
                    <p className="text-gray-500">Like</p>
                  )}
                  <span
                    className={
                      review.isLiked ? "text-[#c96fff]" : "text-gray-500"
                    }
                  >
                    {review.currentLikes}
                  </span>
                </button>
              </div>
            </div>
          ))}
          <Link
            href="#"
            className="bg-[#ebecee] rounded-xl w-full block text-center py-3 text-xs text-gray-500 font-semibold hover:bg-[#c96fff] hover:text-white transition-colors duration-300"
          >
            See all {vendor.reviewCount || 0} reviews{" "}
          </Link>
        </>
      ) : (
        <div className="border-t pt-4 text-sm text-gray-500">
          No reviews yet. Be the first to review!
        </div>
      )}
    </div>
  );
}
