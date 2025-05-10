import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Submit from "./Pages/Submit";
import SignUp from "./Pages/SignUp";
import { Provider } from "react-redux";
import { store } from "./state/store";
import "./style/App.css";
import PostView from "./Components/PostView";
import FilteredView from "./Components/FilteredView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <PostView /> },
      { path: "/:category", element: <FilteredView /> },
    ],
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Submit",
    element: <Submit />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
);
