import { useEffect, useState } from "react";
import "./login.css";
import { RiEyeOffFill } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";
import OAuth from "../OAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import loginImg from "../../assets/Banner-e-learning-concept-vector-design-removebg-preview.png";
import { useCoursesContext } from "../../Context/CoursesProvider";
import { useSelector } from "react-redux";
export default function Login() {
  const translate = useSelector((state) => state.language.translation);

  const { loginStatus } = useCoursesContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const errorMessages = {
    email: "Please enter a valid email address (ex: iti@gmail.com).",
    password:
      "Password must have 1 uppercase, 1 number, and 1 special character (@#$%*)",
  };
  const navigate = useNavigate();

  function onChange(e) {
    const { value, id } = e.target;
    const pattern = new RegExp(e.target.pattern);
    setFormData((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
    if (!pattern.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errorMessages[id],
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  }
  useEffect(() => {
    const noErrors = !errors.email && !errors.password;
    setIsValid(noErrors);
  }, [errors]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(loginStatus);
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("This email is not registered. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Error signing in:", error);
    }
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="layout h-[94vh] ">
      <div className="loginContainer relative h-full w-full">
        <div className="img1 absolute md:top-[-25px] md:right-[50%] md:w-auto translate-x-[50%] top-[52px] right-[50%] w-[80%]">
          <img src={loginImg} alt="e-learning-img" />
        </div>
        <div className="rounded-md login w-full lg:w-[50%] bg-white p-5 z-10  absolute top-[51%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-center font-semibold text-4xl font-mono text-[#3d3e5c]">
            {translate.Login}
          </h1>

          <form onSubmit={handleSubmit}>
            <input
              style={{ border: errors.email !== "" && "1px solid red" }}
              className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-2 px-3 w-full mt-6 "
              type="email"
              pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
              name="email"
              id="email"
              value={email}
              onChange={(e) => onChange(e)}
              placeholder={translate.EnterYourEmail}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}

            <div className="relative">
              <input
                style={{ border: errors.password !== "" && "1px solid red" }}
                className="bg-[#fffde5] border-gray-300 border rounded-md outline-none  mt-6 py-2 px-3 w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*])[A-Za-z\d@#$%*]{8,20}$"
                value={password}
                onChange={(e) => onChange(e)}
                placeholder={translate.EnterYourPassword}
              />
              {showPassword ? (
                <RiEyeOffFill
                  className="absolute top-[38px] right-3 cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <BsEyeFill
                  className="absolute top-[38px] right-3 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
            <Link
              className="cursor-pointer text-[#2e4b70]  mt-4 block"
              to="/forgotpassword"
            >
              {translate.ForgotYourPassword}
            </Link>
            <button
              type="submit"
              disabled={!isValid}
              className={`mt-3 bg-[#d3a058] hover:bg-[#d3a058da] py-2 px-7 rounded-md text-white font-semibold ${
                !isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {translate.Login}
            </button>
            <div className="flex before:border-t before:flex-1 before:border-gray-300 justify-center items-center  my-4 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center mx-4 ">{translate.OR}</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </div>
  );
}
