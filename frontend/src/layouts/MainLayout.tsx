import React, { useState } from "react";
import Navigation from "./components/Navigation";
import { FormLogin } from "../components";
import { useAppSelector } from "store/hooks";
import { statusFormSelector } from "features/statusForm/statusFormSlice";
// import SubHeader from "./components/SubHeader";
import InputTask from "./components/InputTask";
import Header from "./components/Header";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [showNav, setShowNav] = useState(false);
  const { status } = useAppSelector(statusFormSelector);
  return (
    <div className="light">
      <div className="fixed top-0 left-0 right-0 backdrop-blur-lg z-20 md:hidden">
        <Header setShowNav={setShowNav}/>
      </div>
      <div className="grid grid-cols-3 max-w-[1280px] mx-auto p-5 gap-5 h-dvh relative md:pt-5 pt-20 overflow-hidden">
        <div className={`${showNav ? 'translate-x-0' : '-translate-x-full'} absolute top-0 bottom-0 md:col-span-1 md:relative md:translate-x-0 backdrop-blur-xl
        z-20`}>
          <Navigation setShowNav={setShowNav} />
        </div>
        {status !== 0 && (
          <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 form rounded-md z-50 bg-white">
            <FormLogin />
          </div>
        )}
        <div className="col-span-3 md:col-span-2 flex flex-col overflow-hidden">
          {/* <SubHeader /> */}
          <div className="grow overflow-y-auto">{children}</div>
          <div className="pt-4 float">
          <InputTask />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
