import axios from "../axiosConfig";
import { payload } from "layouts/components/InputTask";
import { TaskUpdate } from "pages/UpdateTask";
export const apiGetAllTodo = () =>
  axios({
    url: "todo/",
  });

export const apiAddTodo = ({
  content,
  description,
  expired,
  status,
}: payload) =>
  axios({
    url: "todo",
    method: "post",
    data: {
      content,
      description,
      expired,
      status,
    },
  });

export const apiGetTodo = (id: string | undefined) =>
  axios({
    url: "todo/" + id,
    method: "get",
  });

export const apiUpdateTodo = ({
  content,
  description,
  id,
  expired,
  status,
  important,
}: TaskUpdate) =>
  axios({
    url: "todo/" + id,
    method: "put",
    data: {
      content,
      description,
      id,
      expired,
      status,
      important,
    },
  });
export const apiDeleteTodo = (id: string) => axios({
  url: 'todo/' + id,
  method: 'delete',
})

export const apiCompleteTodo = ({id, status} : {id: string, status: string}) => axios({
  url: 'todo/' + id,
  method: 'put',
  data: {
    status
  }
})