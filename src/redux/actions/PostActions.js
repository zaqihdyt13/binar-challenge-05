import axios from "axios";
import { setPostDetails, setPosts, setSearchMovie } from "../reducers/PostReducers";
import { toast } from "react-toastify";

export const getAllPosts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://shy-cloud-3319.fly.dev/api/v1/movie/popular`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPosts(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const getPostDetails = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://shy-cloud-3319.fly.dev/api/v1/movie/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setPostDetails(response.data.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};

export const getSearchMovie = (query) => async (dispatch) => {
  try{
    const token = localStorage.getItem("token")
    const search = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  )
  dispatch(setSearchMovie(search.data.data));
    
  } catch (error){
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message);
      return;
    }
    toast.error(error.message);
  }
};