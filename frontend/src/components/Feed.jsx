import React from "react";
import CreatePost from "./CreatePost";
import Tweet from "./Tweet";

const Feed = () => {
  return (
    <div className="w-[50%] border-2 border-gray-100 mx-2 px-2">
      <div>
        <CreatePost></CreatePost>
        <Tweet></Tweet>
      </div>
    </div>
  );
};

export default Feed;
