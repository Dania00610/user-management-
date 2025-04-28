

import {User } from "../pages/dashboard";

export const getUsers = async (accessToken: string, search: string) => {
  const res = await fetch(`/api/users${search ? `?search=${search}` : ""}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();
  return data.result.data.users as User[];
};

