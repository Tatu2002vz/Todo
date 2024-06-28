import React, { useState } from "react";
import icons from "../utils/icons";
import formatTime from "utils/formatTime";
import { NavLink } from "react-router-dom";
import { apiCompleteTodo, apiDeleteTodo, apiMarkImportant } from "apis/todo";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getTodoAsync } from "features/todo/asyncAction";
import { searchSelector } from "features/search/searchSlice";
const {
  ImStarEmpty,
  ImStarFull,
  FaDeleteLeft,
  ImCheckboxChecked,
  ImCheckboxUnchecked,
  BsThreeDots,
  TfiPencilAlt,
  FaCheckCircle,
  MdDeleteForever,
} = icons;
const Task = ({
  content,
  expired,
  status,
  id,
  importantProp,
}: {
  content: string;
  expired?: string;
  status: boolean;
  id: string;
  importantProp: boolean;
}) => {
  const [importantState, setImportantState] = useState<boolean>(importantProp);
  const [showOption, setShowOption] = useState<boolean>(false);
  const { search } = useAppSelector(searchSelector);
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
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
          dispatch(getTodoAsync({ search }));
        }
      }
    });
  };
  const handleCompleteTask = (value?: string) => {
    status = !status;
    const strStatus = status ? "completed" : "incomplete";
    Swal.fire({
      title: status ? "Đánh dấu hoàn thành ?" : "Đánh dấu chưa hoàn thành ?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Hoàn thành",
      cancelButtonText: "Hủy",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const fetchComplete = await apiCompleteTodo({
          id,
          status: strStatus,
        });
        if (fetchComplete.status === 200) dispatch(getTodoAsync({ search }));
      }
    });
  };
  const handleMarkImportant = async () => {
    setImportantState(!importantState);
    const fetchImportant = await apiMarkImportant({
      id,
      important: !importantState,
    });
    if (fetchImportant.status !== 200) {
      toast("Đánh dấu quan trọng có lỗi. Thử lại sau!");
    }
    dispatch(getTodoAsync({ search }));
  };
  return (
    <div
      className="flex justify-between items-center bg-floating-background p-4 rounded-2xl float duration-300"
      onClick={() => {
        // navigate("/task/" + id);
      }}
    >
      <div className="flex items-center">
        {/* <input
          type="checkbox"
          id="task"
          className="scale-150"
          onClick={(e) => {
            e.stopPropagation();
            handleCompleteTask(e);
          }}
        /> */}

        <div
          title="Mask as completed"
          onClick={(e) => {
            e.stopPropagation();
            handleCompleteTask();
          }}
        >
          {status ? (
            <ImCheckboxChecked size={24} />
          ) : (
            <ImCheckboxUnchecked size={24} />
          )}
        </div>
        <div className="ml-4">
          <label htmlFor="task">{content}</label>
          <p>{formatTime(expired)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleMarkImportant();
          }}
        >
          {!importantState ? (
            <ImStarEmpty size={24} />
          ) : (
            <ImStarFull size={24} color="#e4b355" />
          )}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="cursor-pointer"
        >
          <FaDeleteLeft size={24} />
        </div>
        <div
          title="More options"
          className="relative cursor-pointer"
          onClick={() => {
            setShowOption(!showOption);
          }}
        >
          <BsThreeDots size={24} />
          {showOption && (
            <ul className="absolute bg-floating-background z-20 top-full translate-y-4 right-0 rounded-md min-w-72 backdrop-blur-lg float">
              <li
                className="px-3 py-2 flex items-center hover:bg-slate-500 hover:text-white cursor-pointer rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                <TfiPencilAlt size={20} className="mx-2" />

                <NavLink to={"/task/" + id}>Sửa công việc</NavLink>
              </li>
              <li
                className="px-3 py-2 flex items-center hover:bg-slate-500 hover:text-white cursor-pointer rounded-full"
                onClick={() => {
                  handleCompleteTask("val");
                }}
              >
                <FaCheckCircle size={20} className="mx-2" />
                {!status ? "Đánh dấu hoàn thành" : "Đánh dấu chưa hoàn thành"}
              </li>
              <li
                className="px-3 py-2 flex items-center hover:bg-slate-500 hover:text-white cursor-pointer rounded-full"
                onClick={() => {
                  handleMarkImportant();
                }}
              >
                <ImStarEmpty size={20} className="mx-2" />
                {importantProp
                  ? "Bỏ đánh dấu quan trọng"
                  : "Đánh dấu quan trọng"}
              </li>
              <li
                className="px-3 py-2 flex items-center hover:bg-slate-500 hover:text-white cursor-pointer rounded-full text-red"
                onClick={() => handleDelete()}
              >
                <MdDeleteForever size={20} className="mx-2" />
                Xóa công việc
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
