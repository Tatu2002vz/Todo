import { Schedule } from "../../components";
import icons from "../../utils/icons";
import avatar from "../../assets/avatar_default.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, userSelector } from "features/user/userSlice";
import { showLogin } from "features/statusForm/statusFormSlice";
import { toast } from "react-toastify";
import { clearTodo } from "features/todo/todoSlice";
const { IoMdMenu, MdUpcoming, IoIosSearch, CiLogout, CiLogin } = icons;
const Navigation = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  return (
    <div className="h-full float rounded-lg overflow-hidden">
      <div className="bg-[#F5F5F5] p-4  flex flex-col h-full">
        <div className="relative">
          <p className="font-semibold text-xl">Menu</p>
          <IoMdMenu
            size={24}
            className="absolute right-0 top-1/2 -translate-y-1/2 "
          />
        </div>
        <div className="relative py-4">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full w-full p-2"
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 h-10 w-10 flex items-center justify-center">
            <IoIosSearch size={24} className="" />
          </div>
        </div>
        <div className="grow">
          <p className="font-semibold uppercase">Tasks</p>
          <Schedule Icon={MdUpcoming} name="Upcoming" quantity={1} />
          <Schedule Icon={MdUpcoming} name="Upcoming" quantity={1} />
          <Schedule Icon={MdUpcoming} name="Upcoming" quantity={1} />
          <Schedule Icon={MdUpcoming} name="Upcoming" quantity={1} />
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
                dispatch(logout())
                dispatch(clearTodo())
                toast('Đăng xuất thành công!')
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
