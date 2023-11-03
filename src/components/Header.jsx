import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; 
import { BsPersonCircle } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logout, getMe } from "../redux/actions/AuthActions";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe(null, null, null));
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout(() => {
      window.location.reload();
    }));
  };

  return (
    <header style={{backgroundColor: 'rgba(0,0,0,0.4)', boxShadow: '0 2px 10px 2px rgba(0,0,0,0.5)'}} className="navbar w-100 d-flex align-items-center py-3 px-4 position-absolute">
      <a className="fs-3 text-danger fw-bold" onClick={() => navigate("/")}>
        Movielist
      </a>
      {isLoggedIn && (
        <span className="user-name ms-5 me-auto d-flex align-items-center gap-2">
          <BsPersonCircle /> {user?.name}
        </span>
      )}
      <nav className="d-flex justify-content-end">
        {isLoggedIn ? (
          <>
            <button
              onClick={() =>
                // navigate(isDashboardPage ? "/" : "/users/dashboard")
                navigate("/users/dashboard")
              }
              className="button rounded-3 text-white py-1 px-4 fs-6 me-2"
            >
              {/* {isDashboardPage ? "Home" : "Dashboard"} */}
              Dashboard
            </button>
            <button
              onClick={handleLogout}
              className="button rounded-3 text-white py-1 px-4 fs-6 me-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="button rounded-3 text-white py-1 px-4 fs-6 me-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="button rounded-3 text-white py-1 px-4 fs-6 me-2"
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
