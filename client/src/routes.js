import App from "./components/App";
import Home from "./pages/Home";
import User from "./pages/User";
import Skills from "./pages/Skills";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: null,
    children: [
      { path: "", element: <Home /> },
      { path: "users/:id", element: <User /> },
      { path: "skills", element: <Skills /> },
    ],
  },
];

export default routes;
