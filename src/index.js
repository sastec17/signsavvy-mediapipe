import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./js/App";
import ErrorPage from "./js/error";
import Login from "./js/login";
import Settings from "./js/settings";
import SignOfTheDay from "./js/signOfTheDay";
import Home from "./js/home";
import Create from "./js/createaccount";
import AppRouter from "./js/AppRouter";

/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/settings",
    element: <Settings></Settings>,
  },
  {
    path: "/sign_of_the_day",
    element: <SignOfTheDay></SignOfTheDay>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/create",
    element: <Create></Create>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
*/

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();