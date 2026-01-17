"use client";

import { useState } from "react";

const NameWithEdit = ({ name }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative"
    >
      {name}
      {isHovering && (
        <button className="absolute ml-2 text-blue-500">Edit</button>
      )}
    </div>
  );
};

export default NameWithEdit;
