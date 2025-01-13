import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Redux/languageSlice";
import 'flowbite';


const LanguageSwitcher = () => {
  const dispatch = useDispatch();

  const switchToEnglish = () => {
    dispatch(setLanguage("en"));
  };

  const switchToArabic = () => {
    dispatch(setLanguage("ar"));
  };

  const translate = useSelector(state => state.language.translation);

  return (
    <>
      <button
        id="dropdownDelayButton"
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        className="px-4 py-1 bg-[--colorOrange] text-center inline-flex items-center rounded"
        // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {translate.Lang}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownDelay"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDelayButton"
        >
          <li>
            <a
npm install react-redux              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {translate.Arabic}
            </a>
          </li>
          <li>
            <a
              onClick={switchToEnglish}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {translate.English}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default LanguageSwitcher;
