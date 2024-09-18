import { useState } from "react";
import { auth, db } from "../../firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../Home/Components/ButtonComponent";
import Spinner from "../Spinner";

export default function Profile() {
  //   // const x = 5;
  //   // console.log(auth);
  //   let userData;
  //   const user = auth.currentUser;
  //   console.log(user);

  //   // console.log(db);

  // const docRef = doc(db, "users", user.uid);
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   // console.log("Document data:", docSnap.data().fullName);
  //   userData = docSnap.data();
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  const user = auth.currentUser;
  const translate = useSelector((state) => state.language.translation);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });


  const [originalUserData, setOriginalUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState({
    fullNameError: "",
    phoneError: "",
    generalError: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setOriginalUserData(docSnap.data());

            console.log(docSnap.data());

            // تحديث حالة userData بالبيانات المستلمة
          } else {
            setError({
              ...error,
              generalError: "No such document!",
            }); // إذا لم توجد الوثيقة
          }
        } else {
          setError({
            ...error,
            generalError: "No user is signed in.",
          }); // إذا لم يكن هناك مستخدم مسجل
        }
      } catch (err) {
        setError({
          ...error,
          generalError: "Failed to load user data.",
        }); // التعامل مع الأخطاء
        console.error("Error fetching user data:", err);
      } finally {
        setIsLoading(false); // تحديد أن الجلب قد اكتمل
      }
    };

    fetchUserData(); // استدعاء الدالة عند تحميل المكون
  }, []);

  const validFullName = /^[a-zA-Z\s]{3,50}$/;
  const validPhone = /^\d{7,15}$/;

  const handleUserData = (e) => {
    if (e.target.name === "fullName") {
      setUserData({
        ...userData,
        fullName: e.target.value,
      });
      setError({
        ...error,
        fullNameError:
          !validFullName.test(e.target.value) &&
          "Please enter a valid full name (3-50 letters).",
      });
    } else if (e.target.name === "phone") {
      setUserData({
        ...userData,
        phone: e.target.value,
      });
      setError({
        ...error,
        phoneError:
          !validPhone.test(e.target.value) &&
          "Please enter a valid phone number (7-15 numbers).",
      });
    }
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, userData);
        toast.success(translate.UpdateUserData);
      } else {
        setError({
          ...error,
          generalError: "No user is signed in.",
        });
      }
    } catch (err) {
      setError({
        ...error,
        generalError: "Failed to update user data.",
      });
      console.error("Error updating user data:", err);
    }
  };

  const [iconUpdate, setIconUpdate] = useState(false);
  const handleToUpdate = () => {
    iconUpdate ? setIconUpdate(false) : setIconUpdate(true);
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setUserData(originalUserData);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        console.log(docRef);
        await deleteDoc(docRef);
        await user.delete();

        toast.success(translate.DeleteAccountDone);
        navigate("/login");
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    }
  };

  // if (isLoading) return <p>Loading...</p>; // عرض رسالة التحميل أثناء انتظار البيانات
  // if (error.generalError) return <p>{error.generalError}</p>;

  return (
    <div className="">
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <section className="layout py-12">
          <div className="w-full px-10 md:w-3/4 lg:w-1/2 m-auto">
            <div className="m-auto rounded bg-white relative">
              <figure className="w-10" onClick={handleToUpdate}>
                <img src="../../../public/update-icon.png" alt="" />
              </figure>
              <h4 className="text-2xl font-bold text-center pt-[100px]">
                {translate.EditYourProfileDetails}
              </h4>
              <form className="px-[10%] py-10">
                <figure className="w-[80px] absolute left-1/2 -translate-x-1/2 top-[-40px]">
                  <img
                    className="w-full"
                    src="../../../public/undraw_pic_profile_re_7g2h.svg"
                    alt=""
                  />
                </figure>
                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.FullName}
                  </label>
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    pattern="^[a-zA-Z\s]{2,50}$"
                    name="fullName"
                    value={userData.fullName || ""}

                    onChange={iconUpdate ? (e) => handleUserData(e) : null}
                  />
                  {error.fullNameError && (
                    <span className="text-red-500">{error.fullNameError}</span>
                  )}
                </div>

                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.Email || ""}

                  </label>
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    value={userData.email}
                    readOnly
                  />
                </div>

                <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold" htmlFor="">
                      {translate.Country}
                    </label>
                    <input
                      className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                      type="text"
                      value={userData.country || ""}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="font-bold" htmlFor="">
                      {translate.City}
                    </label>
                    <input
                      className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                      type="text"
                      value={userData.city || ""}

                      readOnly
                    />
                  </div>
                </div>

                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.PhoneNumber}

                  </label>
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"

                    name="phone"
                    value={userData.phone || ""}
                    onChange={iconUpdate ? (e) => handleUserData(e) : null}
                  />
                  {error.phoneError && (
                    <span className="text-red-500">{error.phoneError}</span>
                  )}
                </div>

                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.ResetPassword}
                  </label>
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    placeholder="password"
                  />
                </div>

                <div className="mt-10 flex justify-between flex-col md:flex-row gap-5 md:gap-0">
                  {/* <button onClick={(e) => handleCancelBtn(e)} className="bg-[#676767] px-4 py-1 rounded-md">
                    {translate.Cancel}
                  </button> */}
                  <ButtonComponent
                    onClick={(e) => handleCancelBtn(e)}
                    nameBtn={translate.Cancel}
                  ></ButtonComponent>
                  <button
                    onClick={(e) => handleUpdateData(e)}
                    className="bg-[#EFA400] px-4 py-1 text-white rounded-md"
                  >
                    {translate.UpdateProfile}
                  </button>
                </div>
                {/* <button onClick={(e) => handleDeleteAccount(e)} className="bg-[#EFA400] px-4 mt-7 py-1 w-full text-white rounded-md">
                    {translate.DeleteAccount}
                </button> */}


              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
