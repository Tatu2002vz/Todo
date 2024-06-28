import { showLogin } from "features/statusForm/statusFormSlice";
import { clearTodo } from "features/todo/todoSlice";
import { logout, userSelector } from "features/user/userSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import icons from "utils/icons";
const { IoMdMenu } = icons;
const Header = ({setShowNav}: {setShowNav: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  return (
    <div className="bg-floating-background backdrop-blur-lg py-3 px-4 flex justify-between items-center">
      <div className="">
        <IoMdMenu size={28} onClick={() => setShowNav(true)} />
      </div>
      <div>
        {!user.name ? (
          <button
            className="bg-red rounded-full text-white px-2 py-1 cursor-pointer"
            onClick={() => {
              dispatch(showLogin());
            }}
          >
            Đăng nhập
          </button>
        ) : (
          <button
            className="bg-red rounded-full text-white px-2 py-1 cursor-pointer"
            onClick={() => {
              dispatch(logout());
              toast("Đăng xuất thành công!");
              dispatch(clearTodo());
            }}
          >
            Đăng xuất
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
