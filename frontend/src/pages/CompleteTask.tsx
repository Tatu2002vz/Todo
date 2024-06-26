import { Task } from "components";
import { Todo } from "./UpdateTask";
import { useAppSelector } from "store/hooks";
import { todoSelector } from "features/todo/todoSlice";

const CompleteTask = () => {
  // const [todoList, setTodoList] = useState<Todo[]>([]);
  // useEffect(() => {
  //   const getTodoExpired = async () => {
  //     const fetchTodoExpired = await apiGetTodoCompleted();
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
  const {todoCompleted} = useAppSelector(todoSelector)
  return (
    <div>
      <h1 className="font-bold text-lg">Công việc đã hoàn thành</h1>
      <div className="flex flex-col gap-3">
        {todoCompleted.length > 0 ? (
          todoCompleted.map((item: Todo, index: number) => {
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
          })
        ) : (
          <div className="text-center text-lg mt-3">
            Bạn chưa hoàn thành được công việc nào
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteTask;
