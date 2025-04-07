"react";

interface User {
  initial: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
}

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="m-[2px] border-2 border-solid border-gray-50 shadow-md rounded-[8px] p-4">
      <div className="flex flex-col items-center justify-between">
        {/* User Initial in Circle */}
        <div className="w-16 h-16 rounded-full bg-[#3251D0] text-white flex items-center justify-center text-2xl font-semibold">
          {user.initial}
        </div>

        {/* User Info */}
        <div className="text-left mt-4 space-y-1 w-full">
          <div className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
          <div className="text-sm text-gray-500">Status: {user.status}</div>
          <div className="text-sm text-gray-500">DOB: {user.dob}</div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-2 w-full ">
          <button className="bg-[#3251D0] text-white rounded px-4 py-1  text-sm hover:bg-blue-800 transition-all cursor-pointer">
            Edit
          </button>
          <button className="bg-red-500 text-white rounded px-4 py-1  text-sm hover:bg-red-600 transition-all cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const UserCardGrid = () => {
  const users: User[] = [
    {
      initial: "JD",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      status: "Active",
      dob: "1990-05-15",
    },
    {
      initial: "JS",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      status: "locked",
      dob: "1988-10-22",
    },
    {
      initial: "AJ",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice.johnson@example.com",
      status: "Active",
      dob: "1995-02-10",
    },
    {
      initial: "b",
      firstName: "Bob",
      lastName: "",
      email: "bob.martin@example.com",
      status: "locked",
      dob: "1980-08-05",
    },
    {
      initial: "CB",
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie.brown@example.com",
      status: "Active",
      dob: "1992-11-30",
    },
    {
      initial: "DL",
      firstName: "David",
      lastName: "Lee",
      email: "david.lee@example.com",
      status: "locked",
      dob: "1987-07-14",
    },
    {
      initial: "E",
      firstName: "Eve",
      lastName: "",
      email: "eve.green@example.com",
      status: "Active",
      dob: "1990-12-15",
    },
    {
      initial: "FW",
      firstName: "Frank",
      lastName: "white",
      email: "frank.white@example.com",
      status: "Active",
      dob: "1994-01-25",
    },
    {
      initial: "GB",
      firstName: "Grace",
      lastName: "Black",
      email: "grace.black@example.com",
      status: "locked",
      dob: "1985-03-17",
    },
    {
      initial: "H",
      firstName: "Hannah",
      lastName: "",
      email: "hannah.purple@example.com",
      status: "Active",
      dob: "1996-12-03",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserCardGrid;
