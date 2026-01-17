import React from "react";

const PostsCard = ({ joke, type }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold">{type}</h2>
      <p>{joke}</p>
    </div>
  );
};

export default PostsCard;
