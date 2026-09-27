import { routes } from "./app.routes.jsx";
import { RouterProvider } from "react-router";
const App = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
