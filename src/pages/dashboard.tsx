import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSessionStore } from "../store/sesssionStore";
import { getUsers } from "../API/getusers";
import UserCard from "../components/usercard";

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: string;
  dateOfBirth: string;
}

const Dashboard = () => {
  const accessToken = useSessionStore((state) => state.accessToken);
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users", search],
    queryFn: () => getUsers(accessToken, search),
    enabled: !!accessToken,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 h-[35px] w-[200px] rounded px-1 mb-4"
        />
      </div>

      {/* Loading, Error, No Users */}
      {isLoading && (
        <p className="text-center text-gray-500 dark:text-white">Loading...</p>
      )}
      {isError && (
        <p className="text-center text-red-500 dark:text-red-400">
          Failed to load users 😢
        </p>
      )}
      {!isLoading && users.length === 0 && (
        <p className="text-center text-gray-500 dark:text-white">
          No users found.
        </p>
      )}

      {/* Users List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
