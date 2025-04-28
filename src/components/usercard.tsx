import { useState } from "react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useSessionStore } from "../store/sesssionStore";

interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  status: string;
  dateOfBirth: string;
}

export default function UserCard({ user }: { user: User }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const accessToken = useSessionStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete user");
      }
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg  p-4 shadow-md ">
      <div className="flex items-center gap-4 ">
        <div className="w-12 h-12  bg-primary text-white flex items-center justify-center rounded-full text-lg font-bold">
          {user.firstName[0] + (user.lastName?.[0] || "")}
        </div>
        <div>
          <div className="  p-4 font-semibold dark:text-white">
            {user.firstName} {user.lastName || ""}
          </div>
          <div className="  info">{user.email}</div>
          <div className="  info">Status: {user.status}</div>
          <div className=" info">DOB: {user.dateOfBirth}</div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <Link
          to={`/dashboard/edit/${user.id}`}
          className="bg-primary text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>

      {}
      {showConfirm && (
  <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-sm mx-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center mb-4">
        Are you sure you want to delete{" "}
        <span className="text-red-500">{user.firstName}</span>?
      </h3>
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmDelete}
          className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-all duration-300 w-28"
        >
          Yes, Delete
        </button>
        <button
          onClick={cancelDelete}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 transition-all duration-300 w-28"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

          </div>
        
      )}
  
  

