import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../Redux/wishlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase-config";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

function CourseItem({ course }) {

  const [isdisable, setisDisable] = useState(false);


  const translate = useSelector((state) => state.language.translation);

  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const handleAddToFavorites = (course) => {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      setIsFavorite(false);
      dispatch(removeFromWishlist(course.id));
      toast.info(translate.messageDeleteFromWish);
    } else {
      setIsFavorite(true);
      dispatch(addToWishlist(course));
      toast.success(translate.MessageAddedToWish);
    }
  };

  const user = auth.currentUser;

  const handleAddToMyCourses = async (course) => {
    setisDisable(true);
    try {
      console.log(user);

      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          myCourses: arrayUnion(course),
        });
        toast.success("course successfully added to your courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-80 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl ">
      <div className="project-img relative cursor-pointer">
        <Link
          to={`/courses/${course.id}`}
          className="text-blue-500 hover:underline"
        >
          <img
            src={course.image_480x270}
            alt="Course"
            className="h-80 w-80 object-cover rounded-t-xl"
          />
        </Link>
        <div
          onClick={() => handleAddToFavorites(course)}
          className={`cursor-pointer fav-icon absolute top-2 right-3 w-11 h-11 rounded-full flex justify-center items-center text-lg text-black bg-white bg-opacity-40 z-20  ${
            isFavorite
              ? "border-red-600 text-red-600"
              : "border-gray-300 text-gray-500"
          }`}
        >
          {isFavorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
        </div>
      </div>
      <div className="px-4 py-3 w-80 relative">
        <span className="text-gray-400 mr-3 uppercase text-xs ">
          {course.visible_instructors[0].display_name}
        </span>
        <span className="absolute right-0 bottom-[67%]">
          <img
            className="rounded-full w-[80px]"
            src={course.visible_instructors[0].image_100x100}
            alt=""
          />
        </span>
        <p className="text-lg font-semibold text-black truncate block capitalize py-2">
          {course.title}
        </p>
        <div className="flex items-center">
          <p className="text-green-500">Free</p>

          <div className="ml-auto">
            <button
              disabled={isdisable}
              onClick={() => handleAddToMyCourses(course)}
              className={`${
                isdisable
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-amber-600  hover:bg-amber-700"
              } py-1 px-2 text-white text-sm font-medium rounded-md`}

            >
              {translate.Enroll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
