import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../components/Header";

function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const getMe = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.data;

        setUser(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            return (window.location.href = "/");
          }

          toast.error(error.response.data.message);
          return;
        }
        toast.error(error.message);
      }
    };

    getMe();
  }, []);

  return (
    <>
      <Header />
      <Container className="dashboard bg-danger p-5 position-relative">
        <div className="bg-filter position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center">
          <h1 className="text-center overflow-hidden">
            Hi, <span className="text-danger fw-bold">{user?.name}</span> with {user?.email}!
          </h1>
          <h1 className="text-center fs-3">
            This page only can be accessed by user having login
          </h1>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
