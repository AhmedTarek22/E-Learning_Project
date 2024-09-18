import { useEffect, useRef, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeOffFill } from "react-icons/ri";
import OAuth from "../OAuth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import registerImg from "../../assets/register.png";
import { useSelector } from "react-redux";

export default function Register() {
  const translate = useSelector((state) => state.language.translation);

  const fullNameInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);
  const cityInput = useRef(null);
  const repasswordInput = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "Egypt",
    city: "",
    phone: "",
    password: "",
    repassword: "",
  });
  const { fullName, email, country, city, phone, password, repassword } =
    formData;
  const navigate = useNavigate();

  // errors msgs
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    city: "",
    phone: "",
    password: "",
    repassword: "",
  });

  const errorMessages = {
    fullName: "Please enter a valid full name (2-50 letters).",
    email: "Please enter a valid email address (ex: iti@gmail.com).",
    phone: "Please enter a valid phone number (7-15 numbers)",
    city: "Please enter a valid city name (2-50 letters)",
    password:
      "Password must have 1 uppercase, 1 number, and 1 special character (@#$%*)",
    repassword:
      "Password must have 1 uppercase, 1 number, and 1 special character (@#$%*)",
  };

  function onChange(e) {
    const { value, id } = e.target;
    const pattern = new RegExp(e.target.pattern);

    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
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
    const noErrors =
      !errors.fullName &&
      !errors.email &&
      !errors.city &&
      !errors.password &&
      !errors.repassword &&
      !errors.phone;

    setIsValid(noErrors && password === repassword);
  }, [errors, password, repassword]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!fullName || !email || !phone || !city || !password || !repassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== repassword) {
      toast.error(
        "Passwords do not match. Please make sure both passwords are the same."
      );
      return;
    }

    if (!isValid) return;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });

      // update Ahmed
      const formDataCopy = {
        data: {
          ...formData,
          role: "user",
          timestamp: serverTimestamp(),
        },
        myCourses: {},
      };
      delete formDataCopy.data.password;
      delete formDataCopy.data.repassword;
      // formDataCopy.timestamp = serverTimestamp();
      // formDataCopy.role = "user";
      console.log(formData);

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/");
    } catch (error) {
      console.log(error.code);
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
      } else if (error.code === "auth/email-already-in-use") {
        toast.error(
          "This email is already registered. Please sign in instead."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Error signing in:", error);
    }
  }

  return (
    <div className="layout bg-gradient-to-r h-[94vh]">
      <div className="text bg-gradient-to-r pt-[60px]">
        <div className="registerForm bg-white shadow-xl px-3 lg:pl-[60px] container mx-auto min-h-[600px] py-[40px] rounded-xl ">
          <h2 className="hero-text text-2xl font-bold mr-6 mb-4 ">
            {translate.Welcome}
          </h2>
          <h2>
            <span className="font-bold text-xs ">
              {translate.AlreadyHaveAnAccount}
              <FaCaretRight className="inline text-lg mb-1 mr-3" />
            </span>
            <Link to="/login" className="hero-text font-bold ">
              {translate.Signin}
            </Link>
          </h2>
          <h3 className="text-[#d3a058] font-bold mb-10 mt-5">
            {translate.RegisterNow}
          </h3>
          <div className="box flex flex-col-reverse md:flex-row">
            <form
              className="flex flex-col w-full lg:w-1/2 "
              onSubmit={(e) => handleSubmit(e)}
            >
              <label htmlFor="fullName">{translate.FullName}</label>
              <input
                ref={fullNameInput}
                style={{ border: errors.fullName !== "" && "1px solid red" }}
                className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-1 px-3 "
                type="text"
                name="fullName"
                id="fullName"
                pattern="^[a-zA-Z\s]{2,50}$"
                value={fullName}
                onChange={(e) => onChange(e)}
              />
              {errors.fullName && (
                <span className="text-red-500">{errors.fullName}</span>
              )}
              <label htmlFor="email">{translate.Email}</label>
              <input
                ref={emailInput}
                style={{ border: errors.email !== "" && "1px solid red" }}
                className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-1 px-3"
                type="email"
                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                name="email"
                id="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
              <div className="flex justify-between items-center flex-col md:flex-row gap-3">
                <div className="select flex flex-col flex-1 w-full">
                  <label htmlFor="country">{translate.Country}</label>
                  <select
                    className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-1 px-3 w-full"
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => onChange(e)}
                  >
                    <option value="egypt">{translate.Egypt}</option>
                    <option value="saudi arabia">
                      {translate.SaudiArabia}
                    </option>
                    <option value="morocco">{translate.Morocco}</option>
                    <option value="jordan">{translate.Jordan}</option>
                  </select>
                </div>
                <div className="city flex flex-col flex-1 w-full">
                  <label htmlFor="city" className="mt-4">
                    {translate.City}
                  </label>
                  <input
                    ref={cityInput}
                    style={{ border: errors.city !== "" && "1px solid red" }}
                    className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-1 px-3 w-full"
                    type="text"
                    pattern="^[a-zA-Z\s]{2,50}$"
                    name="city"
                    id="city"
                    value={city}
                    onChange={(e) => onChange(e)}
                  />
                  {errors.city && (
                    <span className="text-red-500">{errors.city}</span>
                  )}
                </div>
              </div>
              <label htmlFor="phone">{translate.PhoneNumber}</label>
              <input
                ref={phoneInput}
                style={{ border: errors.phone !== "" && "1px solid red" }}
                className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-1 px-3"
                type="text"
                pattern="^\d{7,15}$"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => onChange(e)}
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone}</span>
              )}
              <label htmlFor="password">{translate.Password}</label>
              <div className="relative">
                <input
                  ref={passwordInput}
                  style={{ border: errors.password !== "" && "1px solid red" }}
                  className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-1 px-3 w-full"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*])[A-Za-z\d@#$%*]{8,20}$"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
                {showPassword ? (
                  <RiEyeOffFill
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <BsEyeFill
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
              <label htmlFor="repassword">{translate.ConfirmPassword}</label>
              <div className="relative">
                <input
                  ref={repasswordInput}
                  style={{
                    border: errors.repassword !== "" && "1px solid red",
                  }}
                  className="bg-[#fffde5] border-gray-300 border rounded-md outline-none py-1 px-3 w-full"
                  type={showRePassword ? "text" : "password"}
                  name="repassword"
                  id="repassword"
                  pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%*])[A-Za-z\d@#$%*]{8,20}$"
                  value={repassword}
                  onChange={(e) => onChange(e)}
                />
                {showRePassword ? (
                  <RiEyeOffFill
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setShowRePassword(false)}
                  />
                ) : (
                  <BsEyeFill
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={() => setShowRePassword(true)}
                  />
                )}
              </div>
              {errors.repassword && (
                <span className="text-red-500">{errors.repassword}</span>
              )}
              {password && repassword && password !== repassword && (
                <span className="text-red-500">
                  {translate.PasswordsDoNotMatch}
                </span>
              )}
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-3 bg-[#d3a058] p-2 rounded-md text-white font-semibold ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {translate.Register}
              </button>
              <div className="flex before:border-t before:flex-1 before:border-gray-300 justify-center items-center  my-4 after:border-t after:flex-1 after:border-gray-300">
                <p className="text-center mx-4">{translate.OR}</p>
              </div>
              <OAuth />
            </form>
            <div className="imgContainer w-full lg:w-[50%]">
              <img src={registerImg} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
