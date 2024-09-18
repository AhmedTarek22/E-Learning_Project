import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../Redux/languageSlice";
import { MdLanguage } from "react-icons/md";
import { useState } from "react";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const translate = useSelector((state) => state.language.translation);

  const [isOpen, setIsOpen] = useState(false);

  const switchToEnglish = () => {
    dispatch(setLanguage("en"));
    setIsOpen(false);
  };

  const switchToArabic = () => {
    dispatch(setLanguage("ar"));
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleDropdown}
        className="relative text-white bg-[#efa400] hover:bg-[#d88b00] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        <span className="mr-2 text-xl">
          <MdLanguage />
        </span>
        {translate.Lang}
        <svg
          className="w-2.5 h-2.5 ms-3 inline-block"
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

      {isOpen && (
        <div
          id="dropdownDelay"
          className="absolute z-10 bg-white divide-y divide-gray-200 rounded-lg shadow-lg w-44 dark:bg-gray-800 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDelayButton"
          >
            <li>
              <a
                onClick={switchToArabic}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              >
                {translate.Arabic}
              </a>
            </li>
            <li>
              <a
                onClick={switchToEnglish}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer"
              >
                {translate.English}
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default LanguageSwitcher;
