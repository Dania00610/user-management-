import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { useSessionStore } from "../store/sesssionStore";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function DeleteUser() {
  const { id } = useParams<{ id: string }>();
  const accessToken = useSessionStore((s) => s.accessToken);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteUser } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to delete user");
      navigate("/dashboard");
    },
  });

  useEffect(() => {
    if (id) {
      deleteUser();
    }
  }, [id, deleteUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Deleting user...
        </p>
      </div>
    </div>
  );
  
}
