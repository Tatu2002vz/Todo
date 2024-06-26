import React from "react";
import { Todo } from "./UpdateTask";
import { Task } from "components";
import { useAppSelector } from "store/hooks";
import { todoSelector } from "features/todo/todoSlice";

const ImportantTask = () => {
  // const [todoList, setTodoList] = useState<Todo[]>([]);
  // useEffect(() => {
  //   const getTodoExpired = async () => {
  //     const fetchTodoExpired = await apiGetTodoImportant();
  //     if (fetchTodoExpired.status === 200) {
  //       setTodoList(
  //         fetchTodoExpired.data?.mes.map((item: any) => {
  //           const { content, description, expired, status, _id, important } = item;
  //           return { content, description, expired, status, id: _id, important };
  //         })
  //       );
  //     } else {
  //       toast("Có lỗi xảy ra! Vui lòng thử lại sau!");
  //     }
  //   };
  //   getTodoExpired();
  // }, []);
  const {todoImportant} = useAppSelector(todoSelector)
  return (
    <div>
      <h1 className="font-bold text-lg">Công việc quan trọng</h1>
      <div className="flex flex-col gap-3">
        {todoImportant.length > 0 ? (
          todoImportant.map((item: Todo, index: number) => {
            return (
              <Task
                content={item.content}
                expired={item.expired}
                status={item.status === "completed"}
                id={item.id}
                importantProp={item.important}
                key={index}
              />
            );
          })
        ) : (
          <div className="text-center text-lg mt-3">
            Không có công việc quan trọng nào
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantTask;
