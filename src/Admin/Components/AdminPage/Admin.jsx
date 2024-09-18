import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  addDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase-config";
import Spinner from "../../../Components/Spinner";
import { toast } from "react-toastify";
import CourseItemAdmin from "./CourseItemAdmin";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import UpdateCourse from "../UpdateCourse/UpdateCourse";

export default function Admin() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [NewCourseName, setNewCourseName] = useState("");
  const [NewInstructorName, setNewInstructorName] = useState("");
  const [NewCourseImg, setNewCourseImg] = useState(null);
  const [NewInstructorImg, setNewInstructorImg] = useState(null);
  const [NewCourseImgPreview, setNewCourseImgPreview] = useState(null);
  const [NewInstructorImgPreview, setNewInstructorImgPreview] = useState(null);
  const [isUpdateDataComplete, setIsUpdateDataComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [isUpdateDataComplete]);

  async function fetchCourses() {
    setLoading(true);
    try {
      const coursesCollection = collection(db, "courses");
      let q = query(coursesCollection, limit(50));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No courses found.");
        setCourses([]);
        return;
      }

      const coursesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredCourses = coursesList.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      setCourses(filteredCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  }

  const [courseName, setCourseName] = useState(selectedCourse?.title || "");
  const [instructorName, setInstructorName] = useState(
    selectedCourse?.visible_instructors[0]?.display_name || ""
  );

  const loadMoreCourses = async () => {
    if (!lastVisible) return;
    setLoading(true);
    try {
      const coursesCollection = collection(db, "courses");
      const q = query(coursesCollection, startAfter(lastVisible), limit(50));
      const querySnapshot = await getDocs(q);

      const coursesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredCourses = coursesList.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      setCourses((prevCourses) => [...prevCourses, ...filteredCourses]);
    } catch (error) {
      console.error("Error fetching more courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
    setSearchTerm(value);
  };

  const handleSearchClick = () => {
    setSearching(true);
    fetchCourses();
  };

  const handleCloseUpdateForm = () => {
    setIsUpdateFormVisible(false);
    setSelectedCourse(null);
  };

  const handleAddCancel = () => {
    setShowForm(false);
  };

  const handleNewCourseImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewCourseImg(file);
      const reader = new FileReader();
      reader.onload = () => setNewCourseImgPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNewInstructorImgChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewInstructorImg(file);
      const reader = new FileReader();
      reader.onload = () => setNewInstructorImgPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNewSubmit = async () => {
    if (!NewCourseImg || !NewInstructorImg) {
      toast.error("Please upload both course and instructor images");
      return;
    }

    async function storeImages(image) {
      setLoading(true);
      return new Promise((res, rej) => {
        const storage = getStorage();
        const imageName = `${auth.currentUser.uid}-${uuidv4()}`;
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log("There is an error");
            }
          },
          (error) => {
            rej(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              res(downloadURL);
            });
          }
        );
      });
    }

    try {
      const images = [NewCourseImg, NewInstructorImg];
      const imgUrls = await Promise.all(
        images.map((image) => storeImages(image))
      );

      console.log(imgUrls);
      toast.success("Images uploaded successfully");

      const formCopy = {
        timestamp: Timestamp.now(),
        image_480x270: imgUrls[0],
        title: NewCourseName,
        visible_instructors: [
          { display_name: NewInstructorName, image_100x100: imgUrls[1] },
        ],
      };

      const docRef = await addDoc(collection(db, "courses"), formCopy);
      toast.success("Course added successfully");
      navigate(`/admin/courses/${docRef.id}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Sorry, can't add this course");
      setLoading(false);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  return (
    <>
      <div className="layout w-full pb-24">
        <div className="welcome w-4/5 mx-auto pt-24">
          <h2 className="p-20 rounded-lg text-center text-4xl bg-amber-600 text-white">
            Welcome To Admin Panel
          </h2>
        </div>
        <div className="text-center p-10">
          <h1 className="font-bold text-4xl mb-4">All Courses</h1>
          <div className="flex justify-center space-x-2">
            <input
              type="text"
              placeholder="Search for courses..."
              value={searchTerm}
              onChange={handleSearch}
              pattern="[A-Za-z\s]*"
              className="p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSearchClick}
              className="px-4 py-2 bg-[#d97706] hover:bg-[#d97706d7] transition ease-in-out text-white rounded"
            >
              Search
            </button>
          </div>
        </div>
        <div className="container mx-auto ">
          <button
            className="p-3 mb-2  bg-green-300 rounded-md w-48 border-2 border-green-500 bg-opacity-30 border-solid"
            onClick={() => setShowForm(true)}
          >
            Add Product
          </button>
        </div>
        {showForm && (
          <div className="add w-screen z-10 mx-auto bg-gray-500 bg-opacity-45 flex justify-center items-center shadow-md fixed bottom-0 top-0 right-0 left-0">
            <div className="add-form w-3/5 mx-auto h-4/5 bg-amber-50 rounded-xl shadow-sm">
              <div className="imgs-add flex justify-evenly p-5 h-1/2 ">
                <div className="course-add-img w-2/5">
                  <label
                    htmlFor="file-input-course"
                    className="cursor-pointer flex flex-col justify-center items-center h-full border border-dashed border-gray-300 rounded-lg p-4"
                  >
                    <span className="font-semibold text-gray-600">
                      Course Image
                    </span>
                    <input
                      id="file-input-course"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleNewCourseImgChange}
                    />
                    {NewCourseImgPreview && (
                      <img
                        src={NewCourseImgPreview}
                        alt="Course"
                        className="w-full h-full object-contain mt-2"
                      />
                    )}
                  </label>
                </div>

                <div className="instructor-add-img w-2/5">
                  <label
                    htmlFor="file-input-instructor"
                    className="cursor-pointer flex flex-col justify-center items-center h-full border border-dashed border-gray-300 rounded-lg p-4"
                  >
                    <span className="font-semibold text-gray-600">
                      Instructor Image
                    </span>
                    <input
                      id="file-input-instructor"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleNewInstructorImgChange}
                    />
                    {NewInstructorImgPreview && (
                      <img
                        src={NewInstructorImgPreview}
                        alt="Instructor"
                        className="w-full h-full object-contain mt-2"
                      />
                    )}
                  </label>
                </div>
              </div>
              <div className="inputs-add flex justify-evenly p-5 h-1/2 items-center flex-col">
                <div className="w-full flex justify-evenly items-center ">
                  <input
                    type="text"
                    placeholder="New Course Name"
                    value={NewCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="p-2 w-2/5 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="New Instructor Name"
                    value={NewInstructorName}
                    onChange={(e) => setNewInstructorName(e.target.value)}
                    className="p-2 w-2/5 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="w-1/2 mx-auto">
                  <button
                    className="p-2 w-full bg-green-400 rounded-lg text-white font-bold"
                    onClick={handleNewSubmit}
                  >
                    Add New Course
                  </button>
                  <button
                    className="p-2 mt-2 w-full bg-red-400 rounded-lg text-white font-bold"
                    onClick={handleAddCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {loading && <Spinner />}
        <div className="container mx-auto">
          {courses.map((course) => (
            <CourseItemAdmin
              key={course.id}
              course={course}
              setIsUpdateFormVisible={setIsUpdateFormVisible}
              setSelectedCourse={setSelectedCourse}
            />
          ))}
        </div>
        {!searching && (
          <div className="load-more w-full text-center mt-8">
            <button
              onClick={loadMoreCourses}
              className="px-4 py-2 bg-[#d97706] hover:bg-[#d97706d7] transition ease-in-out text-white rounded"
            >
              Load More
            </button>
          </div>
        )}
        <UpdateCourse
          isUpdateFormVisible={isUpdateFormVisible}
          selectedCourse={selectedCourse}
          handleCloseUpdateForm={handleCloseUpdateForm}
          setIsUpdateDataComplete={setIsUpdateDataComplete}
        />
      </div>
    </>
  );
}
