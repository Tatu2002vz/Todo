import React from "react";
import Navigation from "./components/Navigation";
import { FormLogin } from "components";
import { useAppSelector } from "store/hooks";
import { statusFormSelector } from "features/statusForm/statusFormSlice";

const OnlyNav = ({children} : {children: React.ReactNode}) => {
  const { status } = useAppSelector(statusFormSelector);

  return (
    <div className="light">
      <div className="grid grid-cols-3 max-w-[1280px] mx-auto p-5 gap-5 h-screen relative">
        <div className="col-span-1">
          <Navigation />
          {status !== 0 && (
            <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 form rounded-md z-10 bg-white">
              <FormLogin />
            </div>
          )}
        </div>
        <div className="col-span-2 flex flex-col gap-4 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnlyNav;
