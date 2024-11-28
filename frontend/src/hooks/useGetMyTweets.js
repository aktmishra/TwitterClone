import axios from "axios";
import { useEffect } from "react";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweet } from "../redux/tweetSlice";

const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  const { refresh, followingTweet } = useSelector((store) => store.tweet);

  const fetchAllTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/alltweets/${id}`, {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(getAllTweet(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollowingTweets = async () => {
    try {
      const res = await axios.get(`${TWEET_API_END_POINT}/followingtweets/${id}`, {
        withCredentials: true,
      });
      // console.log(res);
      dispatch(getAllTweet(res.data.tweets));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (followingTweet) {
      fetchFollowingTweets()
    } else {
      fetchAllTweets()
    };
  }, [refresh, followingTweet  ]);
};

export default useGetMyTweets;
