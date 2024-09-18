import { useSelector } from "react-redux";
import ButtonComponent from "../ButtonComponent";
import "./home.css";

export default function Home() {
  if (auth.currentUser) {
    console.log(auth.currentUser.displayName);
  } else {
    console.log("there is no user");
  }

  const items = Array.from({ length: 6 });
  const translate = useSelector((state) => state.language.translation);
  return (
    <div className="">
      <div className="">
        {/* header */}
        <header className="layout py-16">
          <div className="lg:w-1/3 w-3/4  text-center m-auto">
            <h2 className="text-4xl font-bold text-[--colorOrange]">
              {translate.textH2Header}
            </h2>
            <p className="my-7">{translate.pHeader}</p>
            <div className="flex justify-center gap-5">
              <ButtonComponent
                nameBtn={translate.JoinForFree}
                bg="--colorOrange"
                colorText="#ffffff"
              ></ButtonComponent>
              <ButtonComponent nameBtn={translate.LearnMore}></ButtonComponent>
            </div>
          </div>
        </header>

        {/* section details */}
        <section className="py-7 bg-[--colorBgNumbers]">
          <div className="parent  w-3/4 m-auto px-10 flex lg:flex-row flex-col justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <span className="text-[--colorOrange] font-bold text-2xl">
                10K+
              </span>
              <span>{translate.TOTALCOURSES}</span>
            </div>
            <span className="lg:w-px lg:h-14 h-px w-36 mt-4 mb-5 bg-[--colorOrange]"></span>
            <div className="flex flex-col justify-center items-center ">
              <span className="text-[--colorOrange] font-bold text-2xl">
                500k+
              </span>
              <span>{translate.EXPERTMENTORS}</span>
            </div>
            <span className="lg:w-px lg:h-14 h-px w-36 mt-4 mb-5 bg-[--colorOrange]"></span>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[--colorOrange] font-bold text-2xl">
                300K+
              </span>
              <span>{translate.STUDENTSGLOBALLY}</span>
            </div>
            <span className="lg:w-px lg:h-14 h-px w-36 mt-4 mb-5 bg-[--colorOrange]"></span>
            <div className="flex flex-col justify-center items-center">
              <span className="text-[--colorOrange] font-bold text-2xl">
                10 Min
              </span>
              <span>{translate.AVEREGEPERCLASS}</span>
            </div>
          </div>
        </section>

        {/* section courses details */}
        <section className="pt-10 pb-8 bg-[#FAFAFC]">
          <div className="text-center flex flex-col justify-center items-center m-auto px-[80px]">
            <p>{translate.CoursesDetails}</p>
            <h3 className="text-3xl font-bold py-4">
              {translate.ExploreOurCategories}
            </h3>
            <p className="lg:w-3/5 pb-10">
              {translate.p1SectionDetails} <q>{translate.ContectHere}</q>
              {translate.p2SectionDetails}{" "}
            </p>
            <div className="grid lg:grid-cols-4 grid-cols-1 gap-3 m-auto">
              <div className="w-[90%] bg-white p-3 flex gap-3 items-center">
                <img
                  className="w-14"
                  src="https://static.vecteezy.com/system/resources/previews/013/313/458/non_2x/html-icon-3d-rendering-illustration-vector.jpg"
                  alt=""
                />
                <div className="w-2/3 text-start">
                  <p className="font-bold">{translate.WebDevelopment}</p>
                  <span className="text-[#C0C0C0] text-[14px]">
                    250+ {translate.courseAvailble}
                  </span>
                </div>
              </div>
              <div className="w-[90%] bg-white p-3 flex gap-3 items-center">
                <img
                  className="w-14"
                  src="https://opensource.google/images/projects/os-projects-flutter_thumbnail.png"
                  alt=""
                />
                <div className="w-2/3 text-start">
                  <p className="font-bold">{translate.MobileDevelopment}</p>
                  <span className="text-[#C0C0C0] text-[14px]">
                    250+ {translate.courseAvailble}
                  </span>
                </div>
              </div>{" "}
              <div className="w-[90%] bg-white p-3 flex gap-3 items-center">
                <img
                  className="w-14"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuo_NsNG-dZ7fA1qtHYzFEnxHbiVFH16VLkA&s"
                  alt=""
                />
                <div className="w-2/3 text-start">
                  <p className="font-bold">{translate.DatabaseCreation}</p>
                  <span className="text-[#C0C0C0] text-[14px]">
                    250+ {translate.courseAvailble}
                  </span>
                </div>
              </div>{" "}
              <div className="w-[90%] bg-white p-3 flex gap-3 items-center">
                <img
                  className="w-14"
                  src="https://149848395.v2.pressablecdn.com/wp-content/uploads/2022/01/adobe-illustrator-versus-photoshop-differences.jpg"
                  alt=""
                />
                <div className="w-2/3 text-start">
                  <p className="font-bold">{translate.GraphicDesign}</p>
                  <span className="text-[#C0C0C0] text-[14px]">
                    250+ {translate.courseAvailble}
                  </span>
                </div>
              </div>{" "}
              <div className="w-[90%] bg-white p-3 flex gap-3 items-center">
                <img
                  className="w-14"
                  src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=600/uploads/users/16/courses/578/preview_image/introduction-to-video-editing-in-adobe-premiere-pro-400x277.png"
                  alt=""
                />
                <div className="w-2/3 text-start">
                  <p className="font-bold">{translate.VideoEditing}</p>
                  <span className="text-[#C0C0C0] text-[14px]">
                    250+ {translate.courseAvailble}
                  </span>
                </div>
              </div>
              <div className="w-[90%] bg-white p-3 flex gap-3 items-center">
                <img
                  className="w-14"
                  src="https://spin.atomicobject.com/wp-content/uploads/Figma-Image.jpg"
                  alt=""
                />
                <div className="w-2/3 text-start">
                  <p className="font-bold">{translate.UIUXDevelopment}</p>
                  <span className="text-[#C0C0C0] text-[14px]">
                    250+ {translate.courseAvailble}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section all categories */}
        <section className="pt-10 pb-8  bg-[#FAFAFC]">
          <div className="text-center flex flex-col justify-center items-center m-auto px-[80px]">
            <ButtonComponent
              nameBtn={translate.AllCategories}
            ></ButtonComponent>
            <div className="text mt-16 mb-12">
              <p>{translate.TrustedBy56000Companies}</p>
              <h3 className="text-3xl my-5 font-bold">
                {translate.OurTrustedCompanies}
              </h3>
            </div>
            <div className=" w-3/4  flex flex-col lg:flex-row justify-center items-center gap-8 lg:justify-between">
              <img
                className="w-1/2 lg:w-1/6 "
                src="https://1000logos.net/wp-content/uploads/2017/06/Vodafone_Logo.png"
                alt=""
              />
              <img
                className="w-1/2 lg:w-1/6 "
                src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/uabuaawthxuohcgzudmb"
                alt=""
              />
              <img
                className="w-1/2 lg:w-1/6 "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx2GwSnpGTvFJQO41gc683FZyPgeNGCt2xdg&s"
                alt=""
              />
              <img
                className="w-1/2 lg:w-1/6 "
                src="https://logos-world.net/wp-content/uploads/2021/11/Udemy-Logo.png"
                alt=""
              />
              <img
                className="w-1/2 lg:w-1/6 "
                src="https://media.licdn.com/dms/image/v2/C560BAQGK3uuhQer46g/company-logo_200_200/company-logo_200_200/0/1631351788797?e=2147483647&v=beta&t=oGL-yHbzSy8MbCU-d4CfsELlfgQP3KX_fm5F6wcaGxA"
                alt=""
              />
            </div>
          </div>
        </section>

        {/* section special courses */}
        <section className="pt-10 pb-8 bg-[#FAFAFC]">
          <div className="text-center flex flex-col justify-center items-center m-auto px-[80px]">
            <div className="text">
              <h2 className="text-3xl mb-5 font-bold">
                {translate.SpecialCourseForYou}
              </h2>
              <p>{translate.pSectionSpecial}</p>
            </div>
            <div className="courses lg:w-5/6 my-16 grid lg:grid-cols-4 grid-cols-1 gap-3">
              <div className="course text-left bg-white p-3 mb-5 rounded">
                <figure className="relative">
                  <img
                    className="rounded"
                    src="../../../public/course1.png"
                    alt=""
                  />
                  <figcaption className="absolute bottom-[-14px] left-1/2 lg:text-sm text-xs translate-x-[-50%] w-2/3 flex justify-center bg-white font-bold px-2 rounded border-2 border-[--colorOrange]">
                    Graphic Design
                  </figcaption>
                </figure>
                <div>
                  <h4 className="font-bold text-xl mt-4 mb-2">
                    Fundamentals of Graphic Design
                  </h4>
                  <p className="text-[#767676]">By Alex Justin Batler</p>
                  <span className="text-[#C0C0C0]">
                    - Oxford Unviersity Of Florida
                  </span>
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#E8F7FE] rounded-full"></span>
                      <span>500K+</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#FDF2D6] rounded-full"></span>
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course text-left bg-white p-3 mb-5 rounded">
                <figure className="relative">
                  <img
                    className="rounded"
                    src="../../../public/course2.png"
                    alt=""
                  />
                  <figcaption className="absolute bottom-[-14px] left-1/2 lg:text-sm text-xs translate-x-[-50%] w-2/3 flex justify-center bg-white font-bold px-2 rounded border-2 border-[--colorOrange]">
                    Graphic Design
                  </figcaption>
                </figure>
                <div>
                  <h4 className="font-bold text-xl mt-4 mb-2">
                    Fundamentals of Graphic Design
                  </h4>
                  <p className="text-[#767676]">By Alex Justin Batler</p>
                  <span className="text-[#C0C0C0]">
                    - Oxford Unviersity Of Florida
                  </span>
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#E8F7FE] rounded-full"></span>
                      <span>500K+</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#FDF2D6] rounded-full"></span>
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course text-left bg-white p-3 mb-5 rounded">
                <figure className="relative">
                  <img
                    className="rounded"
                    src="../../../public/course3.png"
                    alt=""
                  />
                  <figcaption className="absolute bottom-[-14px] left-1/2 lg:text-sm text-xs translate-x-[-50%] w-2/3 flex justify-center bg-white font-bold px-2 rounded border-2 border-[--colorOrange]">
                    Graphic Design
                  </figcaption>
                </figure>
                <div>
                  <h4 className="font-bold text-xl mt-4 mb-2">
                    Fundamentals of Graphic Design
                  </h4>
                  <p className="text-[#767676]">By Alex Justin Batler</p>
                  <span className="text-[#C0C0C0]">
                    - Oxford Unviersity Of Florida
                  </span>
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#E8F7FE] rounded-full"></span>
                      <span>500K+</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#FDF2D6] rounded-full"></span>
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="course text-left bg-white p-3 mb-5 rounded">
                <figure className="relative">
                  <img
                    className="rounded"
                    src="../../../public/course4.png"
                    alt=""
                  />
                  <figcaption className="absolute bottom-[-14px] left-1/2 lg:text-sm text-xs translate-x-[-50%] w-2/3 flex justify-center bg-white font-bold px-2 rounded border-2 border-[--colorOrange]">
                    Graphic Design
                  </figcaption>
                </figure>
                <div>
                  <h4 className="font-bold text-xl mt-4 mb-2">
                    Fundamentals of Graphic Design
                  </h4>
                  <p className="text-[#767676]">By Alex Justin Batler</p>
                  <span className="text-[#C0C0C0]">
                    - Oxford Unviersity Of Florida
                  </span>
                  <div className="flex justify-between mt-3">
                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#E8F7FE] rounded-full"></span>
                      <span>500K+</span>
                    </div>

                    <div className="flex gap-2">
                      <span className="block w-[25px] h-[25px] bg-[#FDF2D6] rounded-full"></span>
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ButtonComponent
              fontText="bold"
              colorText="--colorOrange"
              nameBtn={translate.AllCourses}
            ></ButtonComponent>
          </div>
        </section>

        {/* section about us */}
        <section className="pt-10 pb-8 bg-[#FAFAFC]">
          <div className="lg:px-[80px] w-full  flex flex-col lg:flex-row justify-between items-center lg:gap-16">
            <figure className="relative w-[50%] h-[100%]">
              <img
                className="rounded w-[90%] lg:w-[60%]"
                src="https://media.gettyimages.com/id/1328492781/photo/communicating-on-the-video-call-from-home.jpg?s=612x612&w=gi&k=20&c=AFTXkR6EL2v9qAtPXVHzrUiUN8yJtVIW565LPIKMzcE="
                alt=""
              />
              <img
                className="absolute rounded lg:w-[30%] lg:top-1/2 lg:translate-y-[-50%] lg:right-[130px] w-[60%] top-[60%] translate-y-[-50%] right-[-80px]"
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/e-learning-online-classes-online-distance-design-template-2075ab88e57431859fc3a3f130423696_screen.jpg?ts=1686041965"
                alt=""
              />
            </figure>
            <div className="w-3/4 lg:w-1/2 py-10">
              <p>{translate.AboutUs}</p>
              <h3 className="text-3xl font-bold my-5">
                {translate.WeAreMaximizeYourLearningGrowth}
              </h3>
              <p className="text-[#7B7A7F] my-5">{translate.pSectionAboutUs}</p>
              <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
                <div className="flex gap-4">
                  <span>{translate.TrainingServices}</span>
                </div>
                <div className="flex gap-4">
                  <span>{translate.BigExperience}</span>
                </div>
                <div className="flex gap-4">
                  <span>{translate.ExpertTrainer}</span>
                </div>
                <div className="flex gap-4 mb-8">
                  <span>{translate.LifetimeAccess}</span>
                </div>
              </div>
              <ButtonComponent
                bg="--colorOrange"
                colorText="--colorWhite"
                nameBtn={translate.ExploreMore}
              ></ButtonComponent>
            </div>
          </div>
        </section>

        {/* section feedback */}
        <section className="pt-10 pb-10 bg-[#FAF7F2]">
          <div className="px-[80px]">
            <div className="text-center my-10">
              <p className="my-4">{translate.Feedback}</p>
              <h3 className="text-3xl font-bold">
                {translate.LovedbyOurStudents}
              </h3>
            </div>
            <div className="lg:flex  justify-evenly items-center ">
              <div className="lg:w-1/4">
                <p className="text-2xl">{translate.BrooklynSimmons}</p>
                <span className="text-[#C0C0C0]">
                  {translate.GraphicDesigner}
                </span>
                <ul></ul>
                <p>{translate.pSectionFeedback}</p>
              </div>
              <div>
                <iframe
                  className="mt-5 w-full lg:w-[120%] h-80"
                  src="https://www.youtube.com/embed/gHXSwOTuseA?si=QzeHE1sJiGyL37f0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* section Trainers */}
        <section className="pt-10 pb-8 bg-[#FAFAFC]">
          <div className="px-[80px] text-center">
            <p>{translate.Trainers}</p>
            <h2 className="text-3xl font-bold">
              {translate.OurProfessionalExportMentor}
            </h2>
            <p className="text-[#7B7A7F] my-5 m-auto w-1/2">
              {translate.pSectionTrainer}
            </p>
            <div className="my-8">
              <ButtonComponent
                nameBtn={translate.AllExportMentor}
                bg="--colorOrange"
                colorText="--colorWhite"
              ></ButtonComponent>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
