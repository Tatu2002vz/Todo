import { apiAddTodo } from "apis/todo";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  const navigate = useNavigate();
  const handlAddTask = async () => {
    const fetchAddTodo = await apiAddTodo(data);
    console.log(fetchAddTodo);
    if (fetchAddTodo.status === 201) {
      toast("Thêm công việc thành công!");
    }
    navigate(0);
  };
  return (
    <div>
      <div className="flex items-center">
        <input
          type="text"
          className="px-5 grow mr-2"
          placeholder="Add task..."
          onChange={(e) =>
            setData((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <input
          type="datetime-local"
          id="birthdaytime"
          name="birthdaytime"
          onChange={(e) => {
            console.log(e.target.value)
            setData((prev) => ({
              ...prev,
              expired: String(new Date(e.target.value).getTime()),
            }));
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
          onChange={(e) => {
            setData((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
      </div>
    </div>
  );
};

export default InputTask;
