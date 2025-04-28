import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
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

// 3. AddUser Component
const AddUser = () => {
  const navigate = useNavigate();
  const accessToken = useSessionStore((state) => state.accessToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  // 4. createUser Function
  const createUser = async (data: UserFormValues) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create user  ");
    }

    return response.json();
  };

  // 5. useMutation Hook
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully!");
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Failed to create user");
    },
  });

  // 6. Submit Handler
  const onSubmit = (data: UserFormValues) => {
    mutate(data);
  };

  // 7. JSX
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6 ">
          Add New User
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
              <p className="text-red-500 text-xs mt-2">{errors.firstName.message}</p>
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
              <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>
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
              <p className="text-red-500 text-xs mt-2">
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
              <p className="text-red-500 text-xs mt-2">{errors.status.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            {isPending ? "Creating..." : "Create User"}
          </button>

          {/* Error Display */}
          {isError && (
            <p className="text-red-500 text-center mt-2">
              {(error as Error).message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddUser;
