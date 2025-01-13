import { useSelector } from "react-redux";
import hero from "../../assets/about.png";
import student from "../../assets/e-learn.webp";

export default function AboutUs() {

  const translate = useSelector(state => state.language.translation);
    return (
        <>
            <div className="layout  py-8">
                <div className="about container w-5/6 mx-auto">
                    <div className="hero-about rounded-lg md:flex">
                        <div className="left w-full lg:w-2/3">
                            <img src={hero} className='w-full pt-7' alt="Hero" />
                        </div>

                        <div className="right md:w-2/3 md:py-10">
                            <h2 className='hero-text font-sans pr-20 text-3xl font-medium md:pr-7 md:text-5xl'>
                                {translate.EmpowerAbout}
                            </h2>
                            <h3 className='pt-4 text-amber-600'>
                                {translate.InnovativeAbout}
                            </h3>
                        </div>
                    </div>

                    <div className="result sm:pb-28 pt-11 flex flex-col items-center justify-center">
                        <div className="first-texts flex flex-col items-center text-center">
                            <h2 className='md:text-4xl text-2xl font-medium text-amber-700 font-sans'>
                                {translate.UnlockingAbout}
                            </h2>
                            <h3 className='w-2/3 text-left px-6 pt-2'>
                                {translate.WhetherAbout}
                            </h3>
                        </div>


            <div className="right md:w-2/3 md:py-10">
              <h2 className="hero-text font-sans pr-20 text-3xl font-medium md:pr-7 md:text-5xl">
                {translate.EmpowerAbout}
              </h2>
              <h3 className="pt-4 text-amber-600">
                {translate.InnovativeAbout}
              </h3>
            </div>
          </div>

          <div className="result sm:pb-28 pt-11 flex flex-col items-center justify-center">
            <div className="first-texts flex flex-col items-center text-center">
              <h2 className="md:text-4xl text-2xl font-medium text-amber-700 font-sans">
                {translate.UnlockingAbout}
              </h2>
              <h3 className="w-2/3 text-left px-6 pt-2">
                {translate.WhetherAbout}
              </h3>
            </div>

            <div className="second-section mt-8 flex flex-col md:flex-row md:justify-evenly h-auto md:h-96">
              <div className="left-second md:w-1/3 text-center md:text-left md:my-auto">
                <h2 className="text-3xl font-medium text-amber-700 pb-3">
                  {translate.WeBringAbout}
                </h2>
                <p>
                  {translate.OurPlatformAbout}
                </p>
              </div>
              <div className="right-second md:w-2/4 mt-4 md:mt-0">
                <img
                  src={student}
                  className="w-full h-auto rounded-md"
                  alt="Student"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
