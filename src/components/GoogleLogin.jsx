import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import {FcGoogle} from "react-icons/fc"

function GoogleLogin() {
  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      let data = JSON.stringify({
        access_token: accessToken,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        // url: 'https://shy-cloud-3319.fly.dev/api/v1/auth/google',
        url: `${import.meta.env.VITE_BASEURL}/auth/google`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      const { token } = response.data.data;

      localStorage.setItem("token", token);

      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <Button className="btn btn-light border border-2 rounded-2 py-2 px-4" onClick={() => loginWithGoogle()}>
      <span className="text-dark me-1">Google</span>
      <FcGoogle className="fs-4"/>
    </Button>
  );
}

export default GoogleLogin;