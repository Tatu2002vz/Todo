// import React, { useState } from "react";
import icons from "./../utils/icons";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { themeSelector, toggleTheme } from "features/theme/themeSlice";
const { FaCloudSun, FaCloudMoon } = icons;
const DarkMode = () => {
  // const [isDark, setIsDark] = useState<boolean>(false);
  const theme = useAppSelector(themeSelector)
  const dispatch = useAppDispatch()
  return (
    <div
      className={`w-16 h-7 rounded-full  p-[1px] cursor-pointer flex mx-2 items-center duration-1000 ${
        theme ? "justify-end bg-[#111845]" : "justify-start bg-[#65AFCE]"
      }`}
      onClick={() => {
        dispatch(toggleTheme())
      }}
    >
      {!theme ? (
        <div className="h-[28px] w-[28px] rounded-full flex justify-center items-center">
          <FaCloudSun color="#F1B538" size={28} />
        </div>
      ) : (
        <div className="h-[28px] w-[28px] rounded-full flex justify-center items-center">
          <FaCloudMoon color="#F1B538" size={30} />
        </div>
      )}
    </div>
  );
};

export default DarkMode;
