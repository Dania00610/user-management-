"react";

interface User {
  firstName: string;
  lastName?: string;
  email: string;
  status: string;
  dateOfBirth: string;
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-full text-lg font-bold">
          {user.firstName[0] + (user.lastName?.[0] || "")}
        </div>
        <div>
          <div className="font-semibold dark:text-white">
            {user.firstName} {user.lastName || ""}
          </div>
          <div className="info">{user.email}</div>
          <div className="info">Status: {user.status}</div>
          <div className="info">DOB: {user.dateOfBirth}</div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="bg-primary text-white px-3 py-1 rounded text-sm">
          Edit
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
