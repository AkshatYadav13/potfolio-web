import { RouterProvider } from "react-router-dom";
import { useAppStore } from "./store/useAppStore";
import { useEffect } from "react";
import { Toaster } from "sonner";
import router from "./lib/router.jsx";

function App() {
  const { theme, initializeTheme } = useAppStore();

  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <div  className="bg-white dark:bg-gray-900">
      <RouterProvider router={router} />
      <Toaster theme={theme} />
    </div>
  );
}

export default App;

