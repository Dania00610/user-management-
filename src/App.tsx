import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import UserCardGrid from "./components/usercard";
import LoginPage from "./pages/login";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/login" element={<LoginPage />} />

        {}
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar />
              <div className="p-4">
                <input
                  id="search"
                  type="text"
                  placeholder="Search Users"
                  className="border border-gray-300 h-[35px] w-[200px] rounded px-1 mb-4"
                />
                <UserCardGrid />
              </div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


