import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { AiOutlineStar } from "react-icons/ai";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getSearchMovie } from "../redux/actions/PostActions";

function Home() {
  const dispatch = useDispatch();
  const [searchMovies, setSearchMovies] = useState([]);
  const { posts } = useSelector((state) => state.post);
  const { searchResults } = useSelector((state) => state.post);
 
  // console.log(searchResults);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const MovieList = () => {
    const moviesToDisplay = searchResults?.length >= 3 ? searchResults : posts;
    return (
      <div className="movie-container w-100 d-flex gap-4 flex-wrap justify-content-start py-3 px-5">
        {moviesToDisplay &&
          moviesToDisplay?.length > 0 &&
          moviesToDisplay.map((post) => (
            <div
              key={post.id}
              className="movie-wrapper d-flex flex-column align-items-center rounded-4 position-relative"
            >
              <Link to={`/detail/${post.id}`}>
                <img
                  className="movie-image"
                  src={`https://image.tmdb.org/t/p/w500${post.poster_path}`}
                  alt={post.title}
                />
                <div className="movie-hover text-white position-absolute top-0 start-0 py-4 px-3">
                  <div className="movie-title fs-4 fw-bold mb-3">
                    {post.title}
                  </div>
                  <div className="movie-date">Release: {post.release_date}</div>
                  <div className="movie-rate fw-bold mt-2 d-flex align-items-center gap-1">
                    <AiOutlineStar className="rate-star" />
                    {post.vote_average} / 10
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    );
  };

  const handleSearchClick = () => {
    dispatch(getSearchMovie(searchMovies));
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
            onChange={({ target }) => setSearchMovies(target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSearchClick();
              }
            }}
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
        <MovieList />
      </div>
    </>
  );
}

export default Home;
