import React from "react";
// import axios from "axios";
// import axios from "axios";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import OtpVerification from "./OtpVerification";

const Login = () => {
  const { setShowLogin, setToken, navigate, axios } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showOtp, setShowOtp] = React.useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "register") {
        // 1. Send OTP first without registering user
        const { data } = await axios.post("/api/otp/send", { email });

        setShowOtp(true);
        if (data.success) {
          // Show OTP modal and keep user data in state
          console.log("OTP sent, showing modal");
        } else {
          toast.error(data.message);
        }
      } else {
        // Normal login
        const { data } = await axios.post(`/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          navigate("/");
          setToken(data.token);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  console.log("showOtp:", showOtp);
  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
    >
      {showOtp ? (
        <OtpVerification
          email={email}
          name={name}
          password={password}
          onSuccess={(token) => {
            navigate("/");
            setToken(token);
            localStorage.setItem("token", token);
            setShowLogin(false);
          }}
        />
      ) : (
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">User</span>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </p>
          {state === "register" && (
            <div className="w-full">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="type here"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                type="text"
                required
              />
            </div>
          )}
          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="email"
              required
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="password"
              required
            />
          </div>
          {state === "register" ? (
            <p>
              Already have account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          ) : (
            <p>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
          <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
            {state === "register" ? "Create Account" : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
