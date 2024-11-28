import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";

import RightSidebar from "./RightSidebar";
import { Outlet, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import useGetMyTweets from "../hooks/useGetMyTweets";

const Home = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate()
  useGetOtherUsers(user?._id);
  useGetMyTweets(user?._id);

  useEffect(()=>{
    if (!user) {
      navigate("/login")
    }
  },[])

  return (
    <div className="flex justify-between w-[80%] mx-auto mt-2 ">
      <LeftSidebar></LeftSidebar>
      <Outlet></Outlet>
      <RightSidebar></RightSidebar>
    </div>
  );
};

export default Home;
