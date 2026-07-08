import { useContext, useState } from "react";
import { assets } from "./../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      autoComplete="off"
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[400px] border border-gray-100 rounded-3xl text-gray-500 text-xs bg-white shadow-xl shadow-teal-500/5">
        <p className="text-2xl font-bold text-gray-900 leading-tight m-auto">
          <span className="text-teal-600 font-extrabold"> {state} </span> Login
        </p>
        <p className="text-gray-400 font-medium -mt-2 m-auto">
          Please enter your credentials to access the panel.
        </p>
        <div className="w-full mt-2">
          <p className="font-semibold text-gray-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none rounded-xl w-full p-3 mt-1.5 transition-all text-sm bg-gray-50/50 focus:bg-white"
            type="email"
            autoComplete="off"
            required
          />
        </div>
        <div className="w-full">
          <p className="font-semibold text-gray-700">Password</p>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none rounded-xl w-full p-3 pr-12 mt-1.5 transition-all text-sm bg-gray-50/50 focus:bg-white"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 select-none mt-0.5"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.274 4.057 5.065 7 9.964 7 4.899 0 8.69-2.943 9.964-7-1.274-4.057-5.065-7-9.964-7-4.899 0-8.69 2.943-9.964 7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide shadow-md shadow-teal-500/10 hover:shadow-lg active:scale-95 transition-all duration-200 mt-2">
          Login
        </button>
        {state === "Admin" ? (
          <p className="text-gray-400 font-medium">
            Doctor Login?{" "}
            <span
              className="text-teal-600 font-bold hover:text-teal-700 hover:underline cursor-pointer transition-colors ml-1"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 font-medium">
            Admin Login?{" "}
            <span
              className="text-teal-600 font-bold hover:text-teal-700 hover:underline cursor-pointer transition-colors ml-1"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
