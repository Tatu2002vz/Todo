import { apiAddTodo } from "apis/todo";
import { getTodoAsync } from "features/todo/asyncAction";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import Swal from "sweetalert2";
export interface payload {
  content: string;
  description: string;
  expired?: string;
  status?: string;
}
const InputTask = () => {
  const [data, setData] = useState<payload>({
    content: "",
    description: "",
  });
  const focusRef = useRef<any>(null);

  const dispatch = useAppDispatch();
  const handlAddTask = async () => {
    if (data.content.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Tên công việc không được bỏ trống!",
      });
    } else {
      const fetchAddTodo = await apiAddTodo(data);
      if (fetchAddTodo.status === 201) {
        toast("Thêm công việc thành công!");
        dispatch(getTodoAsync({ search: "" }));
        setData((prev) => ({ ...prev, content: "", description: "" }));
      }
      focusRef.current && focusRef.current.focus();
      // navigate(0);
    }
  };
  return (
    <div>
      <div className="flex items-center">
        <input
          ref={focusRef}
          type="text"
          className="px-5 grow mr-2"
          placeholder="Add task..."
          value={data.content}
          onChange={(e) =>
            setData((prev) => ({ ...prev, content: e.target.value }))
          }
          onKeyDown={(e) => {
            if (e.keyCode === 13) handlAddTask();
          }}
        />
        <input
          type="datetime-local"
          onChange={(e) => {
            console.log(e.target.value);
            setData((prev) => ({
              ...prev,
              expired: String(new Date(e.target.value).getTime()),
            }));
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) handlAddTask();
          }}
        />
        <button
          className="ml-2 w-9 h-9 rounded-full bg-blue-500 text-2xl text-white"
          onClick={() => handlAddTask()}
        >
          +
        </button>
      </div>
      <div>
        <input
          type="text"
          className="w-full px-5 mt-2"
          placeholder="Description..."
          value={data.description}
          onChange={(e) => {
            setData((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
      </div>
    </div>
  );
};

export default InputTask;
