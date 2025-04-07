import Navbar from "./components/navbar";
import UserCardGrid from "./components/usercard";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <input
          id="search"
          type="text"
          placeholder="Search Users"
          className="border-1 border-gray-300 h-[35px] w-[200px] rounded px-1 mb-4"
        />
        <UserCardGrid />
      </div>
    </>
  );
}

export default App;
