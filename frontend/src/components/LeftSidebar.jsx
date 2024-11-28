import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { MdListAlt } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";


const LeftSidebar = () => {

  const {user} = useSelector(store=>store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

const logoutHandler = async ( ) => {
  try {
    const res = await axios.post(`${USER_API_END_POINT}/logout`)
    dispatch(getUser(null));
    dispatch(getOtherUsers(null));
    dispatch(getMyProfile(null));
    navigate("/login")
    toast.success(res.data.message)
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

  return (
    <div className="flex flex-col gap-4 w-[20%] px-4">
      <div>
        <FaXTwitter size={35} className="ml-4 mt-1" />
      </div>
      <div className="flex flex-col gap-2 text-lg text-gray-700">
        <Link to={"/"} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
            <MdHomeFilled size={25} />
          </div>
          <h1 className="text-2xl font-semibold">Home</h1>
        </Link>

        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
             
            <CiSearch size={25}/> 
          </div>
          <h1 className="text-2xl font-semibold">Explore</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
            <IoNotificationsOutline size={25}/>
          </div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
            <FiMessageSquare size={25} />
          </div>
          <h1 className="text-2xl font-semibold">Messages</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
            <MdListAlt size={25} />
          </div>
          <h1 className="text-2xl font-semibold">List</h1>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
            <FaRegBookmark size={25} />
          </div>
          <h1 className="text-2xl font-semibold">Bookmarks</h1>
        </div>

        <Link to={`/profile/${user?._id}`} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
            <CgProfile size={25} />
          </div>
          <h1 className="text-2xl font-semibold">Profile</h1>
        </Link>

        <div onClick={logoutHandler} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full  ">
          <div className="">
            <RiLogoutCircleRLine size={25} />
          </div>
          <h1 className="text-2xl font-semibold">Logout</h1>
        </div>
      </div>

      <button className="border-none bg-sky-600 rounded-3xl px-4 py-2 text-white font-semibold text-lg ">
        Post
      </button>
    </div>
  );
};

export default LeftSidebar;
