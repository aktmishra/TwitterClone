import React from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineGifBox } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { FaRegSmile } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingTweet, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const {followingTweet} = useSelector(store => store.tweet)
  const dispatch = useDispatch();

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
      setDescription("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const forYouHandler = () => {
    dispatch(getFollowingTweet(false));
  };

  const followingHandler = () => {
    dispatch(getFollowingTweet(true));
  };

  return (
    <div className="w-[100%] ">
      <div className="flex justify-around text-center text-gray-600 text-md font-bold border-b border-gray-200">
        <div onClick = {forYouHandler} className={`cursor-pointer  hover:bg-gray-200 w-[50%] ${!followingTweet?  "border-b-4 border-blue-600": "border-b-4 border-transparent"}`}>
          <h2 className="py-2">For you</h2>
        </div>
        <div onClick={followingHandler} className={`cursor-pointer  hover:bg-gray-200 w-[50%] ${followingTweet?  "border-b-4 border-blue-600": "border-b-4 border-transparent"}`}>
          <h2 className="p-2">Following</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 ">
        <div className="flex gap-3 ">
          <div>
            <Avatar
              githubHandle="sitebase"
              size={40}
              className="rounded-full ml-1 mt-1"
            />
          </div>
          <textarea
            placeholder="What is happening?"
            className="relative left-1 top-1 text-xl w-full p-2 mr-2 outline-none border-b border-gray-100 text-wrap resize-none"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className=" flex justify-between border-b pb-1 mt-1">
          <div className="flex gap-3 items-end  ">
            <CiImageOn size={15} color="0284c7" />
            <MdOutlineGifBox size={15} color="0284c7" />
            <FaListUl size={15} color="0284c7" />
            <FaRegSmile size={15} color="0284c7" />
            <IoCalendarOutline size={15} color="0284c7" />
            <FaLocationDot size={15} color="0284c7" />
          </div>
          <div>
            <button
              className="border-none bg-sky-600 rounded-3xl px-4 py-1 text-white font-semibold text-lg mr-2"
              onClick={submitHandler}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
