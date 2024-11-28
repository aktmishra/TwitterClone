import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const { otherUsers } = useSelector((store) => store.user);

  return (
    <div className="w-[20%] flex flex-col gap-5 ">
      <div className="cursor-pointer flex items-center gap-1 bg-gray-200 p-2 rounded-full">
        <CiSearch size={25} />
        <input
          className="bg-transparent outline-none"
          type="search"
          placeholder="Search"
        />
      </div>

      <div className="bg-gray-50 rounded-2xl p-2 flex flex-col gap-4  ">
        <div>
          <h1 className="text-lg font-bold">Who to follow</h1>
        </div>
        {otherUsers?.map((user) => {
          return (
            <div key={user?._id} className="flex   justify-between">
              <div className="flex items-center gap-1">
                <Avatar githubHandle="sitebase" size={35} round="100%" />
                <div className="leading-tight ">
                  <p className="font-semibold text-lg text-gray-600">
                    {user?.name}{" "}
                  </p>
                  <span>{`@${user?.username}`}</span>
                </div>
              </div>
              <div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                    <button className="border-none bg-black  rounded-3xl px-4 py-1 text-white text-md ">
                      Profile
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
