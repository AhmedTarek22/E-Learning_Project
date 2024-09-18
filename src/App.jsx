import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import Courses from "./Components/Courses/Courses";
import ContactUs from "./Components/ConatctUs/ContactUs";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import MyCourses from "./Components/MyCourses/MyCourses";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import { ToastContainer } from "react-toastify";
import Profile from "./Components/Profile/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import { CoursesProvider } from "./Context/CoursesProvider";
import WishList from "./Components/WishList/WishList";
import Admin from "./Admin/Components/AdminPage/Admin";
import UpdateCourse from "./Admin/Components/UpdateCourse/UpdateCourse";
import AddCourse from "./Admin/Components/AddCourse/AddCourse";
import CourseDetails from "./Components/ProductDetails/CourseDetails";
import { store } from "./Redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CourseDetailsAdmin from "./Admin/Components/AdminPage/CourseDetailsAdmin";

import { Provider, useSelector } from "react-redux";
import { AuthProvider } from "./Context/AuthContext";
import CheckUserRole from "./Components/checkUserRole";
import Unauthorized from "./Components/Unauthorized";


let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "courses", element: <Courses /> },
      {
        path: "mycourses",
        element: <PrivateRoute />,
        children: [{ path: "", element: <MyCourses /> }],
      },

      { path: "/courses/:id", element: <CourseDetails /> },
      { path: "/admin/courses/:id", element: <CourseDetailsAdmin /> },

      {
        path: "mywishlist",
        element: <PrivateRoute />,
        children: [{ path: "", element: <WishList /> }],
      },
      { path: "contact", element: <ContactUs /> },
      { path: "login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/forgotpassword", element: <ForgotPassword /> },
      { path: "/unauthorized", element: <Unauthorized /> },
      {
        path: "profile",
        element: <PrivateRoute />,
        children: [{ path: "", element: <Profile /> }],
      },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "admin",
    element: <CheckUserRole />,
    children: [
      {
        path: "",
        element: <Admin />,

        children: [
          { path: "updatecourse", element: <UpdateCourse /> },
          { path: "addcourse", element: <AddCourse /> },
        ],
      },
    ],
  },
]);
let query = new QueryClient();
function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={query}>
          <Provider store={store}>
            <CoursesProvider>
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
              <RouterProvider router={routers}></RouterProvider>
            </CoursesProvider>
          </Provider>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;
