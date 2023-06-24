import { UsersDocument } from "@/generated/graphql";
import { getClient } from "@/lib/client";
import { NetworkStatus, useQuery } from "@apollo/client";
import React from "react";

interface Props {}

const fetchUsers = async () => {
  return getClient().query({ query: UsersDocument });
};

const Sc: React.FC<Props> = async () => {
  const users = await fetchUsers();

  if (users.networkStatus !== NetworkStatus.ready) {
    return null;
  }

  const usersElements = users.data.users.map((user) => (
    <div key={user.id}>{user.email}</div>
  ));

  return <>{usersElements}</>;
};

export default Sc;
