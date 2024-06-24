import { apiLogin, apiRegister } from "apis/auth";
import { useForm } from "react-hook-form";
import icons from "utils/icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import validateOptions from "utils/validate";
import { login } from "features/user/userSlice";
import {
  showForgotPassword,
  showLogin,
  showRegister,
  statusFormSelector,
  closeForm,
} from "features/statusForm/statusFormSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const { IoMdClose } = icons;

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(statusFormSelector);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(status);
  const onSubmit = async (data: any) => {
    // console.log(data);

    if (status === 1) {
      const { email, password, name } = data;
      const fetchRegister = await apiRegister({ email, password, name });
      console.log(fetchRegister);
      if (fetchRegister.status === 201) {
        toast("Đăng ký thành công!");
        dispatch(showLogin());
      }
    }
    if (status === 2) {
      const { email, password } = data;
      const fetchLogin = await apiLogin({ email, password });
      console.log(fetchLogin);
      if (fetchLogin.status === 200) {
        // const { name, email, token } = fetchLogin.data.mes;
        dispatch(login(fetchLogin.data.mes));
        toast("🦄 Đăng nhập thành công!", { autoClose: 2000 });
        dispatch(closeForm());
        navigate(0)
      }
    }
    if (status === 3) {
      // const { email } = data;
    }
  };

  return (
    <div className="rounded-md text-black p-4 w-[400px]">
      <h1 className="text-center font-bold text-xl text-btn-primary">
        {status === 1
          ? "Đăng ký"
          : status === 2
          ? "Đăng nhập"
          : status === 3
          ? "Quên mật khẩu"
          : "Lấy lại mật khẩu"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="flex flex-col pb-6 relative">
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            {...register("email", validateOptions.email)}
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500 absolute bottom-[6px]">
              {`${errors.email.message}`}
            </p>
          )}
        </div>
        {status !== 3 && (
          <div className="flex flex-col pb-6 relative">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              {...register("password", validateOptions.password)}
            />
            {errors.password && (
              <p className="text-xs text-red-500 absolute bottom-[6px]">
                {`${errors.password.message}`}
              </p>
            )}
          </div>
        )}
        {status === 1 || status === 4 ? (
          <div className="flex flex-col pb-6 relative">
            <label htmlFor="password">Nhập lại mật khẩu</label>
            <input
              id="password"
              type="password"
              {...register("re_password", {
                required: true,
                validate: (val: string) => {
                  if (watch("password") !== val)
                    return "Nhập lại mật khẩu phải trùng với mật khẩu";
                },
              })}
            />
            {errors.re_password && (
              <p className="text-xs text-red-500 absolute bottom-[6px]">
                {`${errors.re_password.message}`}
              </p>
            )}
          </div>
        ) : (
          <></>
        )}
        {status === 1 && (
          <div className="flex flex-col pb-6 relative">
            <label htmlFor="name">Tên hiển thị</label>
            <input id="name" {...register("name", validateOptions.name)} />
            {errors.name && (
              <p className="text-xs text-red-500 absolute bottom-[6px]">
                Tên hiển thị không được bỏ trống.
              </p>
            )}
          </div>
        )}
        <input
          type="submit"
          id="submit"
          className="bg-btn-primary text-white"
          hidden
        />
        <label htmlFor="submit">
          <button className="w-full bg-btn-primary text-white rounded-md p-2">
            {status === 1
              ? "Đăng ký"
              : status === 2
              ? "Đăng nhập"
              : "Lấy lại mật khẩu"}
          </button>
        </label>
        {status === 1 ? (
          <div className="italic text-sm flex justify-end mt-2">
            Đã có tài khoản?{" "}
            <span
              className="cursor-pointer text-btn-primary ml-1"
              onClick={() => {
                dispatch(showLogin());
              }}
            >
              Đăng nhập
            </span>
          </div>
        ) : status === 2 ? (
          <div className="italic text-sm flex justify-between mt-2">
            <div
              className="cursor-pointer ml-1 hover:text-btn-primary"
              onClick={() => {
                dispatch(showForgotPassword());
              }}
            >
              Quên mật khẩu?{" "}
            </div>
            <div>
              Chưa có tài khoản?{" "}
              <span
                className="cursor-pointer text-btn-primary ml-1"
                onClick={() => {
                  dispatch(showRegister());
                }}
              >
                Đăng ký
              </span>
            </div>
          </div>
        ) : status === 3 ? (
          <div
            className="italic text-sm flex justify-start mt-2 cursor-pointer hover:text-btn-primary"
            onClick={() => {
              dispatch(showLogin());
            }}
          >
            Quay lại đăng nhập{" "}
          </div>
        ) : (
          <></>
        )}
      </form>
      <div
        className="absolute top-0 right-0 h-10 w-10 flex justify-center items-center cursor-pointer hover:bg-btn-primary hover:text-white"
        onClick={() => {
          dispatch(closeForm());
        }}
      >
        <IoMdClose size={24} />
      </div>
    </div>
  );
};

export default FormLogin;
