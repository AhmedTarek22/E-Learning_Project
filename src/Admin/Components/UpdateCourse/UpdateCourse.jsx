import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { db } from "../../../firebase-config";
import { toast } from "react-toastify";
import Spinner from "../../../Components/Spinner";

export default function UpdateCourse({
  isUpdateFormVisible,
  selectedCourse,
  handleCloseUpdateForm,
  setIsUpdateDataComplete,
}) {
  const [oldCourseForm, setOldCourseForm] = useState({
    image_480x270: "",
    title: "",
    visible_instructors: [{ display_name: "", image_100x100: "" }],
  });
  const [isLoading, setIsLoading] = useState(false);

  const [updateCourseData, setUpdateCourseData] = useState({
    course_name: "",
    instructor_name: "",
    courseImage: null,
    instructorImage: null,
  });

  const [courseImagePreview, setCourseImagePreview] = useState(null);
  const [instructorImagePreview, setInstructorImagePreview] = useState(null);

  const storage = getStorage();
  const courseImageInputRef = useRef(null);
  const instructorImageInputRef = useRef(null);

  useEffect(() => {
    async function fetchListing() {
      const courseId = selectedCourse.id.toString();
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOldCourseForm(docSnap.data());
        setUpdateCourseData({
          course_name: docSnap.data().title || "",
          instructor_name:
            docSnap.data().visible_instructors[0]?.display_name || "",
        });
      } else {
        toast.error("Course does not exist");
      }
    }
    if (selectedCourse?.id) {
      fetchListing();
    }
  }, [selectedCourse?.id]);

  function onChangeUpdateDate(e) {
    const { id, value, files } = e.target;

    if (files) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);

      if (id === "courseImage") {
        setUpdateCourseData((prevState) => ({
          ...prevState,
          courseImage: file,
        }));
        setCourseImagePreview(fileUrl);
      } else if (id === "instructorImage") {
        setUpdateCourseData((prevState) => ({
          ...prevState,
          instructorImage: file,
        }));
        setInstructorImagePreview(fileUrl);
      }
    } else {
      setUpdateCourseData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  }

  async function handleSubmit() {
    try {
      setIsLoading(true);
      const courseRef = doc(db, "courses", selectedCourse.id.toString());

      // رفع الصور إذا تم تحميل صور جديدة
      let courseImageUrl = oldCourseForm.image_480x270;
      let instructorImageUrl =
        oldCourseForm.visible_instructors[0].image_100x100;

      if (updateCourseData.courseImage) {
        const courseImageRef = ref(
          storage,
          `courses/${selectedCourse.id}_courseImage`
        );
        await uploadBytes(courseImageRef, updateCourseData.courseImage);
        courseImageUrl = await getDownloadURL(courseImageRef);
      }

      if (updateCourseData.instructorImage) {
        const instructorImageRef = ref(
          storage,
          `courses/${selectedCourse.id}_instructorImage`
        );
        await uploadBytes(instructorImageRef, updateCourseData.instructorImage);
        instructorImageUrl = await getDownloadURL(instructorImageRef);
      }

      // إنشاء نسخة من بيانات المصفوفة لتحديثها بالكامل
      const updatedInstructors = oldCourseForm.visible_instructors.map(
        (instructor, index) => {
          if (index === 0) {
            return {
              ...instructor,
              display_name:
                updateCourseData.instructor_name || instructor.display_name,
              image_100x100: instructorImageUrl || instructor.image_100x100,
            };
          }
          return instructor;
        }
      );

      // تحديث البيانات في Firestore
      const updatePayload = {
        title: updateCourseData.course_name || oldCourseForm.title,
        image_480x270: courseImageUrl,
        visible_instructors: updatedInstructors,
      };

      await updateDoc(courseRef, updatePayload);
      setIsLoading(false);
      toast.success("Course updated successfully!");

      // تحديث البيانات في الحالة القديمة
      setOldCourseForm((prev) => ({
        ...prev,
        title: updateCourseData.course_name || prev.title,
        image_480x270: courseImageUrl,
        visible_instructors: updatedInstructors,
      }));

      handleCloseUpdateForm();
      setIsUpdateDataComplete(true);
    } catch (error) {
      toast.error("Failed to update course");
      console.error("Error updating document: ", error);
    }
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {isUpdateFormVisible && selectedCourse && (
        <div className="update w-screen mx-auto bg-gray-500 bg-opacity-[0.06] flex justify-center items-center shadow-md fixed bottom-0 top-0 right-0 left-0">
          <div className="update-form w-3/5 mx-auto h-4/5 bg-slate-50 rounded-xl shadow-sm">
            <div className="imgs-update flex justify-evenly p-5 h-1/2">
              <div className="course-img relative flex flex-col justify-center items-center w-1/3 h-full">
                <img
                  className="h-36 w-36 border bottom-4 border-amber-500 shadow-md rounded-full"
                  src={courseImagePreview || oldCourseForm.image_480x270}
                  alt="Course"
                />
                <div
                  className="edit-icon absolute top-32 border-2 border-amber-700 right-1/3 rounded-full flex justify-center items-center w-9 h-9 bg-slate-200 cursor-pointer shadow-sm"
                  onClick={() => courseImageInputRef.current.click()}
                >
                  <i className="fa-solid fa-pen text-lg cursor-pointer"></i>
                </div>
                <input
                  type="file"
                  ref={courseImageInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="courseImage"
                  onChange={(e) => onChangeUpdateDate(e)}
                />
              </div>
              <div className="instructor-img relative flex flex-col justify-center items-center w-1/3 h-full">
                <img
                  className="h-36 w-36 bottom-4 border border-amber-500 shadow-md rounded-full"
                  src={
                    instructorImagePreview ||
                    oldCourseForm.visible_instructors[0].image_100x100
                  }
                  alt="Instructor"
                />
                <div
                  className="edit-icon absolute top-32 border-2 border-amber-700 right-1/3 rounded-full flex justify-center items-center w-9 h-9 bg-slate-200 cursor-pointer shadow-sm"
                  onClick={() => instructorImageInputRef.current.click()}
                >
                  <i className="fa-solid fa-pen text-lg cursor-pointer"></i>
                </div>
                <input
                  type="file"
                  ref={instructorImageInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="instructorImage"
                  onChange={(e) => onChangeUpdateDate(e)}
                />
              </div>
            </div>

            <div className="p-8 flex justify-evenly items-center">
              <div className="instructor-name relative flex flex-col w-1/3">
                <label className="font-medium" htmlFor="course_name">
                  Course Name Edit
                </label>
                <input
                  placeholder="Enter new name"
                  className="p-1 bg-amber-100 bg-opacity-5 mt-2 h-10 rounded-md border border-amber-600 outline-2 outline-fuchsia-700"
                  type="text"
                  id="course_name"
                  value={updateCourseData.course_name}
                  onChange={(e) => onChangeUpdateDate(e)}
                />
                <button
                  onClick={handleCloseUpdateForm}
                  className="w-44 rounded-md p-3 bg-black hover:bg-slate-700 text-white mt-14"
                >
                  Cancel
                </button>
              </div>
              <div className="instructor-name relative flex flex-col w-1/3">
                <label className="font-medium" htmlFor="instructor_name">
                  Instructor Name Edit
                </label>
                <input
                  placeholder="Enter new name"
                  className="p-1 bg-amber-100 bg-opacity-5 mt-2 h-10 rounded-md border border-amber-600 outline-2 outline-fuchsia-700"
                  type="text"
                  id="instructor_name"
                  value={updateCourseData.instructor_name}
                  onChange={(e) => onChangeUpdateDate(e)}
                />
                <button
                  onClick={handleSubmit}
                  className="w-44 rounded-md p-3 ms-auto bg-[#d97706] hover:bg-[#d97706d7] text-white mt-14"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
