import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { AppRouter } from "./router/AppRouter";
import { changeLanguage } from "i18next";

import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    changeLanguage(localStorage.getItem("language"));
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      {/* <RouterProvider router={SuperAdminUser} /> */}
      <AppRouter />
    </div>
  );
}

export default App;
