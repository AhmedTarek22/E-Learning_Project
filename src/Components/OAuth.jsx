import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import Spinner from "./Spinner";

function OAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  async function onGoogleRegister() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setIsLoading(true);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          data: {
            fullName: user.displayName,
            email: user.email,
            timestamp: serverTimestamp(),
          },
          myCourses: {},
        });
      }
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  }
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <button
      type="button"
      onClick={onGoogleRegister}
      className="uppercase w-full bg-[#d97706] hover:opacity-80 text-white py-[10px] rounded text-md flex justify-center items-center mt-1"
    >
      <FcGoogle className="mr-2 bg-white rounded-full text-2xl" />
      continue with google
    </button>
  );
}

export default OAuth;
