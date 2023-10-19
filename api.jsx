import axios from "axios";

export const fetchMovies = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      // "https://shy-cloud-3319.fly.dev/api/v1/movie/popular",
      `${import.meta.env.VITE_BASEURL}/movie/popular`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching movies: ", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      // `https://shy-cloud-3319.fly.dev/api/v1/movie/${id}`,
      `${import.meta.env.VITE_BASEURL}/movie/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching detail movies: ", error);
    throw error;
  }
};

export const searchMovie = async (q)=>{
  try{
    const token = localStorage.getItem("token")
    // const search = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${q}`,
    const search = await axios.get(`${import.meta.env.VITE_BASEURL}/search/movie?page=1&query=${q}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  )
     return search.data

  } catch (error){
    console.error("Error searching movies: ", error);
  }
};