import { useEffect, useState } from "react";
import { useSessionStore } from "../store/sesssionstore";


interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: string;
  dateOfBirth: string;
}


const UserCardGrid = ({ users }: { users: User[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="border border-gray-200 rounded-lg p-4 shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
              {user.firstName[0]}
            </div>
            <div>
              <div className="font-semibold">
                {user.firstName} {user.lastName || ""}
              </div>
              <div className="text-sm text-gray-600">{user.email}</div>
              <div className="text-sm text-gray-600">
                Status: {user.status}
              </div>
              <div className="text-sm text-gray-600">
                DOB: {user.dateOfBirth}
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Edit
            </button>
            <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const accessToken = useSessionStore((state) => state.accessToken);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchUsers = async (searchQuery = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?search=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data.users && data.users.length > 0) {
        setUsers(data.users);
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
  };

  useEffect(() => {
    fetchUsers();
  }, );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchUsers(value);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">User Management</h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 px-3 py-1 rounded"
        />
        <button
          onClick={() => fetchUsers(search)}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : notFound ? (
        <p>No users found for "{search}"</p>
      ) : (
        <UserCardGrid users={users} />
      )}
    </div>
  );
};

export default Dashboard;

