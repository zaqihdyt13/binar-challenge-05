import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Dashboard from "./pages/users/Dashboard";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/users/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
