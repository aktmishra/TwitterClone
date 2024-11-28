import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // login
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          Dispatch(getUser(res?.data?.loggedInUser));

          toast.success(res.data.message);
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      // signup
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          {
            name,
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsLogin(true);
          setEmail("");
          setPassword("");
          toast.success(res.data.message);
        }
        console.log(res);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="flex gap-36  w-[80%] justify-center items-center ">
        <div>
          <img width={250} src="../src/assets/twitter-x.svg " alt="" />
        </div>
        <div className="flex flex-col gap-5 ">
          <h1 className="font-extrabold text-6xl">Happening now.</h1>

          <div className=" w-[50%] flex flex-col gap-5 ">
            <h1 className="font-bold text-2xl">
              {isLogin ? "Login" : "Signup"}
            </h1>
            <form onSubmit={submitHandler} className="flex flex-col gap-2">
              {!isLogin && (
                <>
                  <input
                    className="border border-gray-400 rounded-full px-3 py-1 outline-blue-500"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                  />
                  <input
                    className="border border-gray-400 rounded-full px-3 py-1 outline-blue-500"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />
                </>
              )}
              <input
                className="border border-gray-400 rounded-full px-3 py-1 outline-blue-500"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <input
                className="border border-gray-400 rounded-full px-3 py-1 outline-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <button className="border-none bg-sky-600 rounded-3xl px-4 py-2 text-white font-semibold text-lg ">
                {isLogin ? "Login" : "Creat Account"}
              </button>{" "}
              <p className="text-gray-500 ">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  className="underline cursor-pointer text-blue-600 font-semibold "
                  onClick={loginSignupHandler}
                >
                  {isLogin ? " Signup" : " Login"}{" "}
                </span>{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
