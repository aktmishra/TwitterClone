import React from "react";
import Avatar from "react-avatar";
import { CgHeart } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TWEET_API_END_POINT } from "../utils/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";

const Tweet = () => {
  const { allTweet } = useSelector((store) => store.tweet);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        {id: user?._id},
        { withCredentials: true }
      );
      dispatch(getRefresh())
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      toast.success(res.data.message);
      dispatch(getRefresh());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {allTweet?.map((tweet) => {
        return (
          <div key={tweet?._id} className="border-b pb-1 mb-2">
            <div className="flex items-center gap-3 mt-2 ml-2">
              <div>
                <Avatar githubHandle="sitebase" size={40} round="100%" />
              </div>
              <div>
                <div className="flex gap-2">
                  <h1 className="font-semibold text-lg text-gray-600">
                    {tweet?.userDetails[0]?.name}
                  </h1>
                  <span>{`@${tweet?.userDetails[0]?.username} . 1m `} </span>
                </div>
                <div className=" ">
                  <p className=" text-wrap">{tweet?.description} </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-4 mt-4">
              <div className="flex items-center gap-1 cursor-pointer">
                <FaRegComment size={20} />
                <span>0</span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer" onClick={()=>likeOrDislikeHandler(tweet?._id) }>
                <CgHeart size={20}  />
                <span>{tweet?.likes.length}</span>
              </div>
              <div className="flex items-center cursor-pointer">
                <FaRegBookmark />
              </div>
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center cursor-pointer"
                >
                  <MdDeleteOutline size={20} color={"red"} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tweet;
