import { useState } from "react";
import { auth, db } from "../../firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../ButtonComponent";
import Spinner from "../Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/web-extension";

export default function Profile() {
  const user = auth.currentUser;
  const translate = useSelector((state) => state.language.translation);
  const navigate = useNavigate();

  const [checklogin, setIsLogin] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    password: "",
  });

  // let userPass = user.p

  const [currentPassword,setCurrentPassword] = useState("");

  const [originalUserData, setOriginalUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState({
    fullNameError: "",
    phoneError: "",
    passwordError: "",
    generalError: "",
  });

  const [isValid, setIsValid] = useState(false);
  useEffect(() =>{
    const noError = !error.fullNameError && !error.phoneError && !error.generalError ;
    setIsValid(noError);
  }, [error])


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data().data);
            setOriginalUserData(docSnap.data().data);
          } else {
            setError({
              ...error,
              generalError: `${translate.NoData}`,
            });
          }
        } else {
          setError({
            ...error,
            generalError: `${translate.NotSigned}`,
          });
        }
      } catch (err) {
        setError({
          ...error,
          generalError: `${translate.FailedToUpdate}`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validFullName = /^[a-zA-Z\s]{3,50}$/;
  const validPhone = /^\d{7,15}$/;

  const handleUserData = (e) => {
    if (e.target.name === "fullName") {
      setUserData({
        ...userData,
        fullName: e.target.value,
      });
      // console.log(userData);
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
    } else if (e.target.name === "password"){
      setUserData({
        ...userData,
        password: e.target.value,
      });
      setError({
        ...error,
        passwordError: originalUserData.password !== e.target.value && "not password",
      })
    }
  };
  

  const handleUpdateData = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        if (newPassword !== "") {
          await updatePassword(user, newPassword);
        }
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          data: userData,
        });
        toast.success(translate.UpdateUserData);
      } else {
        setError({
          ...error,
          generalError: `${translate.NotSigned}`,
        });
      }
    } catch (err) {
      setError({
        ...error,
        generalError: `${translate.FailedToUpdate}`,
      });
    }
    setIconUpdate(true);
  };

  const [iconUpdate, setIconUpdate] = useState(true);
  const handleToUpdate = () => {
    // iconUpdate ? setIconUpdate(false) : setIconUpdate(true);
    setIconUpdate(false);    
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setUserData(originalUserData);
    setIconUpdate(true);
    setError({
      ...error,
      fullNameError: "",
      phoneError: "",
    })
  };

  useEffect(() => {
    if (checklogin) {
      localStorage.setItem("isLoggedIn", "true");
    }
  }, [checklogin]);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const docRef = doc(db, "users", user.uid);
        console.log(docRef);
        await deleteDoc(docRef);
        await user.delete();

        toast.success(translate.DeleteAccountDone);
        setIsLogin(false);
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const [newPassword,setNewPassword] = useState("");

  const [confirmNewPassword,setConfirmPassword] = useState("");
  const [errorNewPassword,setErrorNewPassword] = useState("")

  const handleNewPassword = (e) => {
    if (e.target.name === "newPassword") {
      setNewPassword(e.target.value);
      setErrorNewPassword(e.target.value !== confirmNewPassword ? "Passwords do not match" : "");
    } else if (e.target.name === "confirmNewPassword") {
      setConfirmPassword(e.target.value);
      setErrorNewPassword(newPassword !== e.target.value ? "Passwords do not match" : "");
    }
  }


  return (
    <div className="">
      {isLoading ? (
        <Spinner></Spinner>
      ) : (
        <section className="layout py-12">
          <div className="w-full px-10 md:w-3/4 lg:w-1/2 m-auto">
          <h2 className="text-5xl font-bold mt-3 mb-24 text-center">{translate.Profile}</h2>
            <div className="m-auto rounded bg-white relative">
              {iconUpdate && (
                <div className="w-10 ms-auto cursor-pointer" onClick={handleToUpdate}>
                  <FontAwesomeIcon
                    size="2x"
                    color="#EFA400"
                    icon={faPenToSquare}
                  />
                </div>
              )}
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
                  <div className="relative">
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    pattern="^[a-zA-Z\s]{2,50}$"
                    name="fullName"
                    value={userData.fullName}
                    onChange={!iconUpdate ? (e) => handleUserData(e) : null}
                  />
                  {!iconUpdate && <FontAwesomeIcon size="lg" className="absolute right-3 top-1/2 -translate-y-2/4" color="#EFA400" icon={faPencil} />}
                  </div>
                  {error.fullNameError && (
                    <span className="text-red-500">{error.fullNameError}</span>
                  )}
                </div>

                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.Email}
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
                      value={userData.country}
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
                      value={userData.city}
                      readOnly
                    />
                  </div>
                </div>

                <div className="my-4 relative">
                  <label className="font-bold" htmlFor="">
                    {translate.PhoneNumber}
                  </label>
                  <div className="relative">
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={!iconUpdate ? (e) => handleUserData(e) : null}
                  />
                  {!iconUpdate && <FontAwesomeIcon size="lg" className="absolute right-3 top-1/2 -translate-y-2/4" color="#EFA400" icon={faPencil} />}
                  </div>
                  {error.phoneError && (
                    <span className="text-red-500">{error.phoneError}</span>
                  )}
                </div>

                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.CurrentPassword}
                  </label>
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    name="password"
                    placeholder="Password"
                    // value={CurrentPassword}
                    onChange={!iconUpdate ? (e) => setCurrentPassword(e.target.value) : null}
                  />
                  {error.passwordError && (
                    <span className="text-red-500">{error.passwordError}</span>
                  )}
                </div>

                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.NewPassword}
                  </label>
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    name="newPassword"
                    placeholder="New password"
                    value={newPassword}
                    onChange={!iconUpdate ? (e) => handleNewPassword(e) : null}
                  />
                </div>
                
                <div className="my-4">
                  <label className="font-bold" htmlFor="">
                    {translate.ConfirmNewPassword}
                  </label>
                  <input
                    className="focus:outline-none w-full rounded border-solid border-2 border-[#AFAFAF] p-2"
                    type="text"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={!iconUpdate ? (e) => handleNewPassword(e) : null}
                  />
                    {errorNewPassword && (
                    <span className="text-red-500">{errorNewPassword}</span>
                  )}
                </div>

                <div className="mt-10 flex justify-between flex-col md:flex-row gap-5 md:gap-0">
                  <ButtonComponent
                    hidden={iconUpdate}
                    onClick={(e) => handleCancelBtn(e)}
                    nameBtn={translate.Cancel}
                  ></ButtonComponent>
                  <button
                    hidden={iconUpdate}
                    disabled={!isValid}
                    onClick={(e) => handleUpdateData(e)}
                    className="bg-[#EFA400] px-4 py-1 text-white rounded-md"
                  >
                    {translate.UpdateProfile}
                  </button>
                </div>
                {/* <button onClick={(e) => handleDeleteAccount(e)} className="bg-[#EFA400] px-4 mt-7 py-1 w-full text-white rounded-md">
                    {translate.DeleteAccount}
                </button> */}
                <ButtonComponent
                  onClick={(e) => handleDeleteAccount(e)}
                  nameBtn={translate.DeleteAccount}
                  w="full"
                  mt="7"
                  bg="--colorOrange"
                  colorText="--colorWhite"
                ></ButtonComponent>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
