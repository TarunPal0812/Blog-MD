import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeButton = ({ likes, hasLiked, onClick }) => {
  return (
    <div className="like-button mt-4 flex items-center space-x-2">
      <button
        onClick={onClick}
        className={`text-2xl transition duration-150 ${
          hasLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
        }`}
        title={hasLiked ? "Unlike" : "Like"}
      >
        {hasLiked ? <FaHeart /> : <FaRegHeart />}
      </button>
      <span className="text-gray-700">
        {likes} {likes === 1 ? "like" : "likes"}
      </span>
    </div>
  );
};

export default LikeButton;
