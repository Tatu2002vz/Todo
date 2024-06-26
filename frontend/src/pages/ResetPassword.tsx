import { apiResetPassword } from "apis/auth";
import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import validateOptions from "utils/validate";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const onSubmit = async (data: any) => {
    const { password } = data;
    const fetchPassword = await apiResetPassword({
      id: id ? id : "",
      token: token ? token : "",
      password,
    });
    if(fetchPassword.status === 200) {
        navigate('/')
    } else {
        toast(fetchPassword.mes)
    }
  };
  return (
    <div className="light relative min-w-full min-h-screen">
      <div className="rounded-md text-black p-4 w-[400px] fixed left-1/2 -translate-x-1/2">
        <h1 className="text-xl font-semibold text-center text-red mb-3">
          Cập nhật mật khẩu
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
          <label htmlFor="submit">
            <button className="w-full bg-btn-primary text-white rounded-md p-2">
              Lấy lại mật khẩu
            </button>
          </label>
          <NavLink
            to={"/"}
            className="italic text-sm flex justify-start mt-2 cursor-pointer hover:text-btn-primary"
          >
            Trở về trang chủ{" "}
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
