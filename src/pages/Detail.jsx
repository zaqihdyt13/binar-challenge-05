import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineStar } from "react-icons/ai";
import Header from "../components/Header";
import { fetchMovieDetails } from "../../api";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchmovieDetail = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get(
  //         // `https://shy-cloud-3319.fly.dev/api/v1/movie/${id}`,
  //         `${import.meta.env.VITE_BASEURL}/movie/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = response.data.data;
  //       setMovie(data);
  //     } catch (error) {
  //       if (axios.isAxiosError(error)) {
  //         if (error.response.status === 401) {
  //           localStorage.removeItem("token");
  //         }

  //         toast.error(error.response.data.message);
  //         return;
  //       }
  //       toast.error(error.message);
  //     }
  //   };

  //   fetchmovieDetail();
  // }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details: ", error);
      }
    };

    fetchData();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="dp-hero-section" style={backgroundImageStyle}>
      <div className="bg-filter w-100 h-100">
        <Header />
        <div className="d-flex align-items-center mt-5">
          <div className="dp-hero-content text-white w-50 ps-3 pe-1 pb-5">
            <h1 className="fs-1 fw-bold my-4 overflow-hidden">{movie.title}</h1>
            <div className="movie-genre d-inline-block mt-2 mb-4 p-2">
              <span className="me-3">Genres:</span>
              {movie.genres.map((genre) => (
                <div className="d-inline-flex border py-2 px-3" key={genre.id}>
                  {genre.name}
                </div>
              ))}
            </div>
            <p className="mt-0 mb-4">{movie.overview}</p>
            <div className="d-flex align-items-center mt-3 mb-5 gap-2">
              <AiOutlineStar className="rate-star" />
              {movie.vote_average} / 10
            </div>
            <button
              onClick={() => navigate("/")}
              className="btn-backHome border-0 d-flex align-items-center justify-content-center"
            >
              <span className="fw-bold">BACKHOME</span>
            </button>
          </div>
          <img
            className="movie-poster h-50 d-flex ms-auto me-5 mt-1 border border-2 border-dark rounded"
            src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
      </div>
    </div>
  );
}

export default Detail;
