import { BrowserRouter, Route, Routes } from "react-router-dom";
import publicRoutes from "./routes";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { searchSelector } from "features/search/searchSlice";
import { Fragment, useEffect } from "react";
import { getTodoAsync } from "features/todo/asyncAction";
import { getCurrent } from "features/user/asyncAction";
import { clearMsg, userSelector } from "features/user/userSlice";
import { toast } from "react-toastify";

function App() {
  const { search } = useAppSelector(searchSelector);
  const { message } = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodoAsync({ search }));
    dispatch(getCurrent());
    if (message !== "") {
      toast(message);
      dispatch(clearMsg());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((item, index) => {
          const Page = item.component;
          const Layout = item.layout;
          return (
            <Route
              path={item.pathRoute}
              key={index}
              element={
                Layout ? (
                  <Layout>
                    <Page></Page>
                  </Layout>
                ) : (
                  <Fragment>
                    <Page></Page>
                  </Fragment>
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
