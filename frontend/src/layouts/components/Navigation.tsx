import { Schedule } from "../../components";
import icons from "../../utils/icons";
import avatar from "../../assets/avatar_default.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, userSelector } from "features/user/userSlice";
import { showLogin } from "features/statusForm/statusFormSlice";
import { toast } from "react-toastify";
import { clearTodo, todoSelector } from "features/todo/todoSlice";
import {  setSearch } from "features/search/searchSlice";
import { useEffect, useState } from "react";
const {
  IoMdClose,
  IoIosSearch,
  CiLogout,
  CiLogin,
  TbAlertOctagonFilled,
  FaCheckCircle,
  FaHome,
  ImStarFull
} = icons;
const Navigation = ({setShowNav}: {setShowNav?: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [keySearch, setKeySearch] = useState<string>('')
  const {todoCompleted, todoExpired, todoImportant, todo} = useAppSelector(todoSelector)
  useEffect(() => {
    const debounce = setTimeout(() => {
      dispatch(setSearch(keySearch));
    }, 1000)
    return () => clearTimeout(debounce)
  }, [keySearch, dispatch])
  return (
    <div className="h-full float rounded-lg overflow-hidden">
      <div className="bg-floating-background p-4  flex flex-col h-full">
        <div className="relative">
          <p className="font-semibold text-xl">Menu</p>
          <IoMdClose
            size={24}
            className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-red hover:text-white md:hidden"
            onClick={() => {
            
              setShowNav && setShowNav(false)
            }}
          />
        </div>
        <div className="relative py-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full w-full p-2"
            value={keySearch}
            onChange={(e) => {
              setKeySearch(e.target.value)
            }}
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 h-10 w-10 flex items-center justify-center">
            <IoIosSearch size={24} />
          </div>
        </div>
        <div className="grow">
          <p className="font-semibold uppercase">Tasks</p>
          <Schedule Icon={FaHome} name="Tất cả" quantity={todo.length + todoCompleted.length + todoExpired.length} link={"/"} />
          <Schedule
            Icon={ImStarFull}
            name="Quan trọng"
            quantity={todoImportant.length}
            link={"/important"}
          />
          <Schedule
            Icon={TbAlertOctagonFilled}
            name="Đã hết hạn"
            quantity={todoExpired.length}
            link={"/expired"}
          />
          <Schedule
            Icon={FaCheckCircle}
            name="Đã hoàn thành"
            quantity={todoCompleted.length}
            link={"/completed"}
          />
        </div>
        <div className="flex justify-between ">
          <div className="flex items-center">
            <img
              src={avatar}
              alt=""
              className="w-7 h-7 object-cover rounded-full mr-2"
            />
            {user.name ? user.name : "Khách"}
          </div>
          {user.name ? (
            <div
              className="flex justify-center items-center text-red-500 cursor-pointer"
              onClick={() => {
                dispatch(logout());
                dispatch(clearTodo());
                toast("Đăng xuất thành công!");
              }}
            >
              Đăng xuất
              <CiLogout />
            </div>
          ) : (
            <div
              className="flex justify-center items-center text-red-500 cursor-pointer"
              onClick={() => dispatch(showLogin())}
            >
              Đăng nhập
              <CiLogin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
