import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { useCoursesContext } from "../Context/CoursesProvider";

export function useAuthStatus() {
  const [isLoading, setIsLoading] = useState(true);
  const { loginStatus, setLoginStatus } = useCoursesContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [setLoginStatus]);
  return { loginStatus, isLoading };
}
