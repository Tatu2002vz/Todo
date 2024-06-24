import React, { useState } from "react";
import icons from "../utils/icons";
import formatTime from "utils/formatTime";
import { useNavigate } from "react-router-dom";
import { apiCompleteTodo, apiDeleteTodo } from "apis/todo";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
const { ImStarEmpty, ImStarFull, FaDeleteLeft } = icons;
const Task = ({
  content,
  expired,
  status,
  id,
  getAllTodo
}: {
  content: string;
  expired?: string;
  status: boolean;
  id: string;
  getAllTodo: () => Promise<void>
}) => {
  const [important, setImportant] = useState<boolean>(status);
  const navigate = useNavigate();
  const handleDelete = () => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa công việc này ?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const fetchDelete = await apiDeleteTodo(id);
        console.log(fetchDelete);
        if (fetchDelete.status === 200) {
          toast("Xóa thành công!");
          getAllTodo();
        }
      }
    });
  };
  const handleCompleteTask = (e : any) => {
    let status = 'completed';
    if(e.target.checked === true) {
      status = 'completed';
    } else {
      status = 'incomplete';
    }
    Swal.fire({
      title: 'Đánh dấu hoàn thành ?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Hoàn thành",
      cancelButtonText: "Hủy",
    }).then(async(rs) => {
      if(rs.isConfirmed) {
        const fetchComplete = await apiCompleteTodo({id, status})
        if(fetchComplete.status === 200) toast('Đã hoàn thành!')
        getAllTodo()
      }
    })
  }
  return (
    <div
      className="flex justify-between items-center bg-[#F5F5F5] p-4 rounded-2xl float overflow-hidden cursor-pointer"
      onClick={() => {
        navigate("/task/" + id);
      }}
    >
      <div className="flex">
        <input
          type="checkbox"
          id="task"
          className="scale-150"
          onClick={(e) => {
            e.stopPropagation();
            handleCompleteTask(e);
          }}
        />
        <div className="ml-4">
          <label htmlFor="task">{content}</label>
          <p>{formatTime(expired)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          onClick={(e) => {
            e.stopPropagation();
            setImportant(!important);
          }}
        >
          {!important ? <ImStarEmpty size={24} /> : <ImStarFull size={24} />}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <FaDeleteLeft size={24} />
        </div>
      </div>
    </div>
  );
};

export default Task;
