import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import Spinner from "../Spinner";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const inputRef = useRef();

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!email) {
      inputRef.current.style.border = "1px solid red";
      return toast.warning("please fill your email");
    }
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.error("Email does not exist in the database");
      } else {
        setIsLoading(true);
        await sendPasswordResetEmail(auth, email);
        setIsLoading(false);
        toast.success("Email was send successfully");
      }
    } catch (error) {
      toast.error("could not send reset password");
    }
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="mt-[80px]">
      <h1 className="text-center text-3xl mt-6 font-bold">Forgot Password</h1>
      <div className="container mx-auto flex my-10 space-x-[5%] flex-wrap justify-evenly">
        <div className="imgContainer w-[100%] md:w-[40%] mx-5  ">
          <img
            className="max-w-full rounded-[1rem] "
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="singin img"
          />
        </div>
        <div className="formcontainer  w-[100%] md:w-[40%] !mx-5">
          <form onSubmit={onSubmit}>
            <input
              ref={inputRef}
              onFocus={() => {
                inputRef.current.style.border = "1px solid blue";
              }}
              onBlur={() => {
                if (!inputRef.current.value) {
                  inputRef.current.style.border = "1px solid red";
                }
              }}
              className="my-6 w-full px-3 py-3 rounded bg-white text-gray-700 lowercase text-md placeholder:uppercase border-2"
              type="text"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
            />
            <div className="flex justify-between text-[15px] md:text-lg  flex-col lg:flex-row">
              <div>
                <p>
                  Don't have an account?
                  <Link
                    to={"/register"}
                    className="text-red-600 ml-1 hover:text-red-700  transition duration-100 ease-in-out"
                  >
                    Register
                  </Link>
                </p>
              </div>
              <div>
                <Link to={"/login"} className="text-black block">
                  Sign in instead
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className=" bg-[#d97706] text-white uppercase w-full py-[10px] mt-6 rounded hover:bg-[#d977068e] transition duration-200 ease-in-out"
            >
              send reset email
            </button>
            <div className="flex before:border-t before:flex-1 before:border-gray-300 justify-center items-center  my-4 after:border-t after:flex-1 after:border-gray-300"></div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
