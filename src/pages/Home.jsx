import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import { PiWarningBold } from "react-icons/pi";
import { fetchMovies, searchMovie } from "../../api";
import Carousel from "../components/Carousel";
import Header from "../components/Header";

function Home() {
  const [moviePopular, setMoviePopular] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMoviePopular(data);
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://shy-cloud-3319.fly.dev/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Error checking authentication: ", error);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const MovieList = () => {
    return moviePopular.map((movie, index) => {
      return (
        <div
          key={index}
          className="movie-wrapper d-flex flex-column align-items-center rounded-4 position-relative"
        >
          <Link to={`/detail/${movie.id}`}>
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-hover text-white position-absolute top-0 start-0 py-4 px-3">
              <div className="movie-title fs-4 fw-bold mb-3">{movie.title}</div>
              <div className="movie-date">Release: {movie.release_date}</div>
              <div className="movie-rate fw-bold mt-2 d-flex align-items-center gap-1">
                <AiOutlineStar className="rate-star" />
                {movie.vote_average} / 10
              </div>
            </div>
          </Link>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 2) {
      const queryResult = await searchMovie(q);
      setMoviePopular(queryResult.data);
    }
  };

  const handleSearchClick = () => {
    search(query);
  };

  return (
    <>
      <Header />
      <Carousel />
      <div className="movie-section ps-4 pb-5">
        <div className="navbar-search overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="w-100 h-25 text-white rounded-5 py-2 ps-3 fs-6 border-danger bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearchClick}
            className="search-icon text-white border-0"
          >
            <HiSearch />
          </button>
        </div>
        <h1 className="mt-5 mb-4 mx-5 fs-2 fw-bold overflow-hidden">
          Popular Movie
        </h1>
        <div className="movie-container w-100 d-flex gap-4 flex-wrap justify-content-start py-3 px-5">
          {isLoggedIn ? (
            <MovieList />
          ) : (
            <div
              style={{
                width: "100%",
                height: "72vh",
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
              className="border border-4 d-flex"
            >
              <p className="text-muted m-auto fs-3 d-flex align-items-center gap-2">
                <PiWarningBold className="text-danger" /> Silahkan melakukan{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{ cursor: "pointer" }}
                  className="text-primary fw-bold"
                >
                  login
                </span>
                untuk melihat daftar film!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
