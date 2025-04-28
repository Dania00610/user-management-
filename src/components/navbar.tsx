import { useNavigate } from "react-router";
import { useSessionStore } from "../store/sesssionStore";
import { useThemeStore } from "../store/themeStore";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = useSessionStore((s) => s.logout);
  const { darkMode, toggleTheme } = useThemeStore();
  const handleCreateUser = () => {
    navigate("new");
  };

  return (
    <nav className="bg-primary flex items-center justify-between px-6 py-4 shadow">
      <h1 className="text-white text-2xl font-bold">User Management</h1>
      <div className="flex items-center gap-2 rounded-lg text-xm">
        <button
          onClick={handleCreateUser}
          className="bg-white text px-3 py-0 cursor-pointer rounded hover:bg-gray-100 font-semibold text-xm sm=text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          Create User
        </button>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-0 cursor-pointer rounded hover:bg-red-600 font-semibold text-xm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          Logout
        </button>
        <button
          onClick={toggleTheme}
          className="bg-primary text-white px-3 py-0 rounded hover:bg-blue-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 transition-all"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </nav>
  );
}
