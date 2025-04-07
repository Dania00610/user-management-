import { useState } from "react";
import Navbar from "./components/navbar";
import UserCardGrid  from "./components/usercard";

  function App() {
    const [count, setCount] = useState(0)
  return (
    <div>
      <Navbar/>
      <div className="p-4 ml-[15px]">
      <label htmlFor="search" className="block text-lg font-semibold mb-2 ">
  
</label>
<input 

  id="search"
  type="text"
  placeholder="Search Users"
  className="border-1 border-gray-300 h-[35px] w-[200px] rounded pl-1"
/>

</div>
<div className="App p-4">
      <UserCardGrid />
    </div>
      
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-[#3251D0]"></h1>
        
    <button
          onClick={() => setCount((c) => c + 1)}
          className="mt-6  text-white px-4 py-2 rounded "
        >
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
