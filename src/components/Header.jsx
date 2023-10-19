import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react"; 
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { BsPersonCircle } from "react-icons/bs";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const getUserData = useCallback(async (token) => { 
    try {
      const response = await axios.get("https://shy-cloud-3319.fly.dev/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      setUser(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          localStorage.removeItem("token");
          return navigate("/");
        }

        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 

    if (token) {
      getUserData(token);
    }
  }, [getUserData]);

  const isDashboardPage = location.pathname === "/users/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  Header.propTypes = {
    userName: PropTypes.string,
  };

  return (
    <header style={{backgroundColor: 'rgba(0,0,0,0.1)', boxShadow: '0 2px 5px 2px rgba(0,0,0,0.9)'}} className="navbar w-100 d-flex align-items-center py-3 px-4 position-absolute">
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
                navigate(isDashboardPage ? "/" : "/users/dashboard")
              }
              className="button rounded-3 text-white py-1 px-4 fs-6 me-2"
            >
              {isDashboardPage ? "Home" : "Dashboard"}
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
