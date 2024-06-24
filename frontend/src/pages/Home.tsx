import { useEffect, useState } from "react";
import { Task } from "../components";
import { payload } from "layouts/components/InputTask";
import { apiGetAllTodo } from "apis/todo";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userSelector } from "features/user/userSlice";
import { showLogin } from "features/statusForm/statusFormSlice";
export interface Todo extends payload {
  id: string;
}
const Home = () => {
  const dispatch = useAppDispatch();
  // const { todoList } = useAppSelector(todoSelector);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoExpired, setTodoExpired] = useState<Todo[]>([]);

  const getAllTodo = async () => {
    const fetchGetAllTodo = await apiGetAllTodo();
    if (fetchGetAllTodo.status === 200) {
      const data = fetchGetAllTodo.data?.mes.map((item: any) => {
        const { content, description, expired, status, _id } = item;
        return { content, description, expired, status, id: _id };
      });

      setTodoExpired(
        data?.filter((el: Todo) => {
          const dateNow = new Date().getTime();
          return new Date(el?.expired || "").getTime() < dateNow;
        })
      );
      setTodoList(
        data?.filter((el: Todo) => {
          const dateNow = new Date().getTime();
          return new Date(el?.expired || "").getTime() > dateNow;
        })
      );
      // setTodoList(prev => ([...prev, ...data]))
      // dispatch(pushAllTodo(data))
    } else {
      toast("Đăng nhập để lấy thông tin công việc!");
    }
  };
  useEffect(() => {
    getAllTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { token } = useAppSelector(userSelector);

  return (
    <div className="pr-2">
      {token === "" ? (
        <div className="flex justify-center items-center h-full">
          Vui lòng{" "}
          <span
            className="text-btn-primary mx-1 italic cursor-pointer"
            onClick={() => {
              dispatch(showLogin());
            }}
          >
            đăng nhập
          </span>{" "}
          để sử dụng
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {todoExpired.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-red-500">Đã hết hạn</h2>
              <div className="flex flex-col gap-3">
                {todoExpired?.map((item: Todo, index: number) => {
                  return (
                    <Task
                      content={item.content}
                      expired={item.expired}
                      status={item.status === "completed"}
                      id={item.id}
                      key={index}
                      getAllTodo={getAllTodo}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {todoList.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-500">
                Công việc cần làm sắp tới
              </h2>
              <div className="flex flex-col gap-3">
                {todoList?.map((item: Todo, index: number) => {
                  return (
                    <Task
                      content={item.content}
                      expired={item.expired}
                      status={item.status === "completed"}
                      id={item.id}
                      key={index}
                      getAllTodo={getAllTodo}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
