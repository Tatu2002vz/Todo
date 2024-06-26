import axios from "../axiosConfig";
export const apiLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  axios({
    url: `login`,
    method: "POST",
    data: {
      email: email,
      password: password,
    },
  });

export const apiRegister = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) =>
  axios({
    url: "register",
    method: "POST",
    data: {
      email,
      password,
      name,
    },
  });

export const apiForgotPassword = (email: string) => axios({
  url: 'forgotpassword',
  method: 'POST',
  data: {
    email
  }
})

export const apiResetPassword = ({id, token, password}: {id: string, token: string, password: string}) => axios({
  url: `reset-password/${id}/${token}` ,
  method: 'POST',
  data: {
    password
  }
})