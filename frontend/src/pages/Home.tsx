import { useEffect } from "react";
import { Task } from "../components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { userSelector } from "features/user/userSlice";
import { showLogin } from "features/statusForm/statusFormSlice";
import { Todo } from "./UpdateTask";
import { searchSelector } from "features/search/searchSlice";
import { todoSelector } from "features/todo/todoSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { todoExpired, todo, todoCompleted } = useAppSelector(todoSelector);
  // const [todoList, setTodoList] = useState<Todo[]>([]);
  // const [todoExpired, setTodoExpired] = useState<Todo[]>([]);
  // const [todoCompleted, setTodoCompleted] = useState<Todo[]>([]);
  const {search} = useAppSelector(searchSelector);
  // const getAllTodo = async () => {
  //   const fetchGetAllTodo = await apiSearchTodo({search});
  //   if (fetchGetAllTodo.status === 200) {
  //     const data = fetchGetAllTodo.data?.mes.map((item: any) => {
  //       const { content, description, expired, status, _id, important } = item;
  //       return { content, description, expired, status, id: _id, important };
  //     });

  //     setTodoExpired(
  //       data?.filter((el: Todo) => {
  //         const dateNow = new Date().getTime();
  //         return (
  //           new Date(el?.expired || "").getTime() < dateNow &&
  //           el.status === "incomplete"
  //         );
  //       })
  //     );
  //     setTodoList(
  //       data?.filter((el: Todo) => {
  //         const dateNow = new Date().getTime();
  //         return (
  //           new Date(el?.expired || "").getTime() > dateNow &&
  //           el.status === "incomplete"
  //         );
  //       })
  //     );
  //     setTodoCompleted(
  //       data?.filter((el: Todo) => {
  //         return el.status === "completed";
  //       })
  //     );
  //     // setTodoList(prev => ([...prev, ...data]))
  //     // dispatch(pushAllTodo(data))
  //   } else {
  //     toast("Đăng nhập để lấy thông tin công việc!");
  //   }
  // };
  useEffect(() => {
    // getAllTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
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
              <h2 className="text-lg font-semibold text-red">Đã hết hạn</h2>
              <div className="flex flex-col gap-3">
                {todoExpired?.map((item: Todo, index: number) => {
                  return (
                    <Task
                      content={item.content}
                      expired={item.expired}
                      status={item.status === "completed"}
                      id={item.id}
                      key={index}
                      importantProp={item.important}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {todo.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-500">
                Công việc cần làm sắp tới
              </h2>
              <div className="flex flex-col gap-3">
                {todo?.map((item: Todo, index: number) => {
                  return (
                    <Task
                      content={item.content}
                      expired={item.expired}
                      status={item.status === "completed"}
                      id={item.id}
                      key={index}
                      importantProp={item.important}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {todoCompleted.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-blue-500">
                Công việc đã hoàn thành
              </h2>
              <div className="flex flex-col gap-3">
                {todoCompleted?.map((item: Todo, index: number) => {
                  return (
                    <Task
                      content={item.content}
                      expired={item.expired}
                      status={item.status === "completed"}
                      id={item.id}
                      key={index}
                      importantProp={item.important}
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
