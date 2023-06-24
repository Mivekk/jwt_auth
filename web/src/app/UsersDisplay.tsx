"use client";

import React from "react";

interface Props {
  initialData: string;
}

const UsersDisplay: React.FC<Props> = ({ initialData }) => {
  const usersData: { id: number; email: string }[] = JSON.parse(initialData);

  const users = usersData.map((user) => <div key={user.id}>{user.email}</div>);

  return <>{users}</>;
};

export default UsersDisplay;
