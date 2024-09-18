import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../Redux/wishlistSlice";
import { Link } from "react-router-dom";

function WishList() {
  const translate = useSelector((state) => state.language.translation);

  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="my-wishlist max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg min-h-[67vh]">
      <h1 className="text-3xl font-bold mb-6">{translate.MyWishlist}</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {wishlist.map((course) => (
            <div key={course.id} className="bg-white shadow-md rounded-xl p-4">
              <Link to={`/courses/${course.id}`}>
                <img
                  src={course.image_480x270}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <h2 className="text-xl font-semibold mt-4">{course.title}</h2>
              </Link>
              <div className="flex items-center mt-4">
                <img
                  src={course.visible_instructors[0].image_100x100}
                  alt={course.visible_instructors[0].display_name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <p className="text-gray-600">
                  {course.visible_instructors[0].display_name}
                </p>
              </div>
              <p className="text-gray-600 mb-4">{course.headline}</p>
              <button
                onClick={() => handleRemoveFromWishlist(course.id)}
                className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition"
              >
                {translate.RemoveFromWishlist}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-gray-600">{translate.YourWishlistIsEmpty}</p>
      )}
    </div>
  );
}

export default WishList;
