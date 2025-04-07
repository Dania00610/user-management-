export default function Navbar() {
  return (
    <nav className="bg-[#3251D0] flex items-center justify-between px-6 py-4 shadow">
      <h1 className="text-white text-2xl font-bold">User Management</h1>
      <div className="flex items-center gap-4 rounded-lg">
        <button className="bg-white text-[#3251D0] px-4 py-1 cursor-pointer rounded hover:bg-gray-100 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          Create User
        </button>

        <button className="bg-red-500 text-white px-4 py-1 cursor-pointer rounded hover:bg-red-600 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          Logout
        </button>
        <button className="text-white hover:text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="moon"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
          >
            <path
              fill="currentColor"
              d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
