import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import RegisterOng from "./pages/register_ong";
import RegisterAnimal from "./pages/register_animal";
import Donate from "./pages/donate";
import Login from "./pages/login";
import Animais from "./pages/animais";
import EditAnimal from "./pages/edit_animal";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register_ong",
      element: <RegisterOng />,
    },
    {
      path: "/donate",
      element: <Donate />,
    },
    {
      path: "/donate/:id",
      element: <Donate />,
    },
    {
      path: "/register_animal/:id",
      element: <RegisterAnimal />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/animais/:id",
      element: <Animais />,
    },
    {
      path: "/editarAnimal/:id/:idAnimal",
      element: <EditAnimal />,
    },
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
