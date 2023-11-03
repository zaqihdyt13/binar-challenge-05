import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {FcGoogle} from "react-icons/fc"
import { registerLoginWithGoogle } from "../redux/actions/AuthActions";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => 
    dispatch(registerLoginWithGoogle(responseGoogle.access_token, navigate)),
  });

  return (
    <Button className="btn btn-light border border-2 rounded-2 py-2 px-4" onClick={() => loginWithGoogle()}>
      <span className="text-dark me-1">Google</span>
      <FcGoogle className="fs-4"/>
    </Button>
  )
}

export default GoogleLogin