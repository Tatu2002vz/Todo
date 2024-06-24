const validateOptions = {
  name: { required: "Tên hiển thị không được bỏ trống!" },
  password: { required: "Mật khẩu không được bỏ trống!" },
  email: {
    required: "Email không được bỏ trống!",
    pattern: {
        value:
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        message: 'Nhập đúng định dạng email!'
    },
  },
};
export default validateOptions;
