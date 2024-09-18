import { createContext, useContext, useState } from "react";

const CoursesContext = createContext();

function CoursesProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <CoursesContext.Provider value={{ loginStatus, setLoginStatus }}>
      {children}
    </CoursesContext.Provider>
  );
}

function useCoursesContext() {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error("useCoursesContext must be used within a CoursesProvider");
  }
  return context;
}

export { CoursesProvider, useCoursesContext };
