import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useSessionStore } from "../store/sesssionStore";

// 1. Form Schema
const userSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  status: z.enum(["active", "locked"], {
    errorMap: () => ({ message: "Please select a valid status" }),
  }),
});

// 2. Type from schema
type UserFormValues = z.infer<typeof userSchema>;

// 3. EditUser Component
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useSessionStore((state) => state.accessToken);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  const { isFetching, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const result = await response.json();
      const user = result.result.data.user;
      if (!user) {
        throw new Error("User not found");
      }

      reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        status:
          user.status === "active" || user.status === "locked"
            ? user.status
            : "active",
      });

      return user;
    },
    enabled: !!id,
  });

  // 5. Update User
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UserFormValues) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to update user");
    },
  });

  // 6. Submit Handler
  const onSubmit = (data: UserFormValues) => {
    mutate(data);
  };

  // 7. Loading or Error states
  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-500 dark:text-white">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <p className="text-red-500">Failed to load user.</p>
      </div>
    );
  }

  // 8. JSX
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Edit User
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName")}
              className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName")}
              className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
              className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="locked">Locked</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs">{errors.status.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
