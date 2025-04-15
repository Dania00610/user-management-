import { useCallback, useEffect, useState } from "react";
import { useSessionStore } from "../store/sesssionstore";
import Navbar from "../components/navbar";
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
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchUsers = useCallback(
    async (searchQuery = "") => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/users${searchQuery ? `?search=${searchQuery}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await res.json();

        if (data.result.data.users && data.result.data.users.length > 0) {
          setUsers(data.result.data.users);
          setNotFound(false);
        } else {
          setUsers([]);
          setNotFound(true);
        }
      } catch (err) {
        console.error("Failed to fetch users", err);
        setUsers([]);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    },
    [accessToken]
  );

  useEffect(() => {
    fetchUsers(search);
  }, [fetchUsers, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={handleSearchChange}
            className="border border-gray-300 px-3 py-1 rounded dark:text-white"
          />
        </div>

        {loading ? (
          <p className="dark:text-white">Loading users...</p>
        ) : notFound ? (
          <p className="dark:text-white">No users found for "{search}"</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
