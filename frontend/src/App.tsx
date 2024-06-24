import { BrowserRouter, Route, Routes } from "react-router-dom";
import publicRoutes from "./routes";

function App() {
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
                <Layout>
                  <Page></Page>
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
