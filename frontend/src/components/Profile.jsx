import React, { useDebugValue } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import useGetProfile from "../hooks/useGetProfile";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { getRefresh } from "../redux/tweetSlice";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";

const Profile = () => {
  const { profile, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const { id } = useParams();
  useGetProfile(id);

  const folloUnfollowHandler = async () => {
    if (user?.following?.includes(id)) {
      // unfollow
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/unfollow/${id}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getRefresh());
        dispatch(followingUpdate(id));
        toast.success(res.data.message);
        console.log(res);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // follow
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/follow/${id}`,
          { id: user?._id },
          { withCredentials: true }
        );
        dispatch(getRefresh());
        dispatch(followingUpdate(id));
        toast.success(res.data.message);
        console.log(res);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-[50%] border-2 border-gray-100 mx-2">
      <div className=" relative ">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="cursor-pointer rounded-full  hover:bg-gray-100 p-1 "
          >
            <IoIosArrowRoundBack size={25} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-600">
              {profile?.name}{" "}
            </h1>
            <span className="text-sm">18 posts</span>
          </div>
        </div>
        <div className="overflow-hidden h-52 ">
          <img
            className=" "
            src="/assets/coverImage.png "
            alt="cover image"
          />
        </div>
        <div className=" border-4 border-white rounded-full absolute top-48 left-3 ">
          <Avatar githubHandle="sitebase" size={140} round={true} />{" "}
        </div>

        <div className="text-right">
          {id === user?._id ? (
            <button className="border border-gray-600 text-gray-600 font-semibold text-lg rounded-xl px-2 mt-2 mr-3">
              Edit profile
            </button>
          ) : (
            <button
              onClick={folloUnfollowHandler}
              className="border border-gray-600 text-gray-600 font-semibold text-lg rounded-xl px-2 mt-2 mr-3"
            >
              {user?.following?.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="mt-11 ml-5">
          <h1 className="font-bold text-lg text-gray-700 ">{profile?.name}</h1>
          <p className="text-gray-400">{`@${profile?.username}`}</p>
        </div>
        <div className="mt-2 ml-5 text-sm mr-1">
          <p>
            🌐 Exploring the web's endless possibilities with MERN Stack 🚀 |
            Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me
            on this coding journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
