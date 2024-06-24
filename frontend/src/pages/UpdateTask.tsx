import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetTodo, apiUpdateTodo } from "apis/todo";
import { Todo } from "./Home";
import { toast } from "react-toastify";
import { formatInputTime } from "utils/formatTime";
const {
  IoArrowBackSharp,
  ImStarEmpty,
  ImStarFull,
  ImCheckboxChecked,
  ImCheckboxUnchecked,
} = icons;
export interface TaskUpdate extends Todo {
  important: boolean;
}
const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<TaskUpdate>({
    content: "",
    description: "",
    id: id || "",
    expired: "",
    status: "",
    important: false,
  });
  console.log(task);
  const getTodo = async (id: string | undefined) => {
    const fetchTodo = await apiGetTodo(id);
    if (fetchTodo.status === 200) {
      const { content, description, expired, status, important } =
        fetchTodo.data.mes;
      setTask((prev) => ({
        ...prev,
        content,
        description,
        expired,
        status,
        important,
      }));
    } else {
      toast("Có lỗi xảy ra vui lòng thử lại sau!");
    }
  };
  const handleSubmit = async () => {
    const fetchUpdateTodo = await apiUpdateTodo(task);
    console.log(fetchUpdateTodo);
  };
  useEffect(() => {
    getTodo(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {task && (
        <div>
          <div className="border-b-slate-300 border-b p-4">
            <IoArrowBackSharp
              size={24}
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <label htmlFor="content">Nhiệm vụ</label>
              <textarea
                className="border block w-full h-16 p-2"
                name="content"
                id="content"
                value={task.content}
                placeholder="Nhập công việc..."
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, content: e.target.value }))
                }
              ></textarea>
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="expired">Ngày đến hạn</label>
              <input
                type="datetime-local"
                id="expired"
                name="expired"
                value={formatInputTime(task.expired)}
                onChange={(e) =>
                  setTask((prev) => ({
                    ...prev,
                    expired: String(new Date(e.target.value).getTime()),
                  }))
                }
              />
            </div>
            <div>
              <label htmlFor="description">Mô tả thêm (nếu có)</label>
              <textarea
                className="border block w-full h-16 p-2"
                name="description"
                id="description"
                value={task.description}
                placeholder="Nhập mô tả..."
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, content: e.target.value }))
                }
              ></textarea>
            </div>
            <div className="flex justify-between">
              <p>Đánh dấu quan trọng</p>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setTask((prev) => ({ ...prev, important: !task.important }));
                }}
              >
                {!task.important ? (
                  <ImStarEmpty size={24} />
                ) : (
                  <ImStarFull size={24} />
                )}
              </div>
              {/* Lỗi có checked nhưng không đánh dấu */}
              {/* <input
                type="checkbox"
                className="w-6"
                defaultChecked={task.important}
                onChange={(e) =>
                  setTask((prev) => ({ ...prev, important: e.target.checked }))
                }
              /> */}
            </div>
            <div className="flex justify-between">
              <p>Đánh dấu đã hoàn thành</p>
              <div
                className="cursor-pointer"
                onClick={() => {
                  setTask((prev) => ({
                    ...prev,
                    status:
                      task.status === "completed" ? "incomplete" : "completed",
                  }));
                }}
              >
                {task.status === "completed" ? (
                  <ImCheckboxChecked size={24} />
                ) : (
                  <ImCheckboxUnchecked size={24} />
                )}
              </div>
              {/* Lỗi có checked nhưng không đánh dấu */}
              {/* <input
                type="checkbox"
                className="w-6"
                defaultChecked={task.status === "completed" ? true : false}
                onChange={(e) => {
                  console.log(e.target.checked)
                  setTask((prev) => ({
                    ...prev,
                    status: e.target.checked ? "completed" : "incomplete",
                  }))
                }
                  
                }
              /> */}
            </div>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-slate-300 min-w-32 rounded-lg"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white min-w-32 rounded-lg"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTask;
