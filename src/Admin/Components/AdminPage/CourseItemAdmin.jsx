import { useState } from "react";
import { ModalComponent } from "./ModalComponent";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { toast } from "react-toastify";

function CourseItemAdmin({
  course,
  setSelectedCourse,
  setIsUpdateFormVisible,
  courses,
  setCourses,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
    console.log(showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    console.log(showModal);
  };
  const handleDelete = async (id) => {
    const courseId = id.toString();
    try {
      const docRef = doc(db, "courses", courseId);
      await deleteDoc(docRef);

      if (!courses) {
        console.error("Courses list is not defined");
        return;
      }
      const updatedCourses = courses.filter((course) => course.id !== id);
      setCourses(updatedCourses);
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.success("Course deleted successfully");
    } finally {
      console.log("Item deletion attempt finished");
      toast.success("Course deleted successfully");
      handleCloseModal();
    }
  };

  const handleUpdateClick = (course) => {
    setSelectedCourse(course);
    setIsUpdateFormVisible(true);
  };
  return (
    <div className="course-card shadow-md flex mb-9 p-4 bg-white bg-opacity-70 rounded-lg w-4/5 mx-auto">
      <div className="card-img w-1/4 relative">
        <img
          src={course.image_480x270}
          alt="Course"
          className="course-avatar h-40 w-40 object-cover rounded-xl"
        />
        <img
          className="instructor-avatar rounded-full w-[60px] absolute bottom-3 right-14"
          src={course.visible_instructors[0].image_100x100}
          alt=""
        />
      </div>
      <div className="card-data w-1/3 relative">
        <p className="text-lg font-semibold text-black truncate block capitalize py-2">
          {course.title}
        </p>
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {course.visible_instructors[0].display_name}
        </span>
      </div>

      <div className="buttons mx-auto flex flex-col justify-end items-center">
        <button
          onClick={handleOpenModal}
          className="delete-button p-2 rounded-md w-48 border-2 border-red-500 bg-opacity-30 border-solid bg-red-500"
        >
          <i className="fa-regular fa-trash-can"></i> Delete
        </button>
        {showModal && (
          <ModalComponent
            isOpen={handleOpenModal}
            onClose={handleCloseModal}
            onDelete={() => handleDelete(course.id)}
          />
        )}
        <button
          className="update-button p-2 rounded-md w-48 border-2 mt-5 border-blue-500 bg-opacity-30 border-solid bg-blue-500"
          onClick={() => handleUpdateClick(course)}
        >
          <i className="fa-solid fa-pen-to-square"></i> Update
        </button>
      </div>
    </div>
  );
}

export default CourseItemAdmin;
