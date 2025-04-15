import { useSessionStore } from "../store/sesssionstore";
import { useThemeStore } from "../store/themeStore";

export default function Navbar() {
  const logout = useSessionStore((s) => s.logout);
  const { darkMode, toggleTheme } = useThemeStore();
  return (
    <nav className="bg-primary flex items-center justify-between px-6 py-4 shadow">
      <h1 className="text-white text-2xl font-bold">User Management</h1>
      <div className="flex items-center gap-4 rounded-lg">
        <button className="bg-white text px-4 py-1 cursor-pointer rounded hover:bg-gray-100 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          Create User
        </button>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 cursor-pointer rounded hover:bg-red-600 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
        >
          Logout
        </button>
        <button
          onClick={toggleTheme}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500 transition-all"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </div>
    </nav>
  );
}
